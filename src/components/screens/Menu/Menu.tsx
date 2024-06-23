import React, { useEffect, Suspense, useState } from "react";
import { LinearProgress, Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "../../ui/SideBar/Sidebar";
import Loader from "../../ui/Loader/Loader";
import { RootState } from "../../../redux/Store";
import Catalogo from "./Catalogo";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import {
  setCategoriaDefault,
  setCategoriasSucursal,
  setSelectedCategoria,
} from "../../../redux/slices/SelectedData";
import { SucursalService } from "../../../services/SucursalService";

const PantallaMenu: React.FC = () => {
  const [_isOpen, setIsOpen] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const sucursal = useAppSelector(
    (state: RootState) => state.selectedData.sucursal
  );
  const selectedCategoria = useAppSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const categoriasSucursal = useAppSelector(
    (state: RootState) => state.selectedData.categoriasSucursal
  );

  useEffect(() => {
    const traerCategoriasYHorario = async () => {
      try {
        if (sucursal?.id && categoriasSucursal === null) {
          const sucursalService = new SucursalService("/sucursales");
          const categorias = await sucursalService.getCategorias(sucursal.id);
          const filteredCategorias = categorias.filter((c) => c.esParaVender);
          dispatch(setCategoriasSucursal(filteredCategorias));

          // Establece una categoría default
          if (!selectedCategoria) {
            dispatch(setCategoriaDefault(filteredCategorias[0]));
            dispatch(setSelectedCategoria(filteredCategorias[0]));
          }

          // Obtiene datos de la sucursal
          const sucursalData = await sucursalService.getById(sucursal.id);
          const horarioApertura = sucursalData!.horarioApertura;
          const horarioCierre = sucursalData!.horarioCierre;

          const now = new Date();
          const apertura = new Date();
          const cierre = new Date();
          const [horaApertura, minutoApertura] = horarioApertura
            .split(":")
            .map(Number);
          const [horaCierre, minutoCierre] = horarioCierre
            .split(":")
            .map(Number);

          apertura.setHours(horaApertura, minutoApertura, 0);
          cierre.setHours(horaCierre, minutoCierre, 0);

          setIsOpen(now >= apertura && now <= cierre);
        }
      } catch (error) {
        console.error("Error al traer las categorías o el horario:", error);
      }
    };

    traerCategoriasYHorario();
  }, [sucursal?.id, categoriasSucursal, dispatch, selectedCategoria]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Suspense fallback={<Loader />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          width: "100%",
          padding: { xs: 2, md: 5 },
          gap: 4,
        }}
      >
        {categoriasSucursal ? (
          <>
            <Box
              sx={{
                width: isSmallScreen ? "100%" : "25%",
                minWidth: isSmallScreen ? "100%" : "15%",
              }}
            >
              <Sidebar />
            </Box>
            <Box sx={{ flex: 1 }}>
              {selectedCategoria && <Catalogo />}
              {!selectedCategoria && <LinearProgress />}
            </Box>
          </>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Box>
    </Suspense>
  );
};

export default React.memo(PantallaMenu);
