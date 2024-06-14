import React, { ChangeEvent, useEffect, useState } from "react";
import { IArticulo, ICategoria } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { Stack, Pagination, LinearProgress, Typography } from "@mui/material";
import { Buscador } from "./Buscador";
import useFetchArticulos from "../../../hooks/useFetchArticulos";
import { generarURL } from "../../../hooks/useUrlArticulo";
import { useAppSelector } from "../../../redux/HookReducer";

export const Catalogo: React.FC<{ categoria: ICategoria | null }> = ({
  categoria,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[] | null>([]);

  const fetchArticulos = useFetchArticulos();

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const selectedCategoria = useAppSelector(
    (state) => state.selectedData.selectedCategoria
  );
  console.log("Render de catalogo");
  useEffect(() => {
    setArticulos(null);
    const url = generarURL(categoria, terminoBusqueda, page);
    fetchArticulos(url, setArticulos, setTotalPages);
  }, [categoria, terminoBusqueda, page, fetchArticulos]);

  const handleSearch = (term: string) => {
    setTerminoBusqueda(term);
    setPage(1); // Resetear página a 1 cuando se realiza una nueva búsqueda
  };

  console.log("articulos dentro de catalogo: ", articulos);

  return (
    <Stack direction="column" width="50vw" spacing={4}>
      <Buscador onSearch={handleSearch} palabra={terminoBusqueda} />
      <Typography
        variant="h4"
        sx={{ alignSelf: "center", fontWeight: "bold", fontSize: "24px" }}
      >
        Categoría {selectedCategoria!.denominacion}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        {articulos ? (
          articulos.length === 0 ? (
            "Ups! No hay ningún producto en esta categoría."
          ) : (
            articulos.map((articulo) => (
              <CardArticulo key={articulo.id} articulo={articulo} />
            ))
          )
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
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
