import {
	addEdge,
	Background,
	Controls,
	Edge,
	MarkerType,
	MiniMap,
	ReactFlowProvider,
	useEdgesState,
	useNodesState,
	type OnConnect,
} from '@xyflow/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

import '@xyflow/react/dist/style.css';
import './style.css';

import { useBoolean } from '@fluentui/react-hooks';
import { spfi, SPFx } from '@pnp/sp';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import '@pnp/sp/site-users/web';
import { GROUPS } from '../../../constants/permissions';
import ContextMenu from '../ContextMenu';
import { getSP } from '../pnpjsConfig';
import { _edges, _nodes } from '../test';
import { DiagramDetail, DiagramDetailResponse } from '../types';
import { edgeTypes } from './edges';
import { ICustomEdge } from './edges/types';
import { IHelloWorldProps } from './IHelloWorldProps';
import DetailModal from './Modal/DetailModal';
import { nodeTypes } from './nodes';
import { AppNode } from './nodes/types';
import ReactFlowProviderCustom from './ReactFlowProviderCustom';
import Sidebar from './Sidebar';
import { DnDProvider } from './Sidebar/DnDContext';
import SidePanel from './SidePanel';

export interface IMenu {
	node?: AppNode;
	top?: number;
	left?: number;
}

const edgeOptions = {
	markerEnd: {
		type: MarkerType.ArrowClosed,
		color: '#000',
	},
	style: {
		strokeWidth: 2,
		stroke: '#000',
	},
} as Edge;

const HelloWorld: React.FC<IHelloWorldProps> = ({ context }) => {
	const [, setUser] = useState<null | ISiteUserInfo>(null);
	const [diagramDetail, setDiagramDetail] = useState<null | DiagramDetail>(null);

	const [userGroups, setUserGroups] = useState<string[]>([]);
	const canEdit = userGroups.includes(GROUPS.ADMIN);

	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>(_nodes as AppNode[]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<ICustomEdge>(_edges as ICustomEdge[]);

	const [menu, setMenu] = useState<IMenu | null>(null);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

	const onNodeContextMenu = useCallback(
		(event, node) => {
			event.preventDefault();

			const el = document.querySelector(`*[data-id="${node.id}"]`);
			const elementOffset = el?.getBoundingClientRect() as DOMRect;
			setMenu({
				node: node,
				top: elementOffset?.top,
				left: (elementOffset?.left ?? 0) + (elementOffset?.width ?? 0) / 2,
			});
			setShowContextMenu(true);
		},
		[setMenu],
	);
	const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

	const sp = getSP();
	const spCache = spfi(sp).using(SPFx(context));
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((edges) => addEdge({ ...connection, ...edgeOptions, type: 'customEdge' }, edges)),
		[setEdges],
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	const getWebpartContent = async () => {
		const user = await sp.web.currentUser();
		setUser(user);

		const diagramDetail = (await spCache.web.lists
			.getByTitle('WorkFlowDiagrams')
			.items.filter<DiagramDetailResponse>((item) =>
				item.number('AuthorId').equals(user.Id),
			)()) as DiagramDetailResponse[];

		if (diagramDetail[0]) {
			const data = diagramDetail[0];
			const _data: DiagramDetail = {
				...data,
				Edges: data.Edges ? (JSON.parse(data.Edges) as DiagramDetail['Edges']) : undefined,
				Nodes: data.Nodes ? (JSON.parse(data.Nodes) as DiagramDetail['Nodes']) : undefined,
			};

			setDiagramDetail(_data);
			setNodes((nodes) => nodes.concat(_data.Nodes as AppNode[]));
			setEdges((edges) => edges.concat(_data.Edges as ICustomEdge[]));
		}
	};

	const handleSave = async () => {
		if (!diagramDetail?.Id) {
			await spCache.web.lists
				.getByTitle('WorkFlowDiagrams')
				.items.add({ Edges: JSON.stringify(edges), Nodes: JSON.stringify(nodes) });
		} else {
			await spCache.web.lists
				.getByTitle('WorkFlowDiagrams')
				.items.getById(diagramDetail?.Id)
				.update({ Edges: JSON.stringify(edges), Nodes: JSON.stringify(nodes) });
		}
	};

	const getUserGroups = async () => {
		const groups = await sp.web.currentUser.groups();
		setUserGroups(groups.map((item) => item.Title));
	};

	useEffect(() => {
		void getWebpartContent();
		void getUserGroups();
	}, []);

	console.log('canEdit', canEdit);

	return (
		<div className={styles['reactFlow-Wrapper']}>
			<ReactFlowProvider>
				<DnDProvider>
					<ReactFlowProviderCustom
						ref={ref}
						deleteKeyCode={null}
						nodes={nodes.map<AppNode>((item) => ({ ...item, draggable: canEdit, data: { ...item.data, canEdit } }))}
						nodeTypes={nodeTypes}
						onNodesChange={(e) => {
							onNodesChange(e);
						}}
						edges={edges.map<ICustomEdge>((item) => ({ ...item, data: { ...item.data, canEdit } }))}
						edgeTypes={edgeTypes}
						defaultEdgeOptions={edgeOptions}
						onEdgesChange={(e) => {
							onEdgesChange(e);
						}}
						onConnect={(e) => {
							onConnect(e);
						}}
						fitView
						onDragOver={onDragOver}
						setNodes={setNodes}
						snapToGrid={true}
						snapGrid={[4, 4]}
						onPaneClick={onPaneClick}
						onNodeContextMenu={onNodeContextMenu}
					>
						<Background />
						<MiniMap />

						{canEdit && (
							<>
								<Controls />
								<SidePanel />
							</>
						)}

						{canEdit && showContextMenu && (
							<ContextMenu
								showModal={showModal}
								closeContextMenu={() => {
									setShowContextMenu(false);
								}}
								{...menu}
							/>
						)}
					</ReactFlowProviderCustom>
					{canEdit && (
						<Sidebar
							onSave={() => {
								void handleSave();
							}}
						/>
					)}
				</DnDProvider>

				{menu?.node && (
					<DetailModal
						hideModal={hideModal}
						isModalOpen={isModalOpen}
						node={menu.node}
					/>
				)}
			</ReactFlowProvider>
		</div>
	);
};

export default HelloWorld;
