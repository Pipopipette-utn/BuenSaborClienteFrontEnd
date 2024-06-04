import { useMemo } from "react";

const useURL = (
  categoriaSeleccionada: number | null,
  terminoBusqueda: string,
  page: number
) => {
  const generarURL = useMemo(() => {
    const params = new URLSearchParams({
      nombre: terminoBusqueda,
      page: (page - 1).toString(),
      size: "6",
    });

    if (categoriaSeleccionada) {
      params.append("categoriaId", categoriaSeleccionada.toString());
    }

    return `http://localhost:8080/articulosManufacturados/filtrar/${1}?${params}`;
  }, [categoriaSeleccionada, terminoBusqueda, page]);

  return generarURL;
};

export default useURL;
