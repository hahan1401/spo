import { useBoolean } from '@fluentui/react-hooks';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useReactFlow } from '@xyflow/react';
import React from 'react';
import { EdgeActions } from './EdgeButton';
import EdgeDetailModal from './EdgeDetailModal';
import { ICustomEdgeProps } from './types';

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
	data,
	...rest
}: ICustomEdgeProps): ReturnType<React.FC> => {
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
					{data?.canEdit && (
						<div className='menu'>
							<EdgeActions
								onDisconnectNode={onDisconnectNode}
								showModal={showModal}
							/>
						</div>
					)}
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
