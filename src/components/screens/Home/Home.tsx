import React, { useEffect, useState } from "react";
import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";
import { IEmpresa, IPromocion, ISucursal } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";
import { Stack } from "@mui/material";

export const Home: React.FC = () => {
  const {
    data: sucursales,
    loading: loadingSucursal,
    error: errorSucursal,
  } = useFetch<ISucursal[]>("/sucursales");
  const {
    data: promociones,
    loading: loadingPromo,
    error: errorPromo,
  } = useFetch<IPromocion[]>("/promociones");

  if (errorSucursal || errorPromo) return <h1>Error :c</h1>;

  return (
    <>
      <Carrousel />
      <Stack spacing={8} paddingTop={8}>
        {!loadingSucursal && <SliderGenerico items={sucursales} />}
        {!loadingPromo && <SliderGenerico items={promociones} />}
      </Stack>
    </>
  );
};
