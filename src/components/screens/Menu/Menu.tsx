import { MenuCategoria } from "../../ui/MenuCategorias/MenuCategorias";
import React, { useEffect, useState } from 'react';
import { IArticulo } from '../../../types/empresa';
import { CardArticulo } from './CardArticulo';
import supabase from "../../../services/SupabaseClient";


export const Menu: React.FC = () => {
  const [articulos, setArticulos] = useState<IArticulo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticulos = async () => {
      const { data, error } = await supabase
        .from<IArticulo>('articulos')
        .select('*');

      if (error) {
        console.error('Error fetching articles:', error);
      } else {
        setArticulos(data || []);
      }
      setLoading(false);
    };

    fetchArticulos();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
        <MenuCategoria categorias={[]} />
      {articulos.map((articulo) => (
        <CardArticulo key={articulo.id} articulo={articulo} />
      ))}
    </div>
  );
};