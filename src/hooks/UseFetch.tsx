import { useEffect, useState } from "react";
import { baseUrl } from "../App";

export function useFetch<T>(url: RequestInfo | URL) {
  const [data, setData] = useState<T | null>(null); // Usa un generico
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    const abortController = new AbortController(); //Evita que se haga la request al sv en caso de cerrar la pagina
    setController(abortController);
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(baseUrl + url, { signal });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: T = await response.json();
        setData(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== "AbortError") {
            setError(error);
          }
        } else {
          setError(new Error("Ha ocurrido un error desconocido"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      console.error("Request cancelada");
    }
  };

  return { data, loading, error, handleCancelRequest };
}
