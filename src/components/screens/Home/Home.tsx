import React, { useEffect } from "react";
import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";
import { ISucursal, IPromocion } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";
import { LinearProgress, Stack } from "@mui/material";

export const Home: React.FC = () => {
  const {
    data: sucursales,
    loading: loadingSucursal,
    error: errorSucursal,
  } = useFetch<ISucursal[]>("/sucursales");

  if (errorSucursal) return <h1>Error :c</h1>;

  return (
    <>
      <Carrousel />
      <Stack spacing={8} paddingTop={8}>
        {!loadingSucursal && sucursales && sucursales.length > 0 ? (
          <SliderGenerico items={sucursales} />
        ) : (
          <LinearProgress sx={{ width: "100%" }} />
        )}
      </Stack>
    </>
  );
};
