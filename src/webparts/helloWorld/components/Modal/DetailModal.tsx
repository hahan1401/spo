import { Dropdown, Modal } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import React, { useState } from 'react';
import { NODE_TYPE } from '../../../../types/common';
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

	const addNode = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		const newNode = {
			id: `${'custom-node'}-${getNodes().length + 1}`,
			type: 'custom-node',
			position: { x: 0, y: 0 },
			data: { label: nodeName },
			...(nodeGroup ? { extent: 'parent', parentId: nodeGroup } : {}),
		} as AppNode;
		addNodes([newNode]);
	};

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onDismiss={hideModal}
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
						hideModal?.();
					}}
				>
					save
				</button>
			</Modal>
		</>
	);
};

export default DetailModal;
