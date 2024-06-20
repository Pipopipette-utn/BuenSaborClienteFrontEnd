import { Navigate, Outlet } from "react-router-dom";
import { IUsuario } from "../types/usuario";
import { Rol } from "../types/enums";

interface Props {
  rol: Rol | undefined;
}

function RolUsuario({ rol }: Props) {
  const jsonUsuario = localStorage.getItem("usuario");
  const usuarioLogueado: IUsuario | null = jsonUsuario
    ? (JSON.parse(jsonUsuario) as IUsuario)
    : null;

  // Si hay un usuario logueado y tiene el rol adecuado, permitir acceso
  if (usuarioLogueado && usuarioLogueado.rol === rol) {
    return <Outlet />;
  } else if (usuarioLogueado) {
    // Si hay un usuario logueado pero no tiene el rol adecuado, redirigir a inicio
    return <Navigate replace to="/#inicio" />;
  } else {
    // Si no hay usuario logueado, redirigir a la página de login
    return <Navigate replace to="/login" />;
  }
}

export default RolUsuario;
