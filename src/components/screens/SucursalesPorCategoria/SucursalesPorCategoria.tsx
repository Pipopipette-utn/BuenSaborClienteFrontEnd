import { memo, useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { ISucursal } from "../../../types/empresa";
import CardSucursal from "./CardSucursal";
import { useFetch } from "../../../hooks/UseFetch";
import Sidebar from "../../ui/SideBar/Sidebar";
import { ISucursalDTO } from "../../../types/dto";

export const SucursalesPorCategoria = () => {
  const { data: sucursales } = useFetch<ISucursal[]>("/sucursales");
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
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        width: "100%",
        padding: { xs: 2, md: 5 },
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "25%",
          minWidth: isSmallScreen ? "100%" : "15%",
        }}
      >
        <Sidebar />
      </Box>
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
  );
};
export default memo(SucursalesPorCategoria);
