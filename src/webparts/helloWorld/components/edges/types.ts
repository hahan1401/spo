import { Edge, EdgeProps } from '@xyflow/react';

interface ICustomEdgeData {
	canEdit?: boolean;
	[x: string]: unknown;
}

export type ICustomEdge = Edge<ICustomEdgeData>;

export type ICustomEdgeProps = EdgeProps<ICustomEdge>;
