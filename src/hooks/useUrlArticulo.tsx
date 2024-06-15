import { memo, useMemo } from "react";
import { baseUrl } from "../App";
import { ICategoria } from "../types/empresa";

export const generarURL = (
  selectedCategoria: ICategoria | null,
  selectedSucursalId: number,
  terminoBusqueda: string,
  page: number
) => {
  const params = new URLSearchParams({
    //categoriaId: selectedCategoria?.toString(),     //explota con esto
    nombre: terminoBusqueda.toLowerCase(),
    page: (page - 1).toString(),
    size: "6",
  });

  if (selectedCategoria) {
    console.log("Id dentro de generarUrl: ", selectedCategoria.id!);
    params.append("categoriaId", selectedCategoria.id!.toString());
  }

  console.log(selectedCategoria);
  if (selectedCategoria?.esInsumo) {
    return `${baseUrl}/articulosInsumos/filtrar/${selectedSucursalId}?${params}`; //el numero es de la sucursal
  } else {
    return `${baseUrl}/articulosManufacturados/filtrar/${selectedSucursalId}?${params}`; //el numero es de la sucursal
  }
};
