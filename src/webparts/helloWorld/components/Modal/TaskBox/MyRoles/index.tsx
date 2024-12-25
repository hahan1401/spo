import { CSSProperties } from 'react';
import FeatureSubtitle from './FeatureSubtitle';

const MyRolesDetail = ({ details, firstLetterStyle }: { details: string[]; firstLetterStyle?: CSSProperties }) => {
	return (
		<div>
			<FeatureSubtitle
				title={'Responsesible'}
				firstLetterStyle={{
					...firstLetterStyle,
				}}
			/>
			<div style={{ marginLeft: 44, width: 250, background: '#fff' }}>
				{details.map((item) => {
					return (
						<div
							key={item}
							style={{ padding: '6px 4px', borderBottom: '1px solid #333' }}
							dangerouslySetInnerHTML={{ __html: item }}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default MyRolesDetail;
