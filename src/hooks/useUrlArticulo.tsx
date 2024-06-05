import { useMemo } from "react";

const useURL = (
  categoriaSeleccionada: number | null,
  terminoBusqueda: string,
  page: number
) => {
  const generarURL = useMemo(() => {
    const params = new URLSearchParams({
      //categoriaId: categoriaSeleccionada?.toString(),     //explota con esto
      nombre: terminoBusqueda,
      page: (page - 1).toString(),
      size: "6",
    });

    if (categoriaSeleccionada) {
      params.append("categoriaId", categoriaSeleccionada.toString());
    }

    return `http://localhost:8080/articulosManufacturados/filtrar/${2}?${params}`; //el numero es de la sucursal
  }, [categoriaSeleccionada, terminoBusqueda, page]);

  return generarURL;
};

export default useURL;
