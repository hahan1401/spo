import type { NodeTypes } from '@xyflow/react';

import { CustomNode } from './CustomNode';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
  {
    id: 'group-parent',
    type: 'group',
    position: { x: 500, y: 500 },
    data: { label: '234sdgf' } as unknown as Record<string, never>,
    style: { width: 1000, height: 400 },
  },
  {
    id: 'a', type: 'custom-node', position: { x: -300, y: 0 }, data: {
      label: 'a', onClick: (id) => {
        console.log(`Node-${id} is clicked!!`)
      }
    },
    parentId: 'group-parent',
    extent: 'parent',
  },
  {
    id: 'b',
    type: 'custom-node',
    position: { x: -100, y: 0 },
    data: { label: 'b' },
    parentId: 'group-parent',
    extent: 'parent',
  },
  {
    id: 'c',
    type: 'custom-node', position: { x: 100, y: 0 }, data: { label: 'c' },
    parentId: 'group-parent',
    extent: 'parent',
  },
  {
    id: 'd',
    type: 'custom-node',
    position: { x: 300, y: 0 },
    data: { label: 'd' },
    parentId: 'group-parent',
    extent: 'parent',
  },
];

export const nodeTypes = {
  'custom-node': CustomNode,
  // Add any of your custom nodes here!
} as NodeTypes;
