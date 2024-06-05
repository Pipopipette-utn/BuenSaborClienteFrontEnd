import { Route, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";
import { Box } from "@mui/material";

export const ProtectedRoutes = () => {
  return (
    <>
      <AppMenu />
      <Box
        className="ContentContainer"
        alignItems="center"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        minHeight="100%"
        sx={{ mt: { mobile: 8, xs: 7, sm: 8 } }}
      >
        {/*
				<Routes>
					<Route path="/" element={<ListaEmpresas />} />
					<Route path="/empresas" element={<ListaEmpresas />} />
					<Route path="/empresas/sucursales" element={<ListaSucursales />} />
					<Route path="/inicio" element={<Home />} />
					<Route path="/sucursales" element={<Sucursales />} />
					<Route path="/categorias" element={<Categorias />} />
					<Route path="/articulos" element={<SelectArticulo />} />
					<Route path="/articulos/insumos" element={<ArticulosInsumos />} />
					<Route
						path="/articulos/manufacturados"
						element={<ArticulosManufacturados />}
					/>
					<Route path="/unidades-de-medida" element={<UnidadesMedida />} />
				</Routes>
	*/}
      </Box>
    </>
  );
};
