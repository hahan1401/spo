import {
	CommandBarButton,
	DirectionalHint,
	IButtonStyles,
	IOverflowSetItemProps,
	OverflowSet,
	TooltipHost,
} from '@fluentui/react';

const onRenderItemStyles = {
	root: { padding: '10px' },
};

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
	const buttonStyles: Partial<IButtonStyles> = {
		root: {
			minWidth: 0,
			padding: '0 4px',
			alignSelf: 'stretch',
			height: 'auto',
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

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
	return (
		<TooltipHost
			content={item.title}
			directionalHint={DirectionalHint.rightCenter}
		>
			<CommandBarButton
				aria-label={item.name}
				styles={onRenderItemStyles}
				iconProps={{ iconName: item.icon }}
				onClick={item.onClick}
			/>
		</TooltipHost>
	);
};

export const OverflowSetCustomExample = ({ onDisconnectNode }: { onDisconnectNode: () => void }) => (
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
			},
		]}
		onRenderOverflowButton={onRenderOverflowButton}
		onRenderItem={onRenderItem}
	/>
);
