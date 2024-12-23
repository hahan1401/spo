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
				<button
					onClick={() => {
						showModal();
					}}
				>
					Create Node
				</button>
				<button
					onClick={() => {
						showGroupModal();
					}}
				>
					Create Node Group
				</button>
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
