import { ChangeEventHandler } from "react";
import { IDomicilio } from "./ubicacion";


export interface IEmpresa extends BaseEntity {
	nombre: string;
	razonSocial: string;
	cuil: number;
	icon: string;
	sucursales?: ISucursal[];
}

export interface ISucursal extends BaseEntity {
	nombre: string;
	horarioApertura: string;
	horarioCierre: string;
	icon: string;
	empresa?: IEmpresa;
	empresaId?: number;
	domicilio?: IDomicilio;
	domicilioId?: number;
	categorias?: ICategoria[];
}

export interface ICategoria extends BaseEntity {
	denominacion: string;
	subcategorias?: ICategoria[];
	categoriaPadreId?: number;
}

export interface ICategoriaSucursal extends BaseEntity {
	sucursalId: number;
	categoriaId: number;
}

export interface IArticulo extends BaseEntity {
	denominacion: string;
	precioVenta: number;
	imagenes?: IImagen[];
	categoria?: ICategoria;
	categoriaId?: number;
	unidadMedida?: IUnidadMedida;
	unidadMedidaId?: number;
	addCarrito?: ChangeEventHandler;
}

export interface IUnidadMedida extends BaseEntity {
	denominacion: string;
}

export interface IImagen extends BaseEntity {
	denominacion: string;
}

export interface IUsuario extends BaseEntity {
	username: string;
	password: string;
}
