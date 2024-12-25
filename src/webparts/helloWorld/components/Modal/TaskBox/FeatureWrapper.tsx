import * as React from 'react';
import FeatureTitle from './FeatureTitle';

const FeatureWrapper = ({ title, renderDescription }: { title: string; renderDescription: () => React.ReactNode }) => {
	return (
		<div
			style={{
				display: 'flex',
				gap: 16,
				alignItems: 'center',
			}}
		>
			<FeatureTitle
				title={title}
				style={{ flex: 2, textAlign: 'center' }}
			/>
			<div style={{ flex: 5, lineHeight: 1, fontWeight: 600 }}>{renderDescription()}</div>
		</div>
	);
};

export default FeatureWrapper;
