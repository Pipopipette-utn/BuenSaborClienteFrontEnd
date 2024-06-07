import React, { ChangeEvent, useEffect, useState } from "react";
import { IArticulo, ICategoria } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { Stack, Pagination } from "@mui/material";
import { Buscador } from "./Buscador";
import useFetchArticulos from "../../../hooks/useFetchArticulos";
import useURL, { generarURL } from "../../../hooks/useUrlArticulo";

export const Catalogo: React.FC<{ categoria: ICategoria | null }> = ({
  categoria,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[]>([]);

  const fetchArticulos = useFetchArticulos();

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const url = generarURL(categoria, terminoBusqueda, page);
    fetchArticulos(url, setArticulos, setTotalPages);
  }, [categoria, terminoBusqueda, page, fetchArticulos]);

  const handleSearch = (term: string) => {
    setTerminoBusqueda(term);
    setPage(1); // Resetear página a 1 cuando se realiza una nueva búsqueda
  };

  console.log(articulos);

  return (
    <Stack direction="column" width="50vw" spacing={4}>
      <Buscador onSearch={handleSearch} palabra={terminoBusqueda} />
      <Stack direction="row" spacing={2} justifyContent="center">
        {articulos.map((articulo) => (
          <CardArticulo key={articulo.id} articulo={articulo} />
        ))}
      </Stack>
      <Stack direction="row" justifyContent="center">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </Stack>
  );
};
