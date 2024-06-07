import { useEffect } from "react";

const useFetchArticulosInsumo = () => {
  const fetchArticulosInsumo = async (url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Error al obtener los artículos de insumos directos desde ${url}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(
        "Error al obtener los artículos de insumos directos:",
        error
      );
      throw error;
    }
  };

  return fetchArticulosInsumo;
};

export default useFetchArticulosInsumo;
