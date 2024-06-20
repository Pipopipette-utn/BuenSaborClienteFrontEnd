import Switch from "@mui/material/Switch";
import styles from "./ThemeSwitch.module.css";
import { darkTheme } from "../DarkTheme";
import { lightTheme } from "../LightTheme";

interface ThemeSwitchProps {
  currentTheme: any;
  toggleTheme: () => void;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  currentTheme,
  toggleTheme,
}) => {
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
