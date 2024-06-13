import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import { PantallaMenu } from "../components/screens/Menu/Menu";
import { Pedido } from "../components/screens/Pedido/Pedido";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./button.css";
//import { ThemeSwitch } from "../components/Themes/ThemeSwitch/ThemeSwitch";
import { useThemeToggle } from "../components/Utils/ThemeUtil";
import { RutaPrivada } from "../controlAcceso/RutaPrivada";
import { Rol } from "../types/enums";
import RolUsuario from "../controlAcceso/RolUsuario";
import { ThemeSwitch } from "../components/Themes/ThemeSwitch/ThemeSwitch";
import { CssBaseline } from "@mui/material";
import { Login } from "../components/screens/Login/Login";

export const AppRouter = () => {
  const { currentTheme, toggleTheme } = useThemeToggle();
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <>
        <ResponsiveAppBar />
        <ThemeSwitch currentTheme={currentTheme} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<PantallaMenu />} />
          <Route element={<RolUsuario rol={Rol.CLIENTE} />}>
            <Route path="/pedido" element={<Pedido />} />
            <Route path="/cuenta" element={<Cuenta />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* 
					<Route element={<Rol rol={Rol.CLIENTE} />}>
					<Route path="/pedido" element= <RutaPrivada>{<Pedido />}<RutaPrivada/>
					</Route>
					</Route>
					<Route element={<Rol rol={Rol.CLIENTE} />}></Route>
					<Route path="/cuenta" element= <RutaPrivada>{<Cuenta />}<RutaPrivada/>
					</Route>

 */}{" "}
        </Routes>
        <Footer />
      </>
    </ThemeProvider>
  );
};
