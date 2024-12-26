import { Edge } from '@xyflow/react';
import { AppNode } from './components/nodes/types';

export interface DiagramDetailResponse {
	Id: number;
	Title: any;
	Nodes?: string;
	Edges?: string;
	ID: number;
	Modified: string;
	Created: string;
	AuthorId: number;
	PageUrl: string;
}

export interface DiagramDetail extends Omit<DiagramDetailResponse, 'Nodes' | 'Edges'> {
	Nodes?: AppNode[];
	Edges?: Edge[];
}
