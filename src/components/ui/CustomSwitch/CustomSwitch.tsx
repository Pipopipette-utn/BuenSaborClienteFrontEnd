import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import styles from "./CustomSwitch.module.css";
import { darkTheme } from "../../Themes/DarkTheme";
import { lightTheme } from "../../Themes/LightTheme";

export default function CustomSwitch() {
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
    <>
      <Switch
        checked={checked}
        onChange={handleChange}
        classes={{
          switchBase: checked ? styles.sunSwitch : styles.moonSwitch,
        }}
      />
    </>
  );
}
