import * as RF from '@xyflow/react';
import React, { useState } from 'react';

import { Modal } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { ModalBasicExample } from '../Modal/ModalBasicExample';
import { type CustomNode as TCustomNode } from './types';

const Handle: React.FC<RF.HandleProps> = (props: RF.HandleProps) => <RF.Handle {...props} />;

export const CustomNode = ({ data, id }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	const { deleteElements, getNode, updateNode } = RF.useReactFlow();
	const [nodeName, setNodeName] = useState(getNode(id)?.data.label as string);
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
	return (
		<>
			{/* We add this class to use the same styles as React Flow's default nodes. */}
			<div className='react-flow__node-default'>
				<RF.NodeToolbar>
					<button
						onClick={() => {
							showModal();
							console.log('edit clicked', getNode(id));
						}}
					>
						Edit
					</button>
					<button
						onClick={() => {
							console.log('id', id);
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
			<Modal
				isOpen={isModalOpen}
				onDismiss={hideModal}
				isBlocking={false}
			>
				<label htmlFor='nodeName'>Node Name:</label>
				<input
					type='text'
					name='nodeName'
					value={nodeName}
					onChange={(e) => {
						setNodeName(e.target.value);
					}}
				/>
				<button
					onClick={() => {
						updateNode(id, { data: { label: nodeName } });
						hideModal();
					}}
				>
					save
				</button>
			</Modal>
		</>
	);
};
