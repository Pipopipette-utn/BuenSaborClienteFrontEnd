import "bootstrap/dist/css/bootstrap.min.css";
import { AppRouter } from "./routes/AppRouter";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./components/Themes/LightTheme";
import { Provider } from "react-redux";
import store from "./redux/Store";
import "./styles/scrollbar.css";

export const baseUrl = import.meta.env.VITE_API_URL;

export const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ThemeProvider>
  );
};
