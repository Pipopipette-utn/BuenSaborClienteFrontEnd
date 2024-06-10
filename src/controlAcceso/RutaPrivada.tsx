import { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { IUsuario } from '../types/empresa';

export const RutaPrivada = ({ children }: { children: ReactNode }) => {
	
    const [usuario, setUsuario] = useState<IUsuario>(localStorage.getItem('usuario') as unknown as IUsuario);

	return usuario ? children : <Navigate to='/login' />;
};