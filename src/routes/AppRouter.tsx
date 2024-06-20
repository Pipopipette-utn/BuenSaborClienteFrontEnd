import { Route, Routes, useLocation } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import PantallaMenu from "../components/screens/Menu/Menu";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./button.css";
import { useThemeToggle } from "../components/Utils/ThemeUtil";
import { RutaPrivada } from "../controlAcceso/RutaPrivada";
import { CssBaseline } from "@mui/material";
import { Login } from "../components/screens/Login/Login";
import { Register } from "../components/screens/Login/Register";

export const AppRouter = () => {
  const { currentTheme } = useThemeToggle();
  const location = useLocation();
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <>
        <ResponsiveAppBar />
        {/*         <ThemeSwitch currentTheme={currentTheme} toggleTheme={toggleTheme} />
         */}
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
