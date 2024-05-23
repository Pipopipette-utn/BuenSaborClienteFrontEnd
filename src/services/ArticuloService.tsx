// Importamos el tipo de dato IEmpresa y la clase BackendClient
import {
	IArticulo,
	IArticuloManufacturado,
	ICategoria,
	IUnidadMedida,
} from "../types/empresa";
import { BackendClient } from "./BakendClient";

// Clase ArticuloService que extiende BackendClient para interactuar con la API de articulos
export class ArticuloService extends BackendClient<IArticulo> {
	mapArticulos = (
		articulosHijos: IArticuloInsumo[] | IArticuloManufacturado[],
		articulosPadres: IArticulo[],
		unidadMedidas: IUnidadMedida[],
		categorias: ICategoria[]
	): (IArticuloInsumo | IArticuloManufacturado)[] => {
		const articulosMapeados = articulosHijos.map((producto) => {
			const articulo = articulosPadres?.find((a) => a.id == producto.id);
			const unidadMedida = unidadMedidas.find(
				(u: IUnidadMedida) => u.id == articulo!.unidadMedida?.id
			);
			let categoria: ICategoria | undefined = categorias.find(
				(c: ICategoria) => c.id == articulo!.categoria?.id
			);

			if (categoria !== undefined)
				return {
					...producto,
					categoria,
					unidadMedida,
					...articulo,
				};
			else
				return {
					...producto,
					unidadMedida,
					...articulo,
				};
		});
		return articulosMapeados;
	};
}
