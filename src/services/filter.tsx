import { IEmpresa, ISucursal } from "../types/empresa";

export const filtrarSucursales = (sucursales: ISucursal[], empresa: IEmpresa) => {
    return sucursales.filter((s) => s.empresa!.id == empresa.id);
};