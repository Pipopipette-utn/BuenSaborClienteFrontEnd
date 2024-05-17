import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./components/Themes/LightTheme";

export const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppRouter />
    </ThemeProvider>
  );
  //////mi primer hola mundo
};
