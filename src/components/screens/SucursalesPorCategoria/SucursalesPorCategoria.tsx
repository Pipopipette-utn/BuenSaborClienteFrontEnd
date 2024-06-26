import { memo, useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  LinearProgress,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { ICategoria, ISucursal } from "../../../types/empresa";
import CardSucursal from "./CardSucursal";
import { useFetch } from "../../../hooks/UseFetch";
import { ISucursalDTO } from "../../../types/dto";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";

export const SucursalesPorCategoria = () => {
  const { data: sucursales } = useFetch<ISucursal[]>("/sucursales");
  const { data: categorias, loading: loadingCategoria } =
    useFetch<ICategoria[]>("/categorias");
  const selectedCategoria = useSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [filteredSucursales, setFilteredSucursales] = useState<ISucursal[]>([]);

  useEffect(() => {
    if (selectedCategoria && selectedCategoria.sucursales && sucursales) {
      const filtered = sucursales.filter((sucursal: ISucursal) =>
        selectedCategoria.sucursales?.some(
          (categoriaSucursal: ISucursalDTO) =>
            categoriaSucursal.id === sucursal.id
        )
      );
      setFilteredSucursales(filtered);
    }
  }, [selectedCategoria, sucursales]);

  if (!selectedCategoria) {
    return <Typography variant="h5">Seleccione una categoría.</Typography>;
  }

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        padding: 2,
        gap: 2,
        alignItems: "center",
        marginBottom: "20vh",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "90%",
          borderBottom: 2,
          borderColor: "red",
          paddingBottom: 4,
          marginBottom: 2,
          margin: "0 auto",
        }}
      >
        <Typography variant="h6">Categorías</Typography>
        {!loadingCategoria && categorias && categorias.length > 0 ? (
          <SliderGenerico items={categorias} />
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          width: "90%",
          padding: { xs: 2, md: 5 },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {filteredSucursales.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredSucursales.map((sucursal) => (
                <CardSucursal key={sucursal.id} sucursal={sucursal} />
              ))}
            </Box>
          ) : (
            <Typography variant="h5">
              No hay sucursales disponibles para esta categoría.
            </Typography>
          )}
        </Box>
      </Box>
    </Stack>
  );
};
export default memo(SucursalesPorCategoria);
