import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import { PantallaMenu } from "../components/screens/Menu/Menu";
import { Pedido } from "../components/screens/Pedido/Pedido";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import "./button.css";
//import { ThemeSwitch } from "../components/Themes/ThemeSwitch/ThemeSwitch";
import { useThemeToggle } from "../components/Utils/ThemeUtil";
import { RutaPrivada } from "../controlAcceso/RutaPrivada";
import { Rol } from "../types/enums";

export const AppRouter = () => {
	const { currentTheme, toggleTheme } = useThemeToggle();
	return (
		<ThemeProvider theme={currentTheme}>
			<>
				<ResponsiveAppBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/menu" element={<PantallaMenu />} />
					<Route element={<Rol rol={Rol.USUARIO} />}></Route>
					<Route path="/pedido" element= <RutaPrivada>{<Pedido />}<RutaPrivada/>/>
					</Route>
					<Route element={<Rol rol={Rol.USUARIO} />}></Route>
					<Route path="/cuenta" element= <RutaPrivada>{<Cuenta />}<RutaPrivada/>/>
					</Route>
					{
						//        <Route path="/categorias/:category" element={<Categorias />} />
					}
				</Routes>
				<Footer />
				{/*
        <ThemeSwitch currentTheme={currentTheme} toggleTheme={toggleTheme} /> */}
			</>
		</ThemeProvider>
	);
};
//import styles from "../components/Themes/ThemeSwitch/ThemeSwitch.module.css";
