import { type Edge, type EdgeTypes } from '@xyflow/react';
import CustomEdge from './CustomEdge';

export const initialEdges: Edge[] = [
	{
		source: 'swimlane-1-item-1',
		sourceHandle: '-right_swimlane-1-item-1',
		target: 'swimlane-1-item-2',
		targetHandle: '-left_swimlane-1-item-2',
		id: 'xy-edge__swimlane-1-item-1-right_swimlane-1-item-1-swimlane-1-item-2-left_swimlane-1-item-2',
		label: '123123',
		className: 'default-classname',
	},
	{
		source: 'swimlane-1-item-1',
		sourceHandle: '-bottom_swimlane-1-item-1',
		target: 'swimlane-2-item-1',
		targetHandle: '-top_swimlane-2-item-1',
		id: 'xy-edge__swimlane-1-item-1-bottom_swimlane-1-item-1-swimlane-2-item-1-top_swimlane-2-item-1',
		label: 'asd-asdasd',
	},
];

export const edgeTypes = {
	customEdge: CustomEdge,
	// Add your custom edge types here!
} as EdgeTypes;
