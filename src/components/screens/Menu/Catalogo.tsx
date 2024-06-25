import React, {
  ChangeEvent,
  memo,
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
  Box,
} from "@mui/material";
import { Buscador } from "./Buscador";
import useFetchArticulos from "../../../hooks/useFetchArticulos";
import { generarURL } from "../../../hooks/useUrlArticulo";
import { useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";

// Función para formatear horarios
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};

const Catalogo: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[] | null>(null);

  const fetchArticulos = useFetchArticulos();

  const handlePageChange = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const selectedCategoria = useAppSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const selectedSucursal = useAppSelector(
    (state: RootState) => state.selectedData.sucursal
  );

  const url = useMemo(() => {
    return generarURL(
      selectedCategoria,
      selectedSucursal?.id!,
      terminoBusqueda,
      page
    );
  }, [selectedCategoria, selectedSucursal?.id, terminoBusqueda, page]);

  useEffect(() => {
    if (selectedCategoria && selectedSucursal?.id) {
      setArticulos(null);
      console.log("url generada: ", url);
      fetchArticulos(url, setArticulos, setTotalPages);
    }
  }, [url, fetchArticulos]);

  const handleSearch = useCallback((term: string) => {
    setTerminoBusqueda(term.toLowerCase());
    setPage(1); // Resetear página a 1 cuando se realiza una nueva búsqueda
  }, []);

  return (
    <Stack direction="column" width="50vw" spacing={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
          //backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontSize: "32px",
            textAlign: "center",
          }}
        >
          {selectedSucursal?.nombre}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            textAlign: "center",
            marginTop: "8px",
          }}
        >
          {selectedSucursal?.horarioApertura &&
            formatTime(selectedSucursal.horarioApertura)}{" "}
          -{" "}
          {selectedSucursal?.horarioCierre &&
            formatTime(selectedSucursal.horarioCierre)}
        </Typography>
      </Box>
      <Buscador onSearch={handleSearch} palabra={terminoBusqueda} />
      <Typography
        variant="h4"
        sx={{ alignSelf: "center", fontWeight: "bold", fontSize: "24px" }}
      >
        Categoría {selectedCategoria?.denominacion}
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

export default memo(Catalogo);
