import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { ICategoria, IEmpresa, IPromocion } from "../../../types/empresa";

const StyledSlide = styled.div`
  text-align: center;
  img {
    width: 100%; /* Establece el ancho al 100% del contenedor */
    height: 200px; /* Establece la altura deseada para las imágenes */
    object-fit: cover; /* Escala las imágenes manteniendo la relación de aspecto y recortando si es necesario */
  }
`;
interface SlideItem {
  id: number;
  logo?: string | undefined;
  imagen?: string | undefined;
  nombre?: string | undefined;
}

interface SliderProps {
  items: ICategoria[] | IEmpresa[] | IPromocion[] | null;
}

const transformToSlideItems = (
  data: ICategoria[] | IEmpresa[] | IPromocion[]
): SlideItem[] => {
  return data.map((item) => ({
    id: item.id || 0,
    logo: (item as IEmpresa).logo || undefined,
    imagen: (item as IPromocion).imagenes?.[0]?.url || undefined,
    nombre:
      (item as ICategoria).denominacion ||
      (item as IEmpresa).nombre ||
      (item as IPromocion).denominacion ||
      "",
  }));
};

export const SliderGenerico: React.FC<SliderProps> = ({ items }) => {
  if (!items) return null; // Salir si items es null
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const slideItems = transformToSlideItems(items);
  return (
    <Slider {...settings}>
      {slideItems.map((item) => (
        <StyledSlide key={item.id}>
          <img src={item.imagen || item.logo} alt={item.nombre} />
          <h3>{item.nombre}</h3>
        </StyledSlide>
      ))}
    </Slider>
  );
};
