import { Modal, PrimaryButton } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import { useState } from 'react';
import { AppNode } from '../nodes/types';
const EdgeDetailModal = ({
	edgeId,
	hideModal,
	isModalOpen,
}: {
	edgeId: string;
	isModalOpen?: boolean;
	hideModal?: () => void;
}) => {
	const { updateEdge, getEdge } = useReactFlow<AppNode>();
	const [label, setLabel] = useState(getEdge(edgeId)?.label?.toString() ?? '');

	return (
		<>
			<Modal
				isOpen={isModalOpen}
				onDismiss={hideModal}
				isBlocking={false}
				styles={{
					main: {
						padding: 10,
					},
				}}
			>
				<label htmlFor='edgeLabel'>Label</label>
				<input
					type='text'
					id='edgeLabel'
					value={label}
					onChange={(e) => {
						setLabel(e.target.value);
					}}
				/>

				<PrimaryButton
					onClick={() => {
						updateEdge(edgeId, { label });
						hideModal?.();
					}}
				>
					save
				</PrimaryButton>
			</Modal>
		</>
	);
};

export default EdgeDetailModal;
