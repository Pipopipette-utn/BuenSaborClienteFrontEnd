import React from "react";
import { IArticulo } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { useFetch } from "../../../hooks/UseFetch";
import { Grid } from "@mui/material";
import {Sidebar} from "../../ui/SideBar/Sidebar";
import { Carrito } from "../../ui/Carrito/Carrito";
import { Buscador } from "./Buscador";
import { useEffect, useState } from "react";

export const PantallaMenu: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  const {
    data: articulos,
    loading: loadingArticulos,
    error: errorArticulos,
  } = useFetch<IArticulo[]>("http://localhost:8080/articulosManufacturados");

  const {
    data: categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = useFetch<[]>( "http://localhost:8080/categorias");
  
  // Renderizar "Cargando..." si loading es verdadero
  if (loadingArticulos || loadingCategorias) {
    return <div>Cargando...</div>;
  }

  // Renderizar el mensaje de error si hay un error
  if (errorArticulos || errorCategorias) {
    return <div>Error</div>;
  }

  // Filtrar los artículos por categoría seleccionada
  const articulosFiltrados = articulos?.filter(articulo => 
    (!categoriaSeleccionada || articulo.categoriaId === categoriaSeleccionada) &&
    (articulo.denominacion.toLowerCase().includes(terminoBusqueda.toLowerCase()))
  );

  return (
    <>
      <Buscador onSearch={setTerminoBusqueda} categoriaSeleccionada={categoriaSeleccionada} />
      <Grid container spacing={0}>
        {/* Barra lateral */}
        <Sidebar categorias={categorias} onSelectCategoria={setCategoriaSeleccionada} />

        {/* Mapeo de artículos */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            {articulosFiltrados?.map((articulo) => (
              <Grid item xs={6} key={articulo.id}>
                <CardArticulo articulo={articulo} />
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