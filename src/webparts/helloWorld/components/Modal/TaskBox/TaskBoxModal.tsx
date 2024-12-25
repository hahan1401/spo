import { Modal } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { IconButton } from '@fluentui/react/lib/Button';
import { cancelIcon, contentStyles, iconButtonStyles } from '../helper';
import FeatureTitle from './FeatureTitle';
import FeatureWrapper from './FeatureWrapper';
import MyRolesDetail from './MyRoles';

export const TaskBoxModal = ({ isModalOpen, hideModal }: { isModalOpen?: boolean; hideModal?: () => void }) => {
	const titleId = useId('title');

	return (
		<Modal
			titleAriaId={titleId}
			isOpen={isModalOpen}
			onDismiss={hideModal}
			isBlocking={false}
			containerClassName={contentStyles.container}
			styles={{
				main: {
					backgroundColor: '#59b7ff',
				},
			}}
		>
			<div className={contentStyles.header}>
				<h2
					className={contentStyles.heading}
					id={titleId}
				>
					{''}
				</h2>
				<IconButton
					styles={iconButtonStyles}
					iconProps={cancelIcon}
					ariaLabel='Close popup modal'
					onClick={hideModal}
				/>
			</div>
			<div className={contentStyles.body}>
				<div
					style={{
						marginBottom: 12,
					}}
				>
					<FeatureTitle title='Task Box' />
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 8,
					}}
				>
					<FeatureWrapper
						title='Task Details'
						renderDescription={() => {
							return <p>Establish workflow, critical path and items via input metting</p>;
						}}
					/>
					<FeatureWrapper
						title='Task owner'
						renderDescription={() => {
							return <p>Standards Planner</p>;
						}}
					/>
					<FeatureWrapper
						title='Personnel Involved'
						renderDescription={() => {
							return <p>Standards Manager, Operations Manager, SFM, AFM, PE</p>;
						}}
					/>
					<FeatureWrapper
						title='My Roles'
						renderDescription={() => {
							return (
								<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
									<MyRolesDetail
										firstLetterStyle={{
											backgroundColor: '#bfb715',
											color: '#fff',
										}}
										details={[
											`<strong>(I-7) pre-input meeting:</strong> agree and align on cretical path and resource requirements (tooling, masterials, etc)`,
											`Critical Path (Re)Planning and Risks Escalation incl. delays in checks/ TAT extension (Ongoing)`,
											`<strong>Tools & Equipment:</strong> Request and update booking`,
										]}
									/>
									<MyRolesDetail
										firstLetterStyle={{
											backgroundColor: '#665f23',
										}}
										details={[
											`Manpower planiing and resourcing`,
											`Rasing request and liaise with Common pool`,
											`<strong>Shops:</strong> Request for shop resources in non-routine tasks`,
											`Update and liaise with Customer`,
										]}
									/>
									<button
										style={{
											width: 320,
											textAlign: 'center',
											padding: 12,
											color: '#fff',
											backgroundColor: '#bfb715',
											borderRadius: 20,
											cursor: 'pointer',
											border: 0,
										}}
									>
										View RACI Chart
									</button>
								</div>
							);
						}}
					/>

					<FeatureWrapper
						title='KPIs'
						renderDescription={() => {
							return (
								<div>
									<div style={{ display: 'flex', backgroundColor: '#000', color: '#fff', padding: 4 }}>
										<p style={{ flex: 2 }}>KPI</p>
										<p style={{ flex: 1 }}>Unit</p>
										<p style={{ flex: 4 }}>Description</p>
									</div>
									<div style={{ display: 'flex', fontSize: 12, alignItems: 'center' }}>
										<p style={{ flex: 2 }}>Burn rate</p>
										<p style={{ flex: 1 }}>%</p>
										<p style={{ flex: 4 }}>Measure workflow planning effectiveness</p>
									</div>
									<div style={{ display: 'flex', fontSize: 12, alignItems: 'center' }}>
										<p style={{ flex: 2 }}>BOM/ BOT availability</p>
										<p style={{ flex: 1 }}>%</p>
										<p style={{ flex: 4 }}>Measure material and tools planning accuracy</p>
									</div>
								</div>
							);
						}}
					/>

					<FeatureWrapper
						title='Resources'
						renderDescription={() => {
							return (
								<>
									<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
										<IconButton
											iconProps={{ iconName: 'PDF' }}
											title='PDF'
											ariaLabel='PDF'
											style={{
												color: '#000',
											}}
										/>
										<p style={{ flex: 1 }}>Production Meeting: Key Steps and Outcomes</p>
										<IconButton
											iconProps={{ iconName: 'NavigateExternalInline' }}
											title='NavigateExternalInline'
											ariaLabel='NavigateExternalInline'
											style={{
												color: '#000',
											}}
										/>
									</div>
									<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
										<IconButton
											iconProps={{ iconName: 'PowerPointDocument' }}
											title='PowerPointDocument'
											ariaLabel='PowerPointDocument'
											style={{
												color: '#000',
											}}
										/>
										<p style={{ flex: 1 }}>Critical Path Planning: Template</p>
										<IconButton
											iconProps={{ iconName: 'NavigateExternalInline' }}
											title='NavigateExternalInline'
											ariaLabel='NavigateExternalInline'
											style={{
												color: '#000',
											}}
										/>
									</div>
								</>
							);
						}}
					/>
				</div>
			</div>
		</Modal>
	);
};
