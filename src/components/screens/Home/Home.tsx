import React, { useEffect, useState } from "react";
import Carrousel from "../../ui/Carrousel/Carrousel";
import { SliderGenerico } from "../../ui/ItemSlider/ItemSlider";
import { ICategoria, IEmpresa, IPromocion } from "../../../types/empresa";
import { useFetch } from "../../../hooks/UseFetch";

export const Home: React.FC = () => {
  //const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [empresas, setEmpresas] = useState<IEmpresa[]>([]);
  const [promociones, setPromociones] = useState<IPromocion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //const[categorias] = useFetch("")
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
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Carrousel />
      <SliderGenerico items={categorias} />
      <SliderGenerico items={empresas} />
      <SliderGenerico items={promociones} />
    </>
  );
};
