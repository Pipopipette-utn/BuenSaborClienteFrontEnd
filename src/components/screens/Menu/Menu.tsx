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
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import useFetchArticulos from "../../../hooks/useFetchArticulos";
import useURL from "../../../hooks/useUrlArticulo";

export const PantallaMenu: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const fetchArticulos = useFetchArticulos();
  const selectedCategoriaId = useSelector(
    (state: RootState) => state.categoria.selectedCategoriaId
  );
  const url = useURL(categoriaSeleccionada, terminoBusqueda, page); //url dinamica que filtra
  //Carga los articulos
  useEffect(() => {
    fetchArticulos(url, setArticulos, setTotalPages);
  }, [fetchArticulos, url]);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
