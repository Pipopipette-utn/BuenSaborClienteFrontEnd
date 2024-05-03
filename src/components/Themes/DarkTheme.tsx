import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#F9993A",
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
  },
});
