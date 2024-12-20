import type { BuiltInNode, Node } from '@xyflow/react';

export type CustomNode = Node<{ label: string; onClick?: (id?: string) => void }, 'custom-node' | 'labeled-group'>;
export type AppNode = BuiltInNode | CustomNode;
