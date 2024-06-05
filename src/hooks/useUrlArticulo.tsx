import { useMemo } from "react";

const useURL = (
  selectedCategoriaId: number | null,
  terminoBusqueda: string,
  page: number
) => {
  const generarURL = useMemo(() => {
    console.log("Id dentro de generarUrl: ", selectedCategoriaId);
    const params = new URLSearchParams({
      //categoriaId: selectedCategoriaId?.toString(),     //explota con esto
      nombre: terminoBusqueda,
      page: (page - 1).toString(),
      size: "6",
    });

    if (selectedCategoriaId) {
      params.append("categoriaId", selectedCategoriaId.toString());
    }

    return `http://localhost:8080/articulosManufacturados/filtrar/${2}?${params}`; //el numero es de la sucursal
  }, [selectedCategoriaId, terminoBusqueda, page]);

  return generarURL;
};

export default useURL;
