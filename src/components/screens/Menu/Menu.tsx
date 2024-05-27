import { MenuCategoria } from "../../ui/MenuCategorias/MenuCategorias";
import React, { useEffect, useState } from "react";
import { IArticulo } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { useFetch } from "../../../hooks/UseFetch";
import { Alert } from "@mui/material";

export const PantallaMenu: React.FC = () => {
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
      {/**<MenuCategoria categorias={[]} /> //Esta comentado porque no asbemos que uso darle */}
      {/*
      <Grid>  
      <SideBar/> 
      aca van articulos
      <Carrito/>
      </Grid>
      */}
      {articulos?.map((articulo) => (
        <CardArticulo key={articulo.id} articulo={articulo} />
      ))}
    </>
  );
};
