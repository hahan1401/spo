import * as RF from '@xyflow/react';
import React from 'react';

import { DefaultButton } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import DetailModal from '../../Modal/DetailModal';
import { ModalBasicExample } from '../../Modal/ModalBasicExample';
import { AppNode, type CustomNode as TCustomNode } from '../types';

const Handle: React.FC<RF.HandleProps> = (props: RF.HandleProps) => <RF.Handle {...props} />;

export const CustomNode = ({ data, id, parentId, type }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	const { deleteElements, getNode } = RF.useReactFlow<AppNode>();
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

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
				<RF.NodeResizer
					minWidth={100}
					minHeight={30}
				/>
				<RF.NodeToolbar>
					<DefaultButton
						onClick={() => {
							showModal();
						}}
					>
						Edit
					</DefaultButton>
					<DefaultButton
						onClick={() => {
							void deleteElements({ nodes: [{ id: id }] });
						}}
					>
						Delete
					</DefaultButton>
				</RF.NodeToolbar>
				<div
					className={`react-flow__node-custom-content ${data?.shape ? `react-flow__node-shape-${data.shape}` : ''}`}
					style={{
						...(hasShape ? { backgroundColor: currentNode?.style?.backgroundColor ?? 'inherit' } : {}),
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
					<ModalBasicExample />
				</div>

				<Handle
					type='target'
					position={RF.Position.Top}
					id={`-top_${id}`}
				/>
				<Handle
					type='source'
					position={RF.Position.Right}
					id={`-right_${id}`}
				/>
				<Handle
					type='source'
					position={RF.Position.Bottom}
					id={`-bottom_${id}`}
				/>
				<Handle
					type='target'
					position={RF.Position.Left}
					id={`-left_${id}`}
				/>
			</div>

			<DetailModal
				hideModal={hideModal}
				isModalOpen={isModalOpen}
				node={getNode(id)}
			/>
		</>
	);
};
