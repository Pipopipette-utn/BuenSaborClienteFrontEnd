import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

const StyledSlide = styled.div`
  text-align: center;
`;
interface SlideItem {
  id: number;
  logo: string;
  imagen: string;
  nombre: string;
  denominacion: string;
}

interface SliderProps {
  items: SlideItem[];
}

export const SliderGenerico: React.FC<SliderProps> = ({ items }) => {
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
          <img src={item.imagen || item.logo} alt={item.nombre} />
          <h3>{item.nombre || item.denominacion}</h3>
        </StyledSlide>
      ))}
    </Slider>
  );
};
