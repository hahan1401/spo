import {
	Background,
	Controls,
	Edge,
	MarkerType,
	MiniMap,
	ReactFlowProvider,
	addEdge,
	useEdgesState,
	useNodesState,
	type OnConnect,
} from '@xyflow/react';
import React, { useCallback } from 'react';
import styles from './styles.module.scss';

import '@xyflow/react/dist/style.css';
import './style.css';

import { edgeTypes, initialEdges } from './edges';
import { IHelloWorldProps } from './IHelloWorldProps';
import { initialNodes, nodeTypes } from './nodes';
import ReactFlowProviderCustom from './ReactFlowProviderCustom';
import Sidebar from './Sidebar';
import { DnDProvider } from './Sidebar/DnDContext';
import SidePanel from './SidePanel';

const edgeOptions = {
	type: 'customEdge',
	markerEnd: { type: MarkerType.ArrowClosed } as Edge['markerEnd'],
};

const HelloWorld: React.FC<IHelloWorldProps> = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((edges) => addEdge({ ...connection, type: 'customEdge' }, edges)),
		[setEdges],
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	return (
		<div className={styles['reactFlow-Wrapper']}>
			<ReactFlowProvider>
				<DnDProvider>
					<ReactFlowProviderCustom
						nodes={nodes}
						nodeTypes={nodeTypes}
						onNodesChange={(e) => {
							onNodesChange(e);
						}}
						edges={edges}
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
					>
						<Background />
						<MiniMap />
						<Controls />

						<SidePanel />
					</ReactFlowProviderCustom>
					<Sidebar />
				</DnDProvider>
			</ReactFlowProvider>
		</div>
	);
};

export default HelloWorld;
