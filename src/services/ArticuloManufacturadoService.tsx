// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { IArticuloManufacturadoTableDTO } from "../types/dto";
import { IArticuloManufacturado } from "../types/empresa";
import { BackendClient } from "./BackendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloManufacturadoService extends BackendClient<IArticuloManufacturado> {
  articulosManufacturadosToDTO = (
    productos: IArticuloManufacturado[]
  ): IArticuloManufacturadoTableDTO[] => {
    const productosDTO = productos.map((producto) => {
      const productoDTO = {
        ...producto,
        precioVenta: producto.precioVenta ? `$${producto.precioVenta}` : "-",
        unidadMedida: producto.unidadMedida?.denominacion,
        categoria: producto.categoria ? producto.categoria.denominacion : "-",
        articuloManufacturadoDetalle: [],
      };
      return productoDTO as IArticuloManufacturadoTableDTO;
    });
    return productosDTO;
  };
}
