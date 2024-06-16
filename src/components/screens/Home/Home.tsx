import React, { useEffect } from "react";
import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";
import { ISucursal } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";
import { LinearProgress, Stack } from "@mui/material";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setSucursal } from "../../../redux/slices/SelectedData";

export const Home: React.FC = () => {
  const {
    data: sucursales,
    loading: loadingSucursal,
    error: errorSucursal,
  } = useFetch<ISucursal[]>("/sucursales");
  const dispatch = useAppDispatch();

  if (errorSucursal) return <h1>Error :c</h1>;

  useEffect(() => {
    if (sucursales) {
      const randomSucursal =
        sucursales[Math.floor(Math.random() * sucursales.length)];
      dispatch(setSucursal(randomSucursal));
      console.log("sucursal obtenida: ", randomSucursal);
    }
  }, [sucursales, dispatch]);

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
