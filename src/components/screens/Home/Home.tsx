import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";

export const Home = () => {
  //HARDCODEOOO
  const categorias = [
    { id: 1, nombre: "Electrónica", imagen: "ruta-a-imagen1.jpg", precio: 34 },
    { id: 2, nombre: "Moda", imagen: "ruta-a-imagen2.jpg", precio: 320 },
  ];

  const empresas = [
    {
      id: 101,
      nombre: "Empresa A",
      imagen: "ruta-a-imagen-empresa1.jpg",
      precio: 420,
    },
    {
      id: 102,
      nombre: "Empresa B",
      imagen: "ruta-a-imagen-empresa2.jpg",
      precio: 44,
    },
  ];

  const promociones = [
    {
      id: 201,
      nombre: "Promo 1",
      imagen: "ruta-a-imagen-promo1.jpg",
      precio: 0.1,
    },
    {
      id: 202,
      nombre: "Promo 2",
      imagen: "ruta-a-imagen-promo2.jpg",
      precio: 99,
    },
  ];
  //FIN HARDCODEO
  return (
    <>
      <h1>Hola</h1>
      <Carrousel />
      {/* Pasar los datos a SliderGenerico */}
      <SliderGenerico items={categorias} />
      <SliderGenerico items={empresas} />
      <SliderGenerico items={promociones} />
    </>
  );
};
