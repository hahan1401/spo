import type { Node, BuiltInNode } from '@xyflow/react';

export type CustomNode = Node<{ label: string, onClick?: (id?: string) => void }, 'custom-node'>;
export type AppNode = BuiltInNode | CustomNode;
