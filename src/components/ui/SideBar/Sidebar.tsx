import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CategoryButton from "../CategoryButton/CategoryButton";
import { List, Paper, Typography } from "@mui/material";
import { ICategoria } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";

const StyledSidebar = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "calc(1.6rem + 56px)", // Añade la altura de navbar a la posición superior
  //left: 25, // Posición de origen de sidebar
  margin: "0 5% 70% 0", // Establece el margen izquierdo en 0
  width: "15%",
  minHeight: "90vh",
  backgroundColor: "transparent",
  border: "1px solid black",
  boxShadow: "none",
  padding: theme.spacing(1), //mete un espaciado interior con sistema de mui
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
  alignItems: "center", // Centra horizontalmente
  justifyContent: "flex-start", //  con center + absolute en display el boton ocupa todo el ancho
}));

const Sidebar = () => {
  const { data: categories } = useFetch<ICategoria[]>(
    `http://localhost:8080/sucursales/1/categorias` //cambiar mas adelante por "http://localhost:8080/sucursales/${id}/categorias" y que switchee
  );

  return (
    <StyledSidebar>
      <Paper>
        <List>
          {categories
            ?.filter(
              (categoria) => categoria.categoriaPadreId == null || undefined
            )
            .map((filteredCategoria) => (
              <CategoryButton
                key={filteredCategoria.denominacion}
                label={filteredCategoria.denominacion}
              />
            ))}
        </List>
      </Paper>
    </StyledSidebar>
  );
};

export default Sidebar;
