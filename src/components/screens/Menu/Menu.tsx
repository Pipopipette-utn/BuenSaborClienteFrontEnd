import React, { useEffect, useState, Suspense } from "react";
import { LinearProgress, Stack, Typography } from "@mui/material";
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
import { setLocalidades } from "../../../redux/slices/Location";

export const PantallaMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
  }, [sucursal, dispatch]);

  console.log("Render de menu");
  return (
    <Suspense fallback={<Loader />}>
      <Stack direction="row" width="100vw" spacing={4} sx={{ padding: 5 }}>
        {categoriasSucursal ? (
          <>
            <Sidebar />
            {selectedCategoria && <Catalogo categoria={selectedCategoria} />}
            {isOpen ? (
              <Carrito />
            ) : (
              <Typography variant="h6" color="error">
                Pedidos no disponibles en este horario.
              </Typography>
            )}
          </>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Stack>
    </Suspense>
  );
};

export default PantallaMenu;
