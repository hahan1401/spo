import type { NodeTypes } from '@xyflow/react';

import { CustomNode } from './CustomNode';

export const nodeTypes = {
	'custom-node': CustomNode,
	// 'labeled-group': LabeledGroup,
	// Add any of your custom nodes here!
} as NodeTypes;
