import {
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
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
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

export const Catalogo = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[] | null>(null);
  const [order, setOrder] = useState<string>("asc");

  const fetchArticulos = useFetchArticulos();

  const selectedCategoria = useAppSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const selectedSucursal = useAppSelector(
    (state: RootState) => state.selectedData.sucursal
  );
  const selectedSucursalId = selectedSucursal?.id;

  const handlePageChange = useCallback(
    (_event: ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  const handleOrderChange = (event: SelectChangeEvent<string>) => {
    setOrder(event.target.value);
  };

  const url = useMemo(() => {
    return generarURL(
      selectedCategoria,
      selectedSucursalId!,
      terminoBusqueda,
      page
    );
  }, [selectedCategoria, selectedSucursalId, terminoBusqueda, page]);

  useEffect(() => {
    if (selectedCategoria && selectedSucursalId) {
      setArticulos(null);
      console.log("url generada: ", url);
      fetchArticulos(url, setArticulos, setTotalPages);
    }
  }, [url, fetchArticulos]);

  useEffect(() => {
    if (articulos) {
      const sortedArticulos = [...articulos].sort((a, b) => {
        if (order === "asc") {
          return a.precioVenta - b.precioVenta;
        } else {
          return b.precioVenta - a.precioVenta;
        }
      });
      setArticulos(sortedArticulos);
    }
  }, [order, articulos]);

  const handleSearch = (term: string) => {
    setTerminoBusqueda(term.toLowerCase());
    setPage(1); // Resetear página a 1 cuando se realiza una nueva búsqueda
  };

  return (
    <Container maxWidth="lg">
      <Stack direction="column" width="100%" spacing={4}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Buscador onSearch={handleSearch} palabra={terminoBusqueda} />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="order-label">Ordenar por</InputLabel>
            <Select
              labelId="order-label"
              value={order}
              label="Ordenar por"
              onChange={handleOrderChange}
            >
              <MenuItem value="asc">Menor a Mayor precio</MenuItem>
              <MenuItem value="desc">Mayor a Menor precio</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography
          variant="h4"
          sx={{
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: "24px",
            textAlign: "center",
          }}
        >
          Categoría {selectedCategoria!.denominacion}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {articulos ? (
            articulos.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Ups! No hay ningún producto en esta categoría.
              </Typography>
            ) : (
              articulos.map((articulo) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={articulo.id}>
                  <CardArticulo articulo={articulo} />
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
    </Container>
  );
};

export default memo(Catalogo);
