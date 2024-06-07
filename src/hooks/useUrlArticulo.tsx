import { useMemo } from "react";
import { baseUrl } from "../App";
import { ICategoria } from "../types/empresa";

const useURL = (
	selectedCategoria: ICategoria | null,
	terminoBusqueda: string,
	page: number
) => {
	const generarURL = useMemo(() => {
		const params = new URLSearchParams({
			//categoriaId: selectedCategoria?.toString(),     //explota con esto
			nombre: terminoBusqueda,
			page: (page - 1).toString(),
			size: "6",
		});

		if (selectedCategoria) {
			console.log("Id dentro de generarUrl: ", selectedCategoria.id!);
			params.append("categoriaId", selectedCategoria.id!.toString());
		}

		console.log(selectedCategoria);
		if (selectedCategoria?.esInsumo) {
			return `${baseUrl}/articulosInsumos/filtrar/${2}?${params}`; //el numero es de la sucursal
		} else {
			return `${baseUrl}/articulosManufacturados/filtrar/${2}?${params}`; //el numero es de la sucursal
		}
	}, [selectedCategoria, terminoBusqueda, page]);

	return generarURL;
};

export const generarURL = (
	selectedCategoria: ICategoria | null,
	terminoBusqueda: string,
	page: number
) => {
	const params = new URLSearchParams({
		//categoriaId: selectedCategoria?.toString(),     //explota con esto
		nombre: terminoBusqueda,
		page: (page - 1).toString(),
		size: "6",
	});

	if (selectedCategoria) {
		console.log("Id dentro de generarUrl: ", selectedCategoria.id!);
		params.append("categoriaId", selectedCategoria.id!.toString());
	}

	console.log(selectedCategoria);
	if (selectedCategoria?.esInsumo) {
		return `${baseUrl}/articulosInsumos/filtrar/${2}?${params}`; //el numero es de la sucursal
	} else {
		return `${baseUrl}/articulosManufacturados/filtrar/${2}?${params}`; //el numero es de la sucursal
	}
};

export default useURL;
