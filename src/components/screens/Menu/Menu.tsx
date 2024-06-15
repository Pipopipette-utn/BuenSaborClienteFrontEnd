import React, { useEffect, useState, Suspense } from "react";
import { LinearProgress, Stack } from "@mui/material";
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
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    const traerCategoriasYHorario = async () => {
      if (sucursal?.id !== undefined) {
        const sucursalService = new SucursalService("/sucursales");
        const categorias = await sucursalService.getCategorias(sucursal?.id);
        const filteredCategorias = categorias.filter((c) => c.esParaVender);
        dispatch(setCategoriasSucursal(filteredCategorias));
        dispatch(setSelectedCategoria(filteredCategorias[0]));

        const sucursalData = await sucursalService.getById(sucursal?.id);
        const horarioApertura = sucursalData!.horarioApertura;
        const horarioCierre = sucursalData!.horarioCierre;

        const now = new Date();
        const apertura = new Date();
        const cierre = new Date();
        const [horaApertura, minutoApertura] = horarioApertura
          .split(":")
          .map(Number);
        const [horaCierre, minutoCierre] = horarioCierre.split(":").map(Number);

        apertura.setHours(horaApertura, minutoApertura, 0);
        cierre.setHours(horaCierre, minutoCierre, 0);

        setIsOpen(now >= apertura && now <= cierre);
      }
    };

    traerCategoriasYHorario();
  }, [sucursal, dispatch]);

  console.log("Id de sucursal: ", sucursal?.id);
  console.log("Render de menu");
  console.log("Categoria: ", selectedCategoria);
  return (
    <Suspense fallback={<Loader />}>
      <Stack direction="row" width="100vw" spacing={4} sx={{ padding: 5 }}>
        {categoriasSucursal ? (
          <>
            <Sidebar />
            {selectedCategoria && <Catalogo categoria={selectedCategoria} />}
          </>
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Stack>
    </Suspense>
  );
};

export default PantallaMenu;
