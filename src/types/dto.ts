import { IArticuloManufacturadoDetalle, ISucursal } from "./empresa";
import { FormaPago, TipoEnvio } from "./enums";
import { ICliente } from "./persona";
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

export interface IArticuloPedidoDTO extends BaseEntityDTO{
	//descripcion: string;
	tiempoEstimadoMinutos: number;
	//preparacion: string;
}

export interface IPedidoDTO extends BaseEntityDTO {
	total: number;
	tipoEnvio: TipoEnvio;
	formaPago: FormaPago;
	domicilio?: IDomicilio;
	cliente?: IClienteDTO;
	sucursal?: ISucursalDTO;		//Sacar "?" cuando ande bien bien
	detallePedidos?: IDetallePedidoPostDTO[];
}

export interface IDetallePedidoPostDTO {
	cantidad: number;
	subTotal?: number;
	articulo: IArticuloPedidoDTO;
}

export interface IClienteDTO extends BaseEntityDTO{}