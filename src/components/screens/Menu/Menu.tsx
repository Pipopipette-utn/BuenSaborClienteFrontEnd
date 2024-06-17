import React, { useEffect, Suspense } from "react";
import { LinearProgress, Box } from "@mui/material";
import Sidebar from "../../ui/SideBar/Sidebar";
import Loader from "../../ui/Loader/Loader";
import { RootState } from "../../../redux/Store";
import { Catalogo } from "./Catalogo";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import {
  setCategoriasSucursal,
  setSelectedCategoria,
} from "../../../redux/slices/SelectedData";
import { SucursalService } from "../../../services/SucursalService";

export const PantallaMenu: React.FC = () => {
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
        if (sucursal?.id) {
          const sucursalService = new SucursalService("/sucursales");

          // Obtiene categorías de la sucursal
          const categorias = await sucursalService.getCategorias(sucursal.id);
          const filteredCategorias = categorias.filter((c) => c.esParaVender);
          dispatch(setCategoriasSucursal(filteredCategorias));
          dispatch(setSelectedCategoria(filteredCategorias[0]));

        }
      } catch (error) {
        console.error("Error al traer las categorías o el horario:", error);
      }
    };

    traerCategoriasYHorario();
  }, [sucursal, dispatch]);

  console.log("Render de menu");
  return (
    <Suspense fallback={<Loader />}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100vw',
          padding: { xs: 2, md: 5 },
          gap: 4,
        }}
      >
        {categoriasSucursal ? (
          <>
            <Box
              sx={{
                width: { xs: '100%', md: '25%' },
                minWidth: { xs: '100%', md: '25%' },
              }}
            >
              <Sidebar />
            </Box>
            <Box sx={{ flex: 1 }}>
              {selectedCategoria && <Catalogo />}
            </Box>
          </>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Box>
    </Suspense>
  );
};

export default PantallaMenu;
