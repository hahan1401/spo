import React from 'react';
import { AppNode } from '../nodes/types';
import { useDnD } from './DnDContext';

const Sidebar = () => {
	const [, setType] = useDnD();

	const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: AppNode['type']) => {
		setType?.(nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};

	return (
		<aside className='side-bar-custom'>
			<div className='description'>You can drag these nodes to the pane on the right.</div>
			<div
				className='dndnode'
				onDragStart={(event) => onDragStart(event, 'custom-node')}
				draggable
			>
				Custom Node
			</div>
		</aside>
	);
};

export default Sidebar;
