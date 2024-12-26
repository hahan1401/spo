import * as RF from '@xyflow/react';
import React from 'react';

import { type CustomNode as TCustomNode } from '../types';
import styles from './styles.module.scss';

// const Handle: React.FC<RF.HandleProps> = (props: RF.HandleProps) => <RF.Handle {...props} />;

export const LabeledGroup = ({ data, id, type }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	return (
		<>
			<div className={`react-flow__node-default ${styles.labeledGroupWrapper}`}>
				{data.canEdit && (
					<RF.NodeResizer
						minWidth={100}
						minHeight={30}
					/>
				)}
				{data.label && (
					<div
						onClick={() => {
							data.onClick?.(id);
						}}
						className={`react-flow__node-${type}-label`}
					>
						{data.label}
					</div>
				)}
			</div>
		</>
	);
};
