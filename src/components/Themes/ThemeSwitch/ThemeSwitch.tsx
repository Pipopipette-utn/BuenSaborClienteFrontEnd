import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, FormControlLabel } from "@mui/material";
import { RootState } from "../../../redux/Store";
import { toggleTheme } from "../../../redux/slices/ThemeSlice";
import styles from "./ThemeSwitch.module.css";

const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDarkMode}
          onChange={handleThemeChange}
          name="themeSwitch"
          color="default"
          classes={{
            switchBase: isDarkMode ? styles.moonSwitch : styles.sunSwitch,
          }}
        />
      }
      label="Dark Mode"
      className={styles["theme-switch__container"]}
    />
  );
};

export default ThemeSwitch;
