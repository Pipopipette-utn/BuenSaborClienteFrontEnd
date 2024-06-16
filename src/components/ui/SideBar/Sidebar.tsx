import React from "react";
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
  Drawer,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryButton from "../CategoryButton/CategoryButton";
import { ICategoria } from "../../../types/empresa";
import MenuIcon from "@mui/icons-material/Menu";

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

  // Estado para controlar la apertura y cierre del sidebar
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2, display: { sm: 'none' } }} // Ocultar en pantallas grandes
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{ display: { xs: 'block', sm: 'none' } }} // Mostrar en pantallas pequeñas
      >
        <Stack
          sx={{
            width: 240,
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
      </Drawer>
      {/* Contenido principal del sidebar para pantallas grandes */}
      <Stack
        alignItems="center"
        spacing={2}
        sx={{
          display: { xs: 'none', sm: 'block' }, // Ocultar en pantallas pequeñas
          width: { sm: "25vw", md: "20vw", lg: "15vw" }, // Ancho responsivo
          marginY: 2,
          padding: 2,
          borderRight: "1px solid #ccc", // Borde a la derecha para simular un sidebar
          minHeight: "100vh", // Altura mínima para cubrir toda la pantalla
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
    </>
  );
};

export default Sidebar;
