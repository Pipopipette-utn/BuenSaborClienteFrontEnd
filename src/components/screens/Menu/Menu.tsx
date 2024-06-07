import React, { useState, useEffect, Suspense } from "react";
import { LinearProgress, Stack } from "@mui/material";
import { Carrito } from "../../ui/Carrito/Carrito";
import Sidebar from "../../ui/SideBar/Sidebar";
import Loader from "../../ui/Loader/Loader";
import { RootState } from "../../../redux/Store";
import { Catalogo } from "./Catalogo";
import { ICategoria } from "../../../types/empresa";
import { CategoriaService } from "../../../services/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import {
	setCategoriasSucursal,
	setSelectedCategoriaId,
} from "../../../redux/slices/SelectedData";
import { SucursalService } from "../../../services/SucursalService";

export const PantallaMenu: React.FC = () => {
	const dispatch = useAppDispatch();
	const [selectedCategoria, setSelectedCategoria] = useState<ICategoria | null>(
		null
	);
	const sucursal = useAppSelector(
		(state: RootState) => state.selectedData.sucursal
	);
	const selectedCategoriaId = useAppSelector(
		(state: RootState) => state.selectedData.selectedCategoriaId
	);
	const categoriasSucursal = useAppSelector(
		(state: RootState) => state.selectedData.categoriasSucursal
	);

	useEffect(() => {
		const traerCategorias = async () => {
			const sucursalService = new SucursalService("/sucursales");
			const categorias = await sucursalService.getCategorias(2);
			const filteredCategorias = categorias.filter((c) => c.esParaVender);
			dispatch(setCategoriasSucursal(filteredCategorias));
			dispatch(setSelectedCategoriaId(filteredCategorias[0].id!));
		};
		traerCategorias();
	}, [sucursal]);

	useEffect(() => {
		const traerCategoria = async () => {
			const categoriaService = new CategoriaService("/categorias");
			if (selectedCategoriaId) {
				const categoriaEncontrada = await categoriaService.getById(
					selectedCategoriaId
				);
				if (categoriaEncontrada) setSelectedCategoria(categoriaEncontrada);
			}
		};
		traerCategoria();
	}, [selectedCategoriaId]);

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
