import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF4F33", // Rubi Orange
    },
    secondary: {
      main: "#f50057", // Pink
    },
    warning: {
      main: "#5a0000", // Dark red
    },
    error: {
      main: "#ff0000", // Red
    },
    success: {
      main: "#529654", // Green
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 16,
    fontWeightMedium: 500,
    caption: {
      fontWeight: 400,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.9rem",
    },
  },
});
