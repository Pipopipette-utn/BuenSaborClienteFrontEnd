import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Define el estilo del componente Slider
const useStyles = makeStyles({
  slide: {
    textAlign: 'center',
  },
});

// Interfaz para definir la estructura de los elementos en el slider
interface SlideItem {
  id: number;
  imagen: string;
  nombre: string;
  precio: number;
}

// Props para el componente Slider
interface SliderProps {
  items: SlideItem[];
}

export const SliderGenerico: React.FC<SliderProps> = ({ items }) => {
  const classes = useStyles();

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
      {items.map(item => (
        <div key={item.id} className={classes.slide}>
          <img src={item.imagen} alt={item.nombre} />
          <h3>{item.nombre}</h3>
          <p>Precio: ${item.precio}</p>
        </div>
      ))}
    </Slider>
  );
};


