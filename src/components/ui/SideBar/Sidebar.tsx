import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";
import { setSelectedCategoriaId } from "../../../redux/slices/SelectedData";
import { Accordion, AccordionDetails, AccordionSummary, List, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryButton from "../CategoryButton/CategoryButton";

const Sidebar = () => {
	const dispatch = useAppDispatch();

	const selectedCategoriaId = useAppSelector(
		(state: RootState) => state.selectedData.selectedCategoriaId
	);
	const categoriasSucursal = useAppSelector(
		(state: RootState) => state.selectedData.categoriasSucursal
	);

	const handleCategoriaClick = (categoriaId: number | null) => {
		dispatch(setSelectedCategoriaId(categoriaId));
		console.log("Hiciste click en : ", categoriaId);
	};

	return (
		<Stack alignItems="center" spacing={2} sx={{ width: "15vw"}}>
			<Typography variant="h5" sx={{ fontSize: "18px", fontWeight: "bold" }}>
				Categorías
			</Typography>
			<List sx={{ width: "100%" }}>
				{categoriasSucursal &&
					categoriasSucursal.map((categoria) => (
						<Accordion key={categoria.id} disableGutters>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography sx={{ fontFamily: "Roboto, sans-serif" }}>
									{categoria.denominacion}
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{categoria.subCategorias && categoria.subCategorias.length > 0 ? (
									<List>
										{categoria.subCategorias.map((subCategoria) => (
											<CategoryButton
												key={subCategoria.id}
												selected={selectedCategoriaId === subCategoria.id}
												label={subCategoria.denominacion}
												onClick={() => handleCategoriaClick(subCategoria.id ?? null)}
											/>
										))}
									</List>
								) : (
									<CategoryButton
										selected={selectedCategoriaId === categoria.id}
										label={categoria.denominacion}
										onClick={() => handleCategoriaClick(categoria.id ?? null)}
									/>
								)}
							</AccordionDetails>
						</Accordion>
					))}
			</List>
		</Stack>
	);
};

export default Sidebar;
