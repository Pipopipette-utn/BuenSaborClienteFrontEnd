import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";
import { setSelectedCategoria } from "../../../redux/slices/SelectedData";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryButton from "../CategoryButton/CategoryButton";
import { ICategoria } from "../../../types/empresa";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const selectedCategoria = useAppSelector(
    (state: RootState) => state.selectedData.selectedCategoria
  );
  const categoriasSucursal = useAppSelector(
    (state: RootState) => state.selectedData.categoriasSucursal
  );

  const handleCategoriaClick = (categoria: ICategoria | null) => {
    dispatch(setSelectedCategoria(categoria));
    console.log("Hiciste click en : ", categoria);
  };

  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        width: { xs: "90vw", sm: "60vw", md: "30vw", lg: "20vw" }, // Ajustes de ancho responsivos
        margin: { xs: "0 auto", md: "0" }, // Centrado en pantallas pequeñas
        padding: 2,
      }}
    >
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
                {categoria.subCategorias &&
                categoria.subCategorias.length > 0 ? (
                  <List>
                    {categoria.subCategorias.map((subCategoria) => (
                      <CategoryButton
                        key={subCategoria.id}
                        selected={selectedCategoria === subCategoria}
                        label={subCategoria.denominacion}
                        onClick={() =>
                          handleCategoriaClick(subCategoria ?? null)
                        }
                      />
                    ))}
                  </List>
                ) : (
                  <CategoryButton
                    selected={selectedCategoria === categoria}
                    label={categoria.denominacion}
                    onClick={() => handleCategoriaClick(categoria ?? null)}
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
