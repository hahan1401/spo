import { CSSProperties } from 'react';

const FeatureTitle = ({ title, style }: { title: string; style?: CSSProperties }) => {
	return (
		<div
			style={{
				backgroundColor: '#031c80',
				color: '#fff',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 20,
				padding: 8,
				...style,
			}}
		>
			<p>{title}</p>
		</div>
	);
};

export default FeatureTitle;
