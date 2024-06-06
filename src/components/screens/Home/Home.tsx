import React, { useEffect, useState } from "react";
import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";
import { ICategoria, IEmpresa, IPromocion } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";

export const Home: React.FC = () => {
  //const [categorias, setCategorias] = useState<ICategoria[]>([]);
  //const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  //const [promociones, setPromociones] = useState<IPromocion[]>([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);

  const { data: categorias, loading: loadingCategorias } = useFetch<
    ICategoria[]
  >("/categorias/parents");
  const { data: empresas } = useFetch("/sucursales");
  const { data: promociones } = useFetch("/promociones");

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasData = await getCategorias();
        const empresasData = await getEmpresas();
        const promocionesData = await getPromociones();

        setCategorias(categoriasData);
        setEmpresas(empresasData);
        setPromociones(promocionesData);
      } catch (error) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
*/
  if (loadingCategorias) return <div>Cargando...</div>;
  //if (error) return <div>{error}</div>;

  return (
    <>
      <Carrousel />
      <SliderGenerico items={categorias} />
      <SliderGenerico items={empresas} />
      <SliderGenerico items={promociones} />
    </>
  );
};
