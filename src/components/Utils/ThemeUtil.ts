import { useState } from "react";
import { darkTheme } from "../Themes/DarkTheme";
import { lightTheme } from "../Themes/LightTheme";

export const useThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === lightTheme ? darkTheme : lightTheme);
  };

  return { currentTheme, toggleTheme };
};
