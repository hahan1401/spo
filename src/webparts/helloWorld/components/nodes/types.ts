import type { BuiltInNode, Node } from '@xyflow/react';

export type CustomNode = Node<{ label: string; onClick?: (id?: string) => void }, 'custom-node' | 'labeledGroupNode'>;
export type AppNode = BuiltInNode | CustomNode;
