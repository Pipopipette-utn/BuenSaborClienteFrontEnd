import { IArticuloManufacturadoDetalle, ISucursal } from "./empresa";
import { FormaPago, TipoEnvio } from "./enums";
import { IDomicilio } from "./ubicacion";

interface BaseEntityDTO {
	id?: number;
}

export interface IArticuloManufacturadoTableDTO extends BaseEntityDTO{
    denominacion: string;
	precioVenta: string;
	categoria?: string;
	unidadMedida: string;
    descripcion: string;
	tiempoEstimadoMinutos: number;
	preparacion: string;
	articuloManufacturadoDetalle: IArticuloManufacturadoDetalle[];
}

export interface ISucursalDTO extends BaseEntityDTO{
	nombre?: string;
}

export interface IArticuloPedidoDTO extends BaseEntityDTO{}

export interface IPedidoDTO extends BaseEntityDTO {
	total: number;
	tipoEnvio: TipoEnvio;
	formaPago: FormaPago;
	domicilio?: IDomicilio;
	sucursal?: ISucursalDTO;		//Sacar "?" cuando ande bien bien
	detallePedidos?: IDetallePedidoPostDTO[];
}

export interface IDetallePedidoPostDTO {
	cantidad: number;
	subTotal?: number;
	articulo: IArticuloPedidoDTO;
}