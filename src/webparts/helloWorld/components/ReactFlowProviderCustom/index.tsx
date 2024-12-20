import { Edge, ReactFlow, ReactFlowProps, useReactFlow } from '@xyflow/react';
import React, { useCallback } from 'react';
import { AppNode } from '../nodes/types';
import { useDnD } from '../Sidebar/DnDContext';

export default (
	props: ReactFlowProps<AppNode, Edge> & {
		setNodes: React.Dispatch<React.SetStateAction<AppNode[]>>;
	},
) => {
	const { setNodes, ...rest } = props;
	const [type] = useDnD();
	const { screenToFlowPosition, getNodes } = useReactFlow();
	// you can access the internal state here

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();
			// check if the dropped element is valid
			if (!type) {
				return;
			}

			// project was renamed to screenToFlowPosition
			// and you don't need to subtract the reactFlowBounds.left/top anymore
			// details: https://reactflow.dev/whats-new/2023-11-10
			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});
			const newNode = {
				id: `${type}-${getNodes().length + 1}`,
				type,
				position,
				data: { label: `${type} node` },
			};

			setNodes((nds) => nds.concat(newNode as AppNode));
		},
		[screenToFlowPosition, type],
	);

	return (
		<ReactFlow
			{...rest}
			onDrop={onDrop}
		/>
	);
};
