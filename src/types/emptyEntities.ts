import { ICategoria, IEmpresa, ISucursal } from "./empresa"


export const emptyEmpresa: IEmpresa = {
	baja: false,
	nombre: "",
	razonSocial: "",
	cuil: 0,
	icon: "",
}

export const emptySucursal: ISucursal = {
	baja: false,
	nombre: "",
	horarioApertura: "",
	horarioCierre: "",
	icon: ""
}

export const emptyCategoria: ICategoria =  {
    baja: false,
	denominacion: "",
	subcategorias: [],
}