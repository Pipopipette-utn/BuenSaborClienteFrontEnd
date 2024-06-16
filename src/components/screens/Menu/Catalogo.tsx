import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IArticulo } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import {
  Stack,
  Pagination,
  LinearProgress,
  Typography,
  Grid,
} from "@mui/material";
import { Buscador } from "./Buscador";
import useFetchArticulos from "../../../hooks/useFetchArticulos";
import { generarURL } from "../../../hooks/useUrlArticulo";
import { useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";

export const Catalogo = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[] | null>(null);

  const fetchArticulos = useFetchArticulos();

  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const selectedCategoria = useAppSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const selectedSucursalId = useAppSelector(
    (state: RootState) => state.selectedData.sucursal?.id
  );

  const url = useMemo(() => {
    return generarURL(
      selectedCategoria,
      selectedSucursalId!,
      terminoBusqueda,
      page
    );
  }, [selectedCategoria, selectedSucursalId, terminoBusqueda, page]);

  useEffect(() => {
    setArticulos(null);
    console.log("url generada: ", url);
    fetchArticulos(url, setArticulos, setTotalPages);
  }, [url, fetchArticulos]);

  const handleSearch = useCallback((term: string) => {
    setTerminoBusqueda(term.toLowerCase());
    setPage(1); // Resetear página a 1 cuando se realiza una nueva búsqueda
  }, []);

  return (
    <Stack direction="column" width="50vw" spacing={4}>
      <Buscador onSearch={handleSearch} palabra={terminoBusqueda} />
      <Typography
        variant="h4"
        sx={{ alignSelf: "center", fontWeight: "bold", fontSize: "24px" }}
      >
        Categoría {selectedCategoria!.denominacion}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {articulos ? (
          articulos.length === 0 ? (
            "Ups! No hay ningún producto en esta categoría."
          ) : (
            articulos.map((articulo) => (
              <Grid item xs={12} sm={6} key={articulo.id}>
                <CardArticulo key={articulo.id} articulo={articulo} />
              </Grid>
            ))
          )
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Grid>
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
