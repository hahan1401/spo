import { Dropdown, Modal } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import React, { useState } from 'react';
import {
	DEFAULT_POSITION_X,
	DEFAULT_POSITION_Y,
	NODE_GAP,
	NODE_GROUP_MIN_HEIGHT,
	NODE_GROUP_NODE_ITEM_DIFF_HEIGHT,
	NODE_MIN_HEIGHT,
	NODE_MIN_WIDTH,
} from '../../../../Contants';
import { NODE_TYPE } from '../../../../types/common';
import { hashString } from '../../../../Utils';
import { AppNode } from '../nodes/types';

const getNodeGroupOptions = (nodes: AppNode[]) =>
	nodes
		.filter((item) => item.type === NODE_TYPE.LABELED_GROUP)
		.map((item) => ({ key: item.id, text: item.data.label }));

const DetailModal = ({
	node,
	hideModal,
	isModalOpen,
}: {
	node?: AppNode;
	isModalOpen?: boolean;
	hideModal?: () => void;
}) => {
	const { getNodes, addNodes, updateNode } = useReactFlow<AppNode>();
	const [nodeName, setNodeName] = useState(node?.data.label ?? '');
	const [nodeGroup, setNodeGroup] = useState(node?.parentId);

	const onCloseModal = () => {
		setNodeName('');
		setNodeGroup('');
		hideModal?.();
	};

	const addNode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		let nodesInGroup = getNodes().filter((item) => item.parentId === nodeGroup);

		const positionX = nodeGroup
			? nodesInGroup.reduce((prevValue, current) => {
					return prevValue + (current.measured?.width ?? 0) + NODE_GAP;
				}, NODE_GAP)
			: DEFAULT_POSITION_X;

		const postionY = nodeGroup
			? (NODE_GROUP_MIN_HEIGHT - NODE_MIN_HEIGHT) / 2
			: Math.max(
					...getNodes()
						.filter((item) => !item.parentId)
						.map((item) => item.position.y + (item.measured?.height ?? 0)),
					DEFAULT_POSITION_Y,
				) + NODE_GAP;

		const newNode = {
			id: hashString(nodeName),
			type: 'custom-node',
			position: {
				x: positionX,
				y: postionY,
			},
			measured: { height: NODE_MIN_HEIGHT, width: NODE_MIN_WIDTH },
			data: { label: nodeName },
			...(nodeGroup ? { extent: 'parent', parentId: nodeGroup } : {}),
		} as AppNode;
		if (nodeGroup) {
			nodesInGroup = [...nodesInGroup, newNode];
			updateNode(nodeGroup, {
				measured: {
					width: nodesInGroup.reduce((prevValue, current) => {
						return prevValue + (current.measured?.width ?? 0);
					}, NODE_GAP),
					height:
						Math.max(...nodesInGroup.map((item) => item.measured?.height ?? 0), newNode.measured?.height ?? 0) +
						NODE_GROUP_NODE_ITEM_DIFF_HEIGHT,
				},
				style: {
					minWidth: nodesInGroup.reduce((prevValue, current) => {
						return prevValue + (current.measured?.width ?? 0) + NODE_GAP;
					}, NODE_GAP),
					minHeight:
						Math.max(...nodesInGroup.map((item) => item.measured?.height ?? 0), newNode.measured?.height ?? 0) +
						NODE_GROUP_NODE_ITEM_DIFF_HEIGHT,
				},
			});
		}
		addNodes([newNode]);
	};

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onDismiss={onCloseModal}
				isBlocking={false}
			>
				<label htmlFor='nodeName'>Node Name:</label>
				<input
					type='text'
					id='nodeName'
					value={nodeName}
					onChange={(e) => {
						setNodeName(e.target.value);
					}}
				/>

				<Dropdown
					placeholder='Select group'
					label='Select group'
					options={getNodeGroupOptions(getNodes())}
					onChange={(_, option) => {
						setNodeGroup(option?.key?.toString() ?? '');
					}}
					selectedKey={nodeGroup}
				/>

				<button
					onClick={(e) => {
						if (node?.id) {
							updateNode(node.id, { data: { label: nodeName }, parentId: nodeGroup });
						} else {
							addNode(e);
						}
						onCloseModal();
					}}
				>
					save
				</button>
			</Modal>
		</>
	);
};

export default DetailModal;
