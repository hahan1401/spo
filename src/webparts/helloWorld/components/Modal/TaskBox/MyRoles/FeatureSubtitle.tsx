import { CSSProperties } from 'react';

const FeatureSubtitle = ({ title, firstLetterStyle }: { title: string; firstLetterStyle?: CSSProperties }) => {
	const firstLetter = title.charAt(0);
	const rest = title.slice(1);
	return (
		<div style={{ padding: 4, display: 'flex', alignItems: 'center', backgroundColor: '#e6e6e6', width: 120 }}>
			<div
				style={{
					fontWeight: 600,
					padding: 6,
					border: '1px solid #999',
					aspectRatio: 1,
					width: 28,
					textAlign: 'center',
					...firstLetterStyle,
				}}
			>
				{firstLetter}
			</div>
			{rest}
		</div>
	);
};

export default FeatureSubtitle;
