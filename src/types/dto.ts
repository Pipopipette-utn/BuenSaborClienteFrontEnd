import { IArticuloManufacturadoDetalle } from "./empresa";


export interface IArticuloManufacturadoTableDTO {
    denominacion: string;
	precioVenta: string;
	categoria?: string;
	unidadMedida: string;
    descripcion: string;
	tiempoEstimadoMinutos: number;
	preparacion: string;
	articuloManufacturadoDetalle: IArticuloManufacturadoDetalle[];
}

export interface ISucursalDTO extends BaseEntity{
	nombre: string;
}