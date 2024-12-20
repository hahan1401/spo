import { type Edge, type EdgeTypes } from '@xyflow/react';
import CustomEdge from './CustomEdge';

export const initialEdges: Edge[] = [
	{
		id: 'a->b',
		source: 'a',
		target: 'b',
		sourceHandle: '-right_a',
		targetHandle: '-left_b',
		animated: true,
		type: 'customEdge',
	},
];

export const edgeTypes = {
	customEdge: CustomEdge,
	// Add your custom edge types here!
} as EdgeTypes;
