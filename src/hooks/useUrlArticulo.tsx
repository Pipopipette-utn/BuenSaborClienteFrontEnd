import { useMemo } from "react";
import { baseUrl } from "../App";

const useURL = (
  selectedCategoriaId: number | null,
  terminoBusqueda: string,
  page: number,
  endpointType: string // Nuevo parámetro para indicar el tipo de endpoint
) => {
  const generarURL = useMemo(() => {
    console.log("Id dentro de generarUrl: ", selectedCategoriaId);
    const params = new URLSearchParams({
      nombre: terminoBusqueda,
      page: (page - 1).toString(),
      size: "3",
    });

    if (selectedCategoriaId) {
      params.append("categoriaId", selectedCategoriaId.toString());
    }

    let endpoint = "";

    // Construye la parte específica de la URL según el tipo de endpoint
    switch (endpointType) {
      case "manufacturados":
        endpoint = "articulosManufacturados/filtrar/1";
        break;
      case "insumosDirectos":
        endpoint = "articulosInsumos/paged/insumosDirectos";
        break;

      default:
        // Endpoint por defecto
        endpoint = "articulosManufacturados/filtrar/1";
    }

    return `${baseUrl}/${endpoint}?${params}`;
  }, [selectedCategoriaId, terminoBusqueda, page, endpointType]);

  return generarURL;
};

export default useURL;
