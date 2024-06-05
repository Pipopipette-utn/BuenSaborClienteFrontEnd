import { IImagen, ISucursal, IUsuario } from "./empresa";
import { IPedido } from "./pedido";
import { IDomicilio } from "./ubicacion";

export interface IPersona extends BaseEntity {
	nombre: string;
    apellidos: string
    telefono: string
    fechaNacimiento: Date
    usuario: IUsuario
    imagenPersoan: IImagen
}

export interface ICliente  extends IPersona {
	domicilio: IDomicilio[];
    pedidos: IPedido[];
}

export interface IEmpleado extends IPersona {
	pedidos: IPedido[];
    sucursal: ISucursal; 
}