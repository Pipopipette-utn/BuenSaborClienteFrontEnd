import Switch from "@mui/material/Switch";
import styles from "./ThemeSwitch.module.css";
import { darkTheme } from "../DarkTheme"; //No borrar
import { lightTheme } from "../LightTheme";
import { useThemeToggle } from "../../Utils/ThemeUtil";

export const ThemeSwitch = () => {
  const { currentTheme, toggleTheme } = useThemeToggle();

  const handleChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    toggleTheme();
  };

  return (
    <Switch
      checked={currentTheme === lightTheme}
      onChange={handleChange}
      classes={{
        switchBase:
          currentTheme === lightTheme ? styles.sunSwitch : styles.moonSwitch,
      }}
    />
  );
};
