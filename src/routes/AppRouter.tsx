import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ui/AppBar/ResponsiveAppBar";
import { Home } from "../components/screens/Home/Home";
import { Menu } from "../components/screens/Menu/Menu";
import { Pedido } from "../components/screens/Pedido/Pedido";
import { Cuenta } from "../components/screens/Cuenta/Cuenta";
import Footer from "../components/ui/Footer/Footer";

export const AppRouter = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/pedido" element={<Pedido />} />
        <Route path="/cuenta" element={<Cuenta />} />
        {
          //        <Route path="/categorias/:category" element={<Categorias />} />
        }
      </Routes>
      <Footer />
    </div>
  );
};
