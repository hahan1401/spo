import type { Node } from '@xyflow/react';
import { NODE_SHAPES } from '../../../../constants/common';

export type NodeShapeType = (typeof NODE_SHAPES)[keyof typeof NODE_SHAPES];

export type CustomNode = Node<
	{ label?: string; onClick?: (id?: string) => void; shape?: NodeShapeType; canEdit?: boolean },
	'custom-node' | 'labeled-group'
>;
export type AppNode = CustomNode;
