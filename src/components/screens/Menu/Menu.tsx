import React, { ChangeEvent, Suspense } from "react";
import { IArticulo, ICategoria } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { useFetch } from "../../../hooks/UseFetch";
import { Grid, Pagination, Stack } from "@mui/material";
//import { Sidebar } from "../../ui/SideBar/Sidebar";
import { Carrito } from "../../ui/Carrito/Carrito";
import { Buscador } from "./Buscador";
import { useEffect, useState } from "react";
import Sidebar from "../../ui/SideBar/Sidebar";
import Loader from "../../ui/Loader/Loader";

export const PantallaMenu: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[]>([]);

  const { data: categorias, error: errorCategorias } = useFetch<ICategoria[]>(
    "http://localhost:8080/categorias/parents"
  );

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/articulosManufacturados/filtrar/${1}?` +
            new URLSearchParams({
              //categoriaId: categoriaSeleccionada?.toString(), //Esto hace que explote por el parseo a string
              nombre: terminoBusqueda,
              page: (page - 1).toString(),
              size: "6",
            })
        );

        if (!response.ok) {
          throw new Error(
            "Error de conexion con /articulosManufacturados/filtrar/"
          );
        }

        const data = await response.json();
        setArticulos(data.content); // Esto actualiza la lista de articulos
        setTotalPages(data.totalPages); // Esto actualiza el num total de paginas
      } catch (error) {
        console.error("Error trayendo articulos:", error);
      }
    };

    fetchArticulos();
  }, [categoriaSeleccionada, terminoBusqueda, page]);

  // Filtrar los artículos por categoría seleccionada
  /*
  const articulosFiltrados = articulos?.filter(
    (articulo) =>
      (!categoriaSeleccionada ||
        articulo.categoriaId === categoriaSeleccionada) &&
      articulo.denominacion
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase())
  );
*/
  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Renderizar el mensaje de error si hay un error
  if (errorCategorias) {
    return <div>Error</div>;
  }
  return (
    <>
      {/* Renderiza el loader hasta que carguen todos los componentes */}
      <Suspense fallback={<Loader />}>
        <Buscador
          onSearch={setTerminoBusqueda}
          categoriaSeleccionada={categoriaSeleccionada}
        />
        <Grid container spacing={0}>
          {/* Barra lateral */}
          <Sidebar />

          {/* Mapeo de artículos */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              {articulos?.map((articulo) => (
                <Grid item xs={6} key={articulo.id}>
                  <CardArticulo articulo={articulo} />
                </Grid>
              ))}
            </Grid>

            <Stack direction="row" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </Grid>

          {/* Carrito */}
          <Grid item xs>
            <Carrito />
          </Grid>
        </Grid>
      </Suspense>
    </>
  );
};
