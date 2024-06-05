import Slider from "react-slick";
import Sidebar from "../../ui/SideBar/Sidebar";
import { useFetch } from "../../../hooks/UseFetch";
import { IEmpresa } from "../../../types/empresa";
import { Carrito } from "../../ui/Carrito/Carrito";

export const Pedido = () => {
  const { data: empresa, loading: loadingEmpresa } = useFetch<IEmpresa>(
    "http://localhost:8080/empresas/3"
  ); //debo pasarle el id desde otro lado
  if (loadingEmpresa) return <h1>Cargando...</h1>;
  return (
    <>
      <h1>{empresa?.nombre}</h1>
      <Carrito />
    </>
  );
};
