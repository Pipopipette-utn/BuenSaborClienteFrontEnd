import React, { useEffect, Suspense } from "react";
import { LinearProgress, Stack } from "@mui/material";
import { Carrito } from "../../ui/Carrito/Carrito";
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
    const traerCategorias = async () => {
      if (sucursal?.id !== undefined) {
        const sucursalService = new SucursalService("/sucursales");
        const categorias = await sucursalService.getCategorias(sucursal?.id);
        const filteredCategorias = categorias.filter((c) => c.esParaVender);
        dispatch(setCategoriasSucursal(filteredCategorias));
        dispatch(setSelectedCategoria(filteredCategorias[0]));
      }
    };
    traerCategorias();
  }, [sucursal]);

  console.log("Id de sucursal: ", sucursal?.id);
  console.log("Render de menu");
  return (
    <Suspense fallback={<Loader />}>
      <Stack direction="row" width="100vw" spacing={4} sx={{ padding: 5 }}>
        {categoriasSucursal ? (
          <>
            <Sidebar />
            {selectedCategoria && <Catalogo categoria={selectedCategoria} />}
            <Carrito />
          </>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Stack>
    </Suspense>
  );
};

export default PantallaMenu;
