import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import PantallaMenu from "../components/screens/Menu/Menu";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";
import "./button.css";
import { RutaPrivada } from "../controlAcceso/RutaPrivada";
import { Login } from "../components/screens/Login/Login";
import { Register } from "../components/screens/Login/Register";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { useAppSelector } from "../redux/HookReducer";
import { RootState } from "../redux/Store";

export const AppRouter = () => {
  const theme = useAppSelector((state: RootState) => state.theme.currentTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<PantallaMenu />} />
          <Route
            path="/cuenta"
            element={
              <RutaPrivada>
                <Cuenta />
              </RutaPrivada>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </>
    </ThemeProvider>
  );
};
