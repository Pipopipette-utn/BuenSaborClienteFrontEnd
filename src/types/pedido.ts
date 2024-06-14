import { IArticulo, ISucursal } from "./empresa";
import { Estado, FormaPago, TipoEnvio } from "./enums";
import {  IEmpleado } from "./persona";
import { IDomicilio } from "./ubicacion";
import { ICliente } from "./usuario";

export interface IDetallePedido extends BaseEntity {
	cantidad: number;
	subTotal?: number;
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
	domicilio: IDomicilio;
	sucursal: ISucursal;
	factura: IFactura;
	cliente: ICliente;
	detallesPedido?: IDetallePedido[];
    empleado: IEmpleado;
}

export interface ICarrito extends BaseEntity {
	cantidadTotal: number;
	total: number;
	detallesPedido?: IDetallePedido[];
}

export interface IFormaPago extends BaseEntity {
	cantidadTotal: number;
	total: number;
	detallesPedido?: IDetallePedido[];
}

export interface IFactura extends BaseEntity {
	fechaFacturacion: Date;
	mpPaymentId: number;
	mpMerchantOrderId: number;
	mpPreferenceId: string;
	mpPaymentType: string;
	formaPago: FormaPago;
	totalVenta: number;

}

