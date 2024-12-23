import type { NodeTypes } from '@xyflow/react';

import { CustomNode } from './CustomNode/CustomNode';
import { LabeledGroup } from './LabeledGroup/LabeledGroup';

export const nodeTypes = {
	'custom-node': CustomNode,
	'labeled-group': LabeledGroup,
	// 'labeled-group': LabeledGroup,
	// Add any of your custom nodes here!
} as NodeTypes;
