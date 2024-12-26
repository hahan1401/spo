import * as RF from '@xyflow/react';
import React from 'react';

import { useBoolean } from '@fluentui/react-hooks';
import { TaskBoxModal } from '../../Modal/TaskBox/TaskBoxModal';
import { AppNode, type CustomNode as TCustomNode } from '../types';

const Handle: React.FC<RF.HandleProps> = (props: RF.HandleProps) => <RF.Handle {...props} />;

export const CustomNode = ({ data, id, parentId, type }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	const { getNode } = RF.useReactFlow<AppNode>();
	const [isModalInforOpen, { setTrue: showInfoModal, setFalse: hideInfoModal }] = useBoolean(false);

	const hasShape = !!data?.shape;
	const parentNode = parentId ? getNode(parentId) : undefined;
	const currentNode = getNode(id);

	return (
		<>
			{/* We add this class to use the same styles as React Flow's default nodes. */}
			<div
				className='react-flow__node-default'
				style={{
					...(hasShape && parentNode ? { backgroundColor: parentNode.style?.backgroundColor ?? 'inherit' } : {}),
				}}
			>
				{data.canEdit && (
					<RF.NodeResizer
						minWidth={100}
						minHeight={30}
					/>
				)}
				<div
					className={`react-flow__node-custom-content ${data?.shape ? `react-flow__node-shape-${data.shape}` : ''}`}
					style={{
						...(hasShape ? { backgroundColor: currentNode?.style?.backgroundColor ?? 'inherit' } : {}),
					}}
					onClick={() => {
						showInfoModal();
					}}
				>
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
					<TaskBoxModal
						hideModal={hideInfoModal}
						isModalOpen={isModalInforOpen}
					/>
				</div>

				<Handle
					isConnectable={data.canEdit}
					type='target'
					position={RF.Position.Top}
					id={`-top_${id}`}
				/>
				<Handle
					isConnectable={data.canEdit}
					type='source'
					position={RF.Position.Right}
					id={`-right_${id}`}
				/>
				<Handle
					isConnectable={data.canEdit}
					type='source'
					position={RF.Position.Bottom}
					id={`-bottom_${id}`}
				/>
				<Handle
					isConnectable={data.canEdit}
					type='target'
					position={RF.Position.Left}
					id={`-left_${id}`}
				/>
			</div>
		</>
	);
};
