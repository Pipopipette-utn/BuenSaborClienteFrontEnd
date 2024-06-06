import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CategoryButton from "../CategoryButton/CategoryButton";
import { List, Paper } from "@mui/material";
import { ICategoria } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";
import { setSelectedCategoriaId } from "../../../redux/slices/SelectedData";

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

export const Sidebar = () => {
  const { data: categorias } = useFetch<ICategoria[]>("/categorias/parents");
  const selectedCategoriaId = useSelector(
    (state: RootState) => state.categoria.selectedCategoriaId
  );
  const dispatch = useAppDispatch();
  const articulos = useSelector((state: RootState) => state.selectedData.items);

  /*
  const { data: categories } = useFetch<ICategoria[]>(
    `http://localhost:8080/sucursales/1/categorias` //cambiar mas adelante por "http://localhost:8080/sucursales/${id}/categorias" y que switchee
  );
*/

  const handleCategoriaClick = (categoriaId: number | null) => {
    dispatch(setSelectedCategoriaId(categoriaId)); // Despacha la acción para establecer la categoría seleccionada
    console.log("Hiciste click en : ", categoriaId);
  };

  const filteredArticulos = selectedCategoriaId
    ? articulos.filter(
        (articulo) => articulo.categoriaId === selectedCategoriaId
      )
    : articulos;
  return (
    <StyledSidebar>
      <Paper>
        <List>
          <CategoryButton
            key="all"
            label="Todas las categorías"
            onClick={() => handleCategoriaClick(null)}
          />
          {categorias?.map((filteredCategoria) => (
            <CategoryButton
              key={filteredCategoria.denominacion}
              label={filteredCategoria.denominacion}
              onClick={() => handleCategoriaClick(filteredCategoria.id ?? null)}
            />
          ))}
        </List>
      </Paper>
    </StyledSidebar>
  );
};

export default Sidebar;

/*
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface SidebarProps {
  categorias: { id: number; nombre: string }[];
  onSelectCategoria: (categoriaId: number | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categorias, onSelectCategoria }) => {
  return (
    <List>
      <ListItem button onClick={() => onSelectCategoria(null)}>
        <ListItemText primary="Todas las categorías" />
      </ListItem>
      {categorias.map((categoria) => (
        <ListItem button key={categoria.id} onClick={() => onSelectCategoria(categoria.id)}>
          <ListItemText primary={categoria.nombre} />
        </ListItem>
      ))}
    </List>
  );
};
*/
