import { IArticulo } from "./empresa";

export interface IDetallePedido extends BaseEntity {
	cantidad: number;
	subTotal: number;
	articulo: IArticulo;
}

export interface IPedido extends BaseEntity {
	cantidad: number;
	total: number;
	detallesPedido?: IDetallePedido[];
    
}

export interface ICarrito extends BaseEntity {
	cantidadTotal: number;
	total: number;
	detallesPedido?: IDetallePedido[];
}

