import { IImagen, ISucursal } from "./empresa";
import { IPedido } from "./pedido";
import { IUsuario } from "./usuario";

export interface IPersona extends BaseEntity {
	nombre: string;
    apellidos: string
    telefono: string
    fechaNacimiento: Date
    usuario: IUsuario
    imagenPersona: IImagen
}

/* export interface ICliente  extends IPersona {
	domicilio: IDomicilio[];
    pedidos: IPedido[];
} */

export interface IEmpleado extends IPersona {
	pedidos: IPedido[];
    sucursal: ISucursal; 
}