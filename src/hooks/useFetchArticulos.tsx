import { useCallback } from "react";

const useFetchArticulos = () => {
  const fetchArticulos = useCallback(
    async (url: string, setArticulos: Function, setTotalPages: Function) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error de conexión con ${url}`);
        }

        const data = await response.json();

        setArticulos(data.content); // Reemplaza artículos existentes
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error trayendo artículos:", error);
      }
    },
    []
  );

  return fetchArticulos;
};

export default useFetchArticulos;
