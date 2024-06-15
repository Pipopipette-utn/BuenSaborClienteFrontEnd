import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { IArticulo, ICategoria } from "../../../types/empresa";
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

interface CatalogoProps {
  categoria: ICategoria | null;
  terminoBusqueda: string;
}

export const Catalogo: React.FC<CatalogoProps> = ({
  categoria,
  terminoBusqueda,
}) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [articulos, setArticulos] = useState<IArticulo[] | null>([]);

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

  console.log("Render de catalogo");

  useEffect(() => {
    setArticulos(null);
    const url = generarURL(
      categoria,
      selectedSucursalId!,
      terminoBusqueda,
      page
    );
    console.log("url generada: ", url);
    fetchArticulos(url, setArticulos, setTotalPages);
  }, [categoria, terminoBusqueda, page, fetchArticulos]);

  console.log("articulos dentro de catalogo: ", articulos);

  return (
    <Stack direction="column" width="100%" spacing={4}>
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

// Evita re-renderización si no cambian las props
export default React.memo(Catalogo, (prevProps, nextProps) => {
  return (
    prevProps.categoria === nextProps.categoria &&
    prevProps.terminoBusqueda === nextProps.terminoBusqueda
  );
});
