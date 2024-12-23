import { PrimaryButton } from '@fluentui/react';
import React from 'react';
import { AppNode } from '../nodes/types';
import { useDnD } from './DnDContext';

const Sidebar = ({ onSave }: { onSave: () => void }) => {
	const [, setType] = useDnD();

	const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: AppNode['type']) => {
		setType?.(nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside
			className='side-bar-custom'
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<div>
				<div className='description'>You can drag these nodes to the pane on the right.</div>
				<div
					className='dndnode'
					onDragStart={(event) => onDragStart(event, 'custom-node')}
					draggable
				>
					Custom Node
				</div>
			</div>

			<div style={{ textAlign: 'right' }}>
				<PrimaryButton
					onClick={() => {
						onSave();
					}}
				>
					Save
				</PrimaryButton>
			</div>
		</aside>
	);
};

export default Sidebar;
