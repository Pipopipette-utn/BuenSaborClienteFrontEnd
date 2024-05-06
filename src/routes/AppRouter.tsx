import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import { Menu } from "../components/screens/Menu/Menu";
import { Pedido } from "../components/screens/Pedido/Pedido";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./button.css";
import { ThemeSwitch } from "../components/Themes/ThemeSwitch/ThemeSwitch";
import { useThemeToggle } from "../components/Utils/ThemeUtil";

export const AppRouter = () => {
  const { currentTheme, toggleTheme } = useThemeToggle();
  return (
    <ThemeProvider theme={currentTheme}>
      <div>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/cuenta" element={<Cuenta />} />
          {
            //        <Route path="/categorias/:category" element={<Categorias />} />
          }
        </Routes>
        <Footer />
        <ThemeSwitch currentTheme={currentTheme} toggleTheme={toggleTheme} />
      </div>
    </ThemeProvider>
  );
};
//import styles from "../components/Themes/ThemeSwitch/ThemeSwitch.module.css";
