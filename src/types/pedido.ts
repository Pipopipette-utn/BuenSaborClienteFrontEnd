import { IArticulo } from "./empresa";

export interface IDetallePedido extends BaseEntity {
	cantidad: number;
	subTotal: number;
	articulo: IArticulo;
}

export interface IPedido extends BaseEntity {
	horaEstimadaFinalizacion: number;
	total: number;
	totalCosto: number;
	estado: Estado;
	tipoEnvio: TipoEnvio;
	formaPago: FormaPago;
	fechaPedido: Date;
	domicilio: Domicilio;
	sucursal: Sucursal;
	factura: Factura;
	cliente: Cliente;
	detallesPedido?: IDetallePedido[];
    empleado: Empleado;
}

export interface ICarrito extends BaseEntity {
	cantidadTotal: number;
	total: number;
	detallesPedido?: IDetallePedido[];
}

