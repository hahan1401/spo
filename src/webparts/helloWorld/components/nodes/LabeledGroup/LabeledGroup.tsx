import * as RF from '@xyflow/react';
import React from 'react';

import { DefaultButton } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import DetailModal from '../../Modal/DetailModal';
import { AppNode, type CustomNode as TCustomNode } from '../types';

const Handle: React.FC<RF.HandleProps> = (props: RF.HandleProps) => <RF.Handle {...props} />;

export const LabeledGroup = ({ data, id }: RF.NodeProps<TCustomNode>): ReturnType<React.FC> => {
	const { deleteElements, getNode } = RF.useReactFlow<AppNode>();
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
	return (
		<>
			<div className='react-flow__node-default'>
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
				{data.label && (
					<div
						onClick={() => {
							data.onClick?.(id);
						}}
					>
						{data.label}
					</div>
				)}

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
