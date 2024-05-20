import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

// Define el estilo del componente Slider
const StyledSlide = styled.div`
  text-align: center;
`;
// Interfaz para definir la estructura de los elementos en el slider
interface SlideItem {
  id: number;
  imagen: string;
  nombre: string;
}

// Props para el componente Slider
interface SliderProps {
  items: SlideItem[];
}

export const SliderGenerico: React.FC<SliderProps> = ({ items }) => {
  // Configuración del slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {items.map((item) => (
        <StyledSlide key={item.id}>
          <img src={item.imagen} alt={item.nombre} />
          <h3>{item.nombre}</h3>
        </StyledSlide>
      ))}
    </Slider>
  );
};
