import React, { ChangeEvent, Suspense } from "react";
import { IArticulo } from "../../../types/empresa";
import { CardArticulo } from "../../ui/CardArticulo/CardArticulo";
import { Grid, Pagination, Stack } from "@mui/material";
import { Carrito } from "../../ui/Carrito/Carrito";
import { Buscador } from "./Buscador";
import { useEffect, useState } from "react";
import Sidebar from "../../ui/SideBar/Sidebar";
import Loader from "../../ui/Loader/Loader";
import { RootState } from "../../../redux/Store";
import { useSelector } from "react-redux";
import useFetchArticulos from "../../../hooks/useFetchArticulos";
import useURL from "../../../hooks/useUrlArticulo";
import { useFetch } from "../../../hooks/UseFetch";
import useFetchArticulosInsumo from "../../../hooks/useFetchInsumo";

export const PantallaMenu: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | null
  >(null);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>("");
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const [articulosInsumos, setArticulosInsumos] = useState<IArticulo[]>([]);

  //  const { data: articulosInsumo } = useFetch<IArticulo[]>(  "/articulosInsumos/paged/insumosDirectos");
  //const articulosInsumo = useFetchArticulosInsumo();
  const fetchArticulos = useFetchArticulos();
  const fetchArticulosInsumo = useFetchArticulosInsumo();
  const selectedCategoriaId = useSelector(
    (state: RootState) => state.selectedData.selectedCategoriaId
  );

  const urlInsumos = useURL(
    selectedCategoriaId,
    terminoBusqueda,
    page,
    "insumosDirectos"
  );
  const urlManufacturados = useURL(
    selectedCategoriaId,
    terminoBusqueda,
    page,
    "manufacturados"
  );
  // Carga los artículos manufacturados
  useEffect(() => {
    fetchArticulos(urlManufacturados, setArticulos, setTotalPages);
  }, [fetchArticulos, urlManufacturados]);

  // Carga los artículos de insumos directos
  useEffect(() => {
    fetchArticulosInsumo(urlInsumos).then((data) => {
      if (data) {
        // Actualizar el estado de los artículos de insumo
        setArticulosInsumos(data.content);
        setTotalPages(data.totalPages);
      }
    });
  }, [urlInsumos]);

  const allArticulos = [...articulos, ...articulosInsumos];

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
              {allArticulos?.map((articulo) => {
                console.log(articulo.denominacion);
                return (
                  <Grid item xs={6} key={articulo.id}>
                    <CardArticulo articulo={articulo} />
                  </Grid>
                );
              })}
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
