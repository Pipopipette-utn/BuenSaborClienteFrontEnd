import { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../ui/SideBar/Sidebar";
import Catalogo from "../Menu/Catalogo";
import { RootState } from "../../../redux/Store";
import { ISucursal } from "../../../types/empresa";

export const SucursalesPorCategoria = () => {
  const dispatch = useDispatch();
  const sucursales = useSelector(
    (state: RootState) => state.selectedData.sucursalesEmpresa
  );
  const selectedCategoria = useSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [filteredSucursales, setFilteredSucursales] = useState<ISucursal[]>([]);

  useEffect(() => {
    if (selectedCategoria && sucursales) {
      const filtered = sucursales.filter((sucursal: ISucursal) =>
        sucursal.categorias?.some(
          (categoria) => categoria.id === selectedCategoria.id
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
        {/*         <Sidebar />
         */}{" "}
      </Box>
      <Box sx={{ flex: 1 }}>
        {filteredSucursales.length > 0 ? (
          <Catalogo sucursales={filteredSucursales} />
        ) : (
          <Typography variant="h5">
            No hay sucursales disponibles para esta categoría.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
