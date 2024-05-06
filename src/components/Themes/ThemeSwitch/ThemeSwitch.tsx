import Switch from "@mui/material/Switch";
import styles from "./ThemeSwitch.module.css";
import { darkTheme } from "../DarkTheme"; //No borrar
import { lightTheme } from "../LightTheme";

export const ThemeSwitch = ({ currentTheme, toggleTheme }) => {
  return (
    <Switch
      checked={currentTheme === darkTheme}
      onChange={toggleTheme}
      classes={{
        switchBase:
          currentTheme === lightTheme ? styles.sunSwitch : styles.moonSwitch,
      }}
    />
  );
};
