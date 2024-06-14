import { Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { IUsuario } from '../types/usuario';


interface Props {
  rol: Rol;
}

function RolUsuario({ rol }: Props) {
  
    const [jsonUsuario, setJSONUsuario] = useState<any>(localStorage.getItem('usuario'));
    const usuarioLogueado:IUsuario = JSON.parse(jsonUsuario) as IUsuario;
    //si esta logueado y es administrador lo dejo ingresar si no
    if((usuarioLogueado && usuarioLogueado.rol === rol)){
        return <Outlet/>;
    }else if(usuarioLogueado){
        return <Navigate replace to='/#inicio' />;
    }else{
        return <Navigate replace to='/login' />;
    }
    
}
export default RolUsuario;