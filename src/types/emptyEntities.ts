import { IPedidoDTO } from "./dto"
import { IArticulo, IArticuloManufacturado, IArticuloManufacturadoDetalle, ICategoria, IEmpresa, IImagen, ISucursal, IUnidadMedida } from "./empresa"
import { FormaPago, TipoEnvio } from "./enums"
import { ICarrito, IDetallePedido } from "./pedido"
import { IDomicilio, ILocalidad, IProvincia } from "./ubicacion"


export const emptyEmpresa: IEmpresa = {
	baja: false,
	nombre: "",
	razonSocial: "",
	cuil: 0,
	logo: ""
}

export const emptySucursal: ISucursal = {
	baja: false,
	nombre: "",
	horarioApertura: "",
	horarioCierre: "",
	logo: "",
	esCasaMatriz: false
}

export const emptyCategoria: ICategoria =  {
    baja: false,
	denominacion: "",
	subCategorias: []
}

export const emptyCarrito: ICarrito =  {
    baja: false,
	cantidadTotal: 0,
	total: 0,
	detallesPedido: []
}

export const emptyImagen: IImagen= {
	id: " ",
	url:" ",
	name:" "
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
	unidadMedidaId: 0,
	esInsumo: false
}
export const emptyPedidoDto: IPedidoDTO = {
		total: 0,
		tipoEnvio: TipoEnvio.DELIVERY,
		formaPago: FormaPago.MERCADO_PAGO,
		domicilio: {
			id: 0,
		},
		cliente: {
			id: 0,
		},
		sucursal: {
			id: 0,
		},
		detallePedidos: [],
}
export const emptyDetallePedido: IDetallePedido= {
	baja: false,
	cantidad: 0,
	subTotal: 0,
	articulo: emptyArticulo
}

export const emptyArticuloManufacturado: IArticuloManufacturado =  {
	... emptyArticulo,
	preparacion: "",
	tiempoEstimadoMinutos: 0,
	descripcion: "",
	articuloManufacturadoDetalles: [],
}

export const emptyArticuloManufacturadoDetalle: IArticuloManufacturadoDetalle = {
	baja: false,
	cantidad: 0,
}

export const emptyProvincia: IProvincia = {
	baja: false,
	nombre: "",
}

export const emptyLocalidad: ILocalidad = {
	baja: false,
	nombre: "",
}

export const emptyDomicilio: IDomicilio = {
	baja: false,
	calle: ""
}



