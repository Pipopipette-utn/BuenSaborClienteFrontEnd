import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF4F33",
    },
    secondary: {
      main: "#f50057",
    },
    warning: {
      main: "#5a0000",
    },
    error: {
      main: "#ff0000",
    },
    success: {
      main: "#529654",
    },
    background: {
      default: "#1a1a1a",
    },
  },
  typography: {
    fontFamily: "Nunito Sans",
    fontSize: 14,
    fontWeightMedium: 500,
    body1: {
      fontFamily: "Open Sans",
    },
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
