import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CategoryButton from "../CategoryButton/CategoryButton";
import { List, Paper, Typography } from "@mui/material";
import { ICategoria } from "../../../types/empresa";
import { useFetch } from "../../hooks/UseFetch";

const StyledSidebar = styled(Box)(({ theme }) => ({
  position: "relative",
  top: "calc(1.6rem + 56px)", // Añade la altura de navbar a la posición superior
  //left: 25, // Posición de origen de sidebar
  margin: "5%",
  width: "25%",
  minHeight: "90vh",
  backgroundColor: "transparent",
  border: "1px solid black",
  boxShadow: "none",
  padding: theme.spacing(1), //mete un espaciado interior con sistema de mui
  display: "absolute",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
  alignItems: "center", // Centra horizontalmente
  justifyContent: "center", // Centra verticalmente
}));

const Sidebar: React.FC<{ categories: ICategoria[] }> = ({ categories }) => {
  //const Sidebar = () => {   //reemplazar por este cuando conecte a una db
  //const { data: categories, loading, error } = useFetch<ICategoria[]>("");
  return (
    <StyledSidebar>
      <Paper>
        <List>
          {categories.map((categoria) => (
            <CategoryButton
              key={categoria.denominacion}
              label={categoria.denominacion}
            />
          ))}
        </List>
      </Paper>
    </StyledSidebar>
  );
};

export default Sidebar;
