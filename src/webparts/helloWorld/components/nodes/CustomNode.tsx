import * as RF from '@xyflow/react';
import React from 'react';

import { useBoolean } from '@fluentui/react-hooks';
import DetailModal from '../Modal/DetailModal';
import { ModalBasicExample } from '../Modal/ModalBasicExample';
import { AppNode, type CustomNode as TCustomNode } from './types';

const Handle: React.FC<RF.HandleProps> = (props: RF.HandleProps) => <RF.Handle {...props} />;

export const CustomNode = ({ data, id }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	const { deleteElements, getNode } = RF.useReactFlow<AppNode>();
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
	return (
		<>
			{/* We add this class to use the same styles as React Flow's default nodes. */}
			<div className='react-flow__node-default'>
				<RF.NodeToolbar>
					<button
						onClick={() => {
							showModal();
						}}
					>
						Edit
					</button>
					<button
						onClick={() => {
							void deleteElements({ nodes: [{ id: id }] });
						}}
					>
						Delete
					</button>
				</RF.NodeToolbar>
				{data.label && (
					<div
						onClick={() => {
							data.onClick?.(id);
						}}
					>
						{data.label}
					</div>
				)}
				<ModalBasicExample />

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
