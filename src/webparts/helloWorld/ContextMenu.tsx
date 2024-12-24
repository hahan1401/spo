import { DefaultButton } from '@fluentui/react';
import { useReactFlow } from '@xyflow/react';
import { IMenu } from './components/HelloWorld';

interface ContextMenuProps extends IMenu {
	showModal: () => void;
	closeContextMenu: () => void;
}

const ContextMenu = ({ node, top, left, showModal, closeContextMenu, ...props }: ContextMenuProps) => {
	const { deleteElements } = useReactFlow();
	return (
		<div
			style={{ top, left, transform: `translate(-50%, calc(-100% - 8px))`, display: 'flex', gap: 4 }}
			className='context-menu'
			{...props}
		>
			<DefaultButton
				onClick={() => {
					showModal();
					closeContextMenu();
				}}
			>
				Edit
			</DefaultButton>
			<DefaultButton
				onClick={() => {
					void deleteElements({ nodes: [{ id: node?.id ?? '' }] });
					closeContextMenu();
				}}
			>
				Delete
			</DefaultButton>
		</div>
	);
};

export default ContextMenu;
