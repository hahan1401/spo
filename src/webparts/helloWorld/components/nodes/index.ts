import type { NodeTypes } from '@xyflow/react';

import { CustomNode } from './CustomNode';
import { AppNode } from './types';

export const generateSwimlane = (number: number): AppNode[][] => {
	const arr = Array(3).fill(0);
	return arr.map<AppNode[]>((_, index) => {
		return [
			{
				id: `swimlane-${index + 1}`,
				type: 'group',
				position: { x: 0 + 300 * index, y: 0 },
				data: {} as unknown as Record<string, never>,
				style: { width: 200, height: 700 },
			},
			{
				id: `swimlane-${index + 1}-item-1`,
				type: 'custom-node',
				position: { x: 10, y: 40 },
				data: {
					label: 'a',
				},
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
			{
				id: `swimlane-${index + 1}-item-2`,
				type: 'custom-node',
				position: { x: 10, y: 140 },
				data: { label: 'b' },
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
			{
				id: `swimlane-${index + 1}-item-3`,
				type: 'custom-node',
				position: { x: 10, y: 240 },
				data: { label: 'c' },
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
			{
				id: `swimlane-${index + 1}-item-4`,
				type: 'custom-node',
				position: { x: 10, y: 340 },
				data: { label: 'd' },
				parentId: `swimlane-${index + 1}`,
				extent: 'parent',
			},
		];
	});
};

export const initialNodes: AppNode[] = [...generateSwimlane(3).flat(2)];

export const nodeTypes = {
	'custom-node': CustomNode,
	// Add any of your custom nodes here!
} as NodeTypes;
