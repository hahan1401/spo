import { Modal, PrimaryButton } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import { useState } from 'react';
import {
	DEFAULT_POSITION_X,
	DEFAULT_POSITION_Y,
	NODE_GROUP_MIN_HEIGHT,
	VERTICAL_NODE_GAP,
} from '../../../../Constants';
import { hashString } from '../../../../Utils';
import { AppNode } from '../nodes/types';

const NodeGroupModal = ({
	node,
	hideModal,
	isModalOpen,
}: {
	node?: AppNode;
	isModalOpen?: boolean;
	hideModal?: () => void;
}) => {
	const { addNodes, getNodes } = useReactFlow<AppNode>();
	const [name, setName] = useState(node?.data.label ?? '');

	const onCloseModal = () => {
		setName('');
		hideModal?.();
	};

	const addNode = () => {
		const postionY =
			Math.max(
				...getNodes()
					.filter((item) => !item.parentId)
					.map((item) => item.position.y + (item.measured?.height ?? 0)),
				DEFAULT_POSITION_Y,
			) + VERTICAL_NODE_GAP;

		const newNode = {
			id: hashString(name),
			type: 'labeled-group',
			position: { x: DEFAULT_POSITION_X, y: postionY },
			style: { minHeight: NODE_GROUP_MIN_HEIGHT },
			data: { label: name },
		} as AppNode;
		addNodes([newNode]);
		onCloseModal();
	};

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onDismiss={onCloseModal}
				isBlocking={false}
				styles={{
					main: {
						padding: 10,
					},
				}}
			>
				<label htmlFor='name'>Name:</label>
				<input
					type='text'
					id='name'
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>

				<PrimaryButton
					onClick={() => {
						addNode();
					}}
				>
					save
				</PrimaryButton>
			</Modal>
		</>
	);
};

export default NodeGroupModal;
