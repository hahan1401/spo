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
}

export interface DiagramDetail {
	Id: number;
	Title: any;
	Nodes?: AppNode[];
	Edges?: Edge[];
	ID: number;
	Modified: string;
	Created: string;
	AuthorId: number;
}
