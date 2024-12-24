import { DefaultButton } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { Panel } from '@xyflow/react';
import React, { useState } from 'react';
import DetailModal from '../Modal/DetailModal';
const SidePanel: React.FC = () => {
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
	const [isCreatingGroup, setIsCreatingGroup] = useState(false);

	return (
		<>
			<Panel position='top-left'>
				<DefaultButton
					onClick={() => {
						setIsCreatingGroup(false);
						showModal();
					}}
				>
					Create Node
				</DefaultButton>
				<DefaultButton
					onClick={() => {
						setIsCreatingGroup(true);
						showModal();
					}}
				>
					Create Node Group
				</DefaultButton>
			</Panel>

			{isModalOpen && (
				<DetailModal
					isModalOpen={isModalOpen}
					hideModal={hideModal}
					isCreatingGroup={isCreatingGroup}
				/>
			)}
		</>
	);
};

export default SidePanel;
