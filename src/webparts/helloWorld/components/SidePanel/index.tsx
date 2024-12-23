import { DefaultButton } from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import { Panel } from '@xyflow/react';
import React from 'react';
import DetailModal from '../Modal/DetailModal';
import NodeGroupModal from './NodeGroupModal';
const SidePanel: React.FC = () => {
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
	const [isGroupModalOpen, { setTrue: showGroupModal, setFalse: hideGroupModal }] = useBoolean(false);

	return (
		<>
			<Panel position='top-left'>
				<DefaultButton
					onClick={() => {
						showModal();
					}}
				>
					Create Node
				</DefaultButton>
				<DefaultButton
					onClick={() => {
						showGroupModal();
					}}
				>
					Create Node Group
				</DefaultButton>
			</Panel>

			<DetailModal
				isModalOpen={isModalOpen}
				hideModal={hideModal}
			/>

			<NodeGroupModal
				isModalOpen={isGroupModalOpen}
				hideModal={hideGroupModal}
			/>
		</>
	);
};

export default SidePanel;
