import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import { Menu } from "../components/screens/Menu/Menu";
import { Pedido } from "../components/screens/Pedido/Pedido";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";
import { useState } from "react";
import { darkTheme } from "../components/Themes/DarkTheme";
import { lightTheme } from "../components/Themes/LightTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./button.css";
import CustomSwitch from "../components/ui/CustomSwitch/CustomSwitch";
import React from "react";
import Switch from "@mui/material/Switch/Switch";
import styles from "../components/ui/CustomSwitch/CustomSwitch.module.css";

export const AppRouter = () => {
  const [checked, setChecked] = React.useState(false);
  const [currentTheme, setCurrentTheme] = useState(lightTheme); // State to manage the theme

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme); // Toggle between themes
  };

  const handleChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setChecked(event.target.checked);
    toggleTheme();
    currentTheme === lightTheme ? "Dark Mode" : "Light Mode";
  };
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
        <Switch
          checked={checked}
          onChange={handleChange}
          classes={{
            switchBase: checked ? styles.sunSwitch : styles.moonSwitch,
          }}
        />
      </div>
    </ThemeProvider>
  );
};
/*
        <Button
          variant="contained"
          className="floating-button"
          onClick={toggleTheme}
        >
          {currentTheme === lightTheme ? "Dark Mode" : "Light Mode"}
        </Button>

*/
