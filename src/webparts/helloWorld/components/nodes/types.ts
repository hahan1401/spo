import type { BuiltInNode, Node } from '@xyflow/react';
import { NODE_SHAPES } from '../../../../Constants';

export type NodeShapeType = (typeof NODE_SHAPES)[keyof typeof NODE_SHAPES];

export type CustomNode = Node<
	{ label: string; onClick?: (id?: string) => void; shape?: NodeShapeType },
	'custom-node' | 'labeled-group'
>;
export type AppNode = BuiltInNode | CustomNode;
