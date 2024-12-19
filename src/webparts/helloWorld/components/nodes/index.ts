import type { NodeTypes } from '@xyflow/react';

import { CustomNode } from './CustomNode';
import { AppNode } from './types';

export const initialNodes: AppNode[] = [
  {
    id: 'group-parent',
    type: 'group',
    position: { x: 0, y: 0 },
    data: { label: '234sdgf' } as unknown as Record<string, never>,
    style: { width: 1200, height: 500 },
  },
  {
    id: 'a', type: 'custom-node', position: { x: 100, y: 100 }, data: {
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
    position: { x: 400, y: 100 },
    data: { label: 'b' },
    parentId: 'group-parent',
    extent: 'parent',
  },
  {
    id: 'c',
    type: 'custom-node', position: { x: 700, y: 100 }, data: { label: 'c' },
    parentId: 'group-parent',
    extent: 'parent',
  },
  {
    id: 'd',
    type: 'custom-node',
    position: { x: 1000, y: 100 },
    data: { label: 'd' },
    parentId: 'group-parent',
    extent: 'parent',
  },
];

export const nodeTypes = {
  'custom-node': CustomNode,
  // Add any of your custom nodes here!
} as NodeTypes;
