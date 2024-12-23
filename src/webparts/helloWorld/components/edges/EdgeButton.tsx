import { CommandBarButton, IButtonStyles, OverflowSet } from '@fluentui/react';

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
	const buttonStyles: Partial<IButtonStyles> = {
		root: {
			minWidth: 0,
			padding: 0,
			alignSelf: 'stretch',
			height: 'auto',
			borderRadius: '50%',
		},
	};
	return (
		<CommandBarButton
			ariaLabel='More items'
			styles={buttonStyles}
			menuIconProps={{ iconName: 'Info' }}
			menuProps={{ items: overflowItems! }}
		/>
	);
};

export const OverflowSetCustomExample = ({
	onDisconnectNode,
	showModal,
}: {
	onDisconnectNode: () => void;
	showModal: () => void;
}) => (
	<OverflowSet
		aria-label='Custom Example'
		overflowItems={[
			{
				key: 'disconect',
				name: 'Disconect',
				iconProps: { iconName: 'PlugDisconnected' },
				onClick: onDisconnectNode,
			},
			{
				key: 'label',
				name: 'Label',
				iconProps: { iconName: 'Edit' },
				onClick: showModal,
			},
		]}
		onRenderOverflowButton={onRenderOverflowButton}
		onRenderItem={() => undefined}
	/>
);
