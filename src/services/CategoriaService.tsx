// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { ISucursalDTO } from "../types/dto";
import { ICategoria } from "../types/empresa";
import { BackendClient } from "./BakendClient";

// Clase CategoriaService que extiende BackendClient para interactuar con la API de categorias
export class CategoriaService extends BackendClient<ICategoria> {
	filterBySucursal = async (
		categorias: ICategoria[],
		sucursalId: number
	): Promise<ICategoria[]> => {
		const categoriasSucursal = categorias.filter((categoria) =>
			categoria.sucursales?.some((s) => s.id === sucursalId)
		);

		return categoriasSucursal;
	};

	async baja(id: number, sucursal: ISucursalDTO) {
		try {
			const response = await fetch(`${this.baseUrl}/baja/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(sucursal),
			});
			if (!response.ok) {
				throw Error(response.statusText);
			}
		} catch (error) {
			console.error(error); // Imprime el error en la consola
		}
	}

}

/*
categoriasSucursal.forEach((categoriaSucursal) => {
			console.log(categoriaSucursal.categoriaId);
			let categoria = categorias.find(
				(c: ICategoria) => c.id == categoriaSucursal.categoriaId
			);
			if (categoria) {
				categoria = { ...categoria, subcategorias: [] };
				categoria = {
					...categoria,
					subcategorias: categorias.filter((c) => {
						return c.categoriaPadreId == categoria!.id;
					}),
				};
				console.log(categoria);
				categoriasFiltradas.push(categoria);
			}
		});
		*/
