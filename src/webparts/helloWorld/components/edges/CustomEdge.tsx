import { useBoolean } from '@fluentui/react-hooks';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useReactFlow, type EdgeProps } from '@xyflow/react';
import React from 'react';
import { OverflowSetCustomExample } from './EdgeButton';
import EdgeDetailModal from './EdgeDetailModal';

export type GetSpecialPathParams = {
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
};

export default ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	markerEnd,
	label,
	...rest
}: EdgeProps): ReturnType<React.FC> => {
	const { setEdges } = useReactFlow();
	const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);

	const edgePathParams = {
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	};
	const [path, labelX, labelY] = getSmoothStepPath(edgePathParams);

	const onDisconnectNode = (): void => {
		setEdges((edges) => edges.filter((edge) => edge.id !== id));
	};

	return (
		<>
			<BaseEdge
				{...rest}
				path={path}
				markerEnd={markerEnd}
				type='smoothstep'
				className='custom-edge'
			/>
			<EdgeLabelRenderer>
				<div
					className={`button-edge__label button-edge__label-custom nodrag nopan`}
					style={{
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					{label && (
						<p
							className='label'
							style={{ marginLeft: -3, backgroundColor: '#fff' }}
						>
							{label}
						</p>
					)}
					<div className='menu'>
						<OverflowSetCustomExample
							onDisconnectNode={onDisconnectNode}
							showModal={showModal}
						/>
					</div>
				</div>
			</EdgeLabelRenderer>

			<EdgeDetailModal
				edgeId={id}
				hideModal={hideModal}
				isModalOpen={isModalOpen}
			/>
		</>
	);
};
