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
import React, { useCallback, useEffect, useState } from 'react';
import styles from './styles.module.scss';

import '@pnp/sp/profiles';
import '@xyflow/react/dist/style.css';
import './style.css';

import { spfi, SPFx } from '@pnp/sp';
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
import '@pnp/sp/site-users/web';
import { getSP } from '../pnpjsConfig';
import { DiagramDetail, DiagramDetailResponse } from '../types';
import { edgeTypes } from './edges';
import { IHelloWorldProps } from './IHelloWorldProps';
import { nodeTypes } from './nodes';
import { AppNode } from './nodes/types';
import ReactFlowProviderCustom from './ReactFlowProviderCustom';
import Sidebar from './Sidebar';
import { DnDProvider } from './Sidebar/DnDContext';
import SidePanel from './SidePanel';

const edgeOptions = {
	type: 'customEdge',
	markerEnd: { type: MarkerType.ArrowClosed } as Edge['markerEnd'],
};

const HelloWorld: React.FC<IHelloWorldProps> = ({ context }) => {
	const [, setUser] = useState<null | ISiteUserInfo>(null);
	const [diagramDetail, setDiagramDetail] = useState<null | DiagramDetail>(null);

	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

	const sp = getSP();
	const spCache = spfi(sp).using(SPFx(context));
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((edges) => addEdge({ ...connection, type: 'customEdge' }, edges)),
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

			console.log('_data', _data);

			setDiagramDetail(_data);
			setNodes((nodes) => nodes.concat(_data.Nodes as AppNode[]));
			setEdges((edges) => edges.concat(_data.Edges as Edge[]));
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

	useEffect(() => {
		void getWebpartContent();
	}, []);

	return (
		<div className={styles['reactFlow-Wrapper']}>
			<ReactFlowProvider>
				<DnDProvider>
					<ReactFlowProviderCustom
						nodes={nodes}
						nodeTypes={nodeTypes}
						onNodesChange={(e) => {
							console.log('123');
							onNodesChange(e);
						}}
						edges={edges}
						edgeTypes={edgeTypes}
						defaultEdgeOptions={edgeOptions}
						onEdgesChange={(e) => {
							console.log('asd');
							onEdgesChange(e);
						}}
						onConnect={(e) => {
							onConnect(e);
						}}
						fitView
						onDragOver={onDragOver}
						setNodes={setNodes}
					>
						<Background />
						<MiniMap />
						<Controls />

						<SidePanel />
					</ReactFlowProviderCustom>
					<Sidebar
						onSave={() => {
							void handleSave();
						}}
					/>
				</DnDProvider>
			</ReactFlowProvider>
		</div>
	);
};

export default HelloWorld;
