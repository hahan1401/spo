import React, { createContext, useContext, useState } from 'react';
import { AppNode } from '../nodes/types';

type Context = [AppNode['type'], (type: AppNode['type']) => void];

const DnDContext = createContext<Context>(['default', (_type_: AppNode['type']) => undefined]);

export const DnDProvider = ({ children }: { children: React.ReactNode }) => {
	const [type, setType] = useState<AppNode['type']>('default');

	return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export default DnDContext;

export const useDnD = () => {
	return useContext(DnDContext);
};
