import { FontWeights, getTheme, IButtonStyles, IIconProps, IStackProps, mergeStyleSets } from '@fluentui/react';

export const cancelIcon: IIconProps = { iconName: 'Cancel' };

export const theme = getTheme();
export const contentStyles = mergeStyleSets({
	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		alignItems: 'stretch',
	},
	header: [
		theme.fonts.xLargePlus,
		{
			flex: '1 1 auto',
			borderTop: `4px solid ${theme.palette.themePrimary}`,
			color: theme.palette.neutralPrimary,
			display: 'flex',
			alignItems: 'center',
			fontWeight: FontWeights.semibold,
			padding: '12px 12px 14px 24px',
		},
	],
	heading: {
		color: theme.palette.neutralPrimary,
		fontWeight: FontWeights.semibold,
		fontSize: 'inherit',
		margin: '0',
	},
	body: {
		flex: '4 4 auto',
		padding: '0 24px 24px 24px',
		overflowY: 'hidden',
		selectors: {
			'p:first-child': { marginTop: 0 },
			'p:last-child': { marginBottom: 0 },
		},
	},
});
export const stackProps: Partial<IStackProps> = {
	horizontal: true,
	tokens: { childrenGap: 40 },
	styles: { root: { marginBottom: 20 } },
};
export const iconButtonStyles: Partial<IButtonStyles> = {
	root: {
		color: theme.palette.neutralPrimary,
		marginLeft: 'auto',
		marginTop: '4px',
		marginRight: '2px',
	},
	rootHovered: {
		color: theme.palette.neutralDark,
	},
};
