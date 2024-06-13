import { IDomicilio } from "./ubicacion";
import { ISucursalDTO } from "./dto";
import { TipoPromocion } from "./enums";

export interface IEmpresa extends BaseEntity {
	nombre: string;
	razonSocial: string;
	cuil: number;
	logo: string;
	sucursales?: ISucursal[];
}

export interface ISucursal extends BaseEntity {
	nombre: string;
	horarioApertura: string;
	horarioCierre: string;
	logo: string;
	esCasaMatriz: boolean;
	empresa?: IEmpresa;
	domicilio?: IDomicilio;
	categorias?: ICategoria[];
	articulos?: IArticulo[];
}

export interface ICategoria extends BaseEntity {
	denominacion: string;
	subCategorias?: ICategoria[];
	categoriaPadreId?: number;
	sucursales?: ISucursalDTO[];
	esInsumo: boolean;
	esParaVender: boolean;
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
	esInsumo: boolean;
}

export interface IArticuloManufacturado extends IArticulo {
	descripcion: string;
	tiempoEstimadoMinutos: number;
	preparacion: string;
	articuloManufacturadoDetalles?: IArticuloManufacturadoDetalle[];
	
}

export interface IArticuloManufacturadoDetalle extends BaseEntity {
	cantidad: number;
}

export interface IUnidadMedida extends BaseEntity {
	denominacion: string;
}

export interface IImagen {
	id: string;
	url: string;
	name: string;
}

/* export interface IUsuario extends BaseEntity {
	username: string;
	email: string;
} */


export interface IPromocionDetalle extends BaseEntity {
	cantidad: number;
	articulo: IArticulo;
}
export interface IPromocion extends BaseEntity {
	denominacion: string;
	fechaDesde: Date;
	fechaHasta: Date;
	horaDesde:Date;
	horaHasta:Date;
	descripcionDescuento: string;
	precioPromocional: number;
	tipoPromocion: TipoPromocion;
	promocionDetalles: IPromocionDetalle;
	imagenes:IImagen[];
	sucursales: ISucursal[];
}


