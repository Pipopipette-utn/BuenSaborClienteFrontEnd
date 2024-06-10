
import { IPedido } from "./pedido";
import { IDomicilio } from "./ubicacion";

export interface IImagenPersona extends BaseEntity {
	name: string;
	url: string;
}


export interface IPersona extends BaseEntity {
	nombre: string;
	apellido: string;
	telefono: string;
	fechaNacimiento: Date;
	usuario: IUsuario;
	imagenPersona: IImagenPersona;
}

export interface ICliente extends IPersona {
	clave:string;
	domicilios: IDomicilio[];
	pedidos: IPedido[];
}

const enum Rol{
    ADMINISTRADOR,
    USUARIO,
    INVITADO
} 

export interface IUsuario extends BaseEntity {
	username: string;
	email: string;
    rol: Rol;
}



