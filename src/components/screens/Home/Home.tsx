import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";

export const Home = () => {
  return (
    <div>
      <h1>Hola</h1>
      <Carrousel />
      <SliderGenerico /> pasarle categorias
      <SliderGenerico /> pasarle empresas
      <SliderGenerico /> pasarle promociones
    </div>
  );
};
