import type { NodeTypes } from '@xyflow/react';

import { CustomNode } from './CustomNode';
import { AppNode } from './types';

export const generateSwimlane = (number: number): AppNode[][] => {
	const arr = Array(number).fill(0);
	return arr.map<AppNode[]>((_, index) => {
		return [
			{
				id: `swimlane-${index + 1}`,
				type: 'labeled-group',
				position: { x: 0, y: 0 + 150 * index },
				data: { label: 'qweqwe-qwe' },
				style: { width: 1200, height: 100 },
			},
			{
				id: `swimlane-${index + 1}-item-1`,
				type: 'custom-node',
				position: { x: 0, y: 10 },
				data: {
					label: 'a',
				},
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
			{
				id: `swimlane-${index + 1}-item-2`,
				type: 'custom-node',
				position: { x: 300, y: 10 },
				data: { label: 'b' },
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
			{
				id: `swimlane-${index + 1}-item-3`,
				type: 'custom-node',
				position: { x: 600, y: 10 },
				data: { label: 'c' },
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
			{
				id: `swimlane-${index + 1}-item-4`,
				type: 'custom-node',
				position: { x: 900, y: 10 },
				data: { label: 'd' },
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
		];
	});
};

export const initialNodes: AppNode[] = [...generateSwimlane(1).flat(2)];

export const nodeTypes = {
	'custom-node': CustomNode,
	// 'labeled-group': LabeledGroup,
	// Add any of your custom nodes here!
} as NodeTypes;
