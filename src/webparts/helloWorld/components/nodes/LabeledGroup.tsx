import * as RF from '@xyflow/react';
import React from 'react';

import { type CustomNode as TCustomNode } from './types';

export const LabeledGroup = ({ data, id }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	return (
		<>
			{data.label && (
				<div
					onClick={() => {
						data.onClick?.(id);
					}}
				>
					{data.label}
				</div>
			)}
		</>
	);
};
