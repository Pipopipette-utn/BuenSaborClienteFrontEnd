import React from "react";
import { IArticulo } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { useFetch } from "../../../hooks/UseFetch";
import { Grid } from "@mui/material";
import Sidebar from "../../ui/SideBar/Sidebar";
import { Carrito } from "../../ui/Carrito/Carrito";
import { Buscador } from "./Buscador";
import { useEffect, useState } from "react";

export const PantallaMenu: React.FC = () => {
  
  const [totalRows, setTotalRows] = useState(0);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(6);

  const {
    data: articulos,
    loading: loadingArticulos,
    error: errorArticulos,
  } = useFetch<IArticulo[]>("http://localhost:8080/articulosManufacturados");

  const {
    data: categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = useFetch<[]>("http://localhost:8080/categorias");
  console.log("Loading Articulos:", loadingArticulos);
  console.log("Error Articulos:", errorArticulos);
  console.log("Articulos:", articulos);

  console.log("Loading Categorias:", loadingCategorias);
  console.log("Error Categorias:", errorCategorias);
  console.log("Categorias:", categorias);

  // Renderizar "Cargando..." si loading es verdadero
  if (loadingArticulos || loadingCategorias) {
    return <div>Cargando...</div>;
  }

  // Renderizar el mensaje de error si hay un error
  if (errorArticulos || errorCategorias) {
    return <div>Error</div>;
  }

  return (  
    <>
      <Buscador/>
      <Grid container spacing={0}>
        {/* Barra lateral */}

        <Sidebar />

        {/* Mapeo de artículos */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            {articulos?.map((articulo) => (
              <Grid item xs={6}>
                <CardArticulo key={articulo.id} articulo={articulo} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Carrito */}
        <Grid item xs={3}>
          <Carrito />
        </Grid>
      </Grid>
    </>
  );
};
