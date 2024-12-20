import { useBoolean } from '@fluentui/react-hooks';
import { Panel } from '@xyflow/react';
import React from 'react';
import DetailModal from '../Modal/DetailModal';
const SidePanel: React.FC = () => {
	// const [type] = useDnD();
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

	return (
		<>
			<Panel
				position='top-left'
				onClick={() => {
					showModal();
				}}
			>
				<button>Create Node</button>
			</Panel>

			<DetailModal
				isModalOpen={isModalOpen}
				hideModal={hideModal}
			/>
		</>
	);
};

export default SidePanel;
