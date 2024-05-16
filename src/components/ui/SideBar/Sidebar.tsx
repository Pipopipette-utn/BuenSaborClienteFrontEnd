import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CategoryButton from "../CategoryButton/CategoryButton";

const StyledSidebar = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "calc(1.6rem + 56px)", // Añade la altura de navbar a la posición superior
  left: 25, // Posición de origen de sidebar
  width: 250,
  height: "calc(100vh - 1.6rem - 56px - 1.5rem)", // Calcula altura basada en el footer y navbar
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: theme.spacing(1), //mete un espaciado con sistema de mui
  zIndex: 2, //por las dudas, pone los botoncitos y la navbar por encima de todo
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.shape.borderRadius,
  alignItems: "center", // Centra horizontalmente
  justifyContent: "center", // Centra verticalmente
}));

const Sidebar: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <StyledSidebar>
      {categories.map((category) => (
        <CategoryButton key={category.label} label={category.label} />
      ))}
    </StyledSidebar>
  );
};

export default Sidebar;
