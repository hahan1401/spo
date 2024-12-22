import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useReactFlow, type EdgeProps } from '@xyflow/react';
import React from 'react';
import { OverflowSetCustomExample } from './EdgeButton';

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
}: EdgeProps): ReturnType<React.FC> => {
	const { setEdges } = useReactFlow();

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
				path={path}
				markerEnd={markerEnd}
				type='smoothstep'
				className='asd-asd'
			/>
			<EdgeLabelRenderer>
				<div
					className={`button-edge__label nodrag nopan`}
					style={{
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<p
						className='label'
						style={{ marginLeft: -3, backgroundColor: '#fff' }}
					>
						{label}
					</p>
					<div className='menu'>
						<OverflowSetCustomExample onDisconnectNode={onDisconnectNode} />
					</div>
					{/* <button
						className='button-edge__button'
						onClick={onEdgeClick}
					>
						×
					</button> */}
				</div>
			</EdgeLabelRenderer>
		</>
	);
};
