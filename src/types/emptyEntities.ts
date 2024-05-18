import { IArticulo, ICategoria, IEmpresa, IImagen, ISucursal, IUnidadMedida } from "./empresa"
import { ICarrito, IDetallePedido } from "./pedido"


export const emptyEmpresa: IEmpresa = {
	baja: false,
	nombre: "",
	razonSocial: "",
	cuil: 0,
	icon: "",
}

export const emptySucursal: ISucursal = {
	baja: false,
	nombre: "",
	horarioApertura: "",
	horarioCierre: "",
	icon: ""
}

export const emptyCategoria: ICategoria =  {
    baja: false,
	denominacion: "",
	subcategorias: [],
}

export const emptyCarrito: ICarrito =  {
    baja: false,
	cantidadTotal: 0,
	total: 0,
	detallesPedido: []
}

export const emptyImagen: IImagen= {
	baja: false,
	denominacion:" "
}

export const emptyUnidadMedida: IUnidadMedida = {
	baja: false,
	denominacion: " "
}

export const emptyArticulo: IArticulo = {
	baja: false,
	denominacion: " ",
	precioVenta: 0,
	imagenes:[],
	categoria: emptyCategoria,
	categoriaId: 0,
	unidadMedida: emptyUnidadMedida,
	unidadMedidaId: 0
}

export const emptyDetallePedido: IDetallePedido= {
	baja: false,
	cantidad: 0,
	subTotal: 0,
	articulo: emptyArticulo
}






