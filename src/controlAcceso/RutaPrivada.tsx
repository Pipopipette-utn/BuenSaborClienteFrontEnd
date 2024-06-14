import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { IUsuario } from "../types/empresa";
import { useAppSelector } from "../redux/HookReducer";
import { RootState } from "../redux/Store";

export const RutaPrivada = ({ children }: { children: ReactNode }) => {
  const usuario = useAppSelector((state: RootState) => state.user.isLogged);

  return usuario ? children : <Navigate to="/login" />;
};
