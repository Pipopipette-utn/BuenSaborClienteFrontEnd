import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { ICategoria, IPromocion, ISucursal } from "../../../types/empresa";
import style from "./ItemSlider.module.css";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setSucursal } from "../../../redux/slices/SelectedData";
import { useNavigate } from "react-router-dom";

const StyledSlide = styled.div`
  margin: 3%;
  border-radius: 20px;
  text-align: center;
  max-width: 250px;
  background-color: white;
  img {
    padding: 6%;
    border-radius: 30px;
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
  items: ICategoria[] | ISucursal[] | IPromocion[] | null;
}

const transformToSlideItems = (
  data: ICategoria[] | ISucursal[] | IPromocion[]
): SlideItem[] => {
  return data.map((item) => ({
    id: item.id || 0,
    logo: (item as ISucursal).logo || undefined,
    imagen: (item as IPromocion).imagenes?.[0]?.url || undefined,
    nombre:
      (item as ICategoria).denominacion ||
      (item as ISucursal).nombre ||
      (item as IPromocion).denominacion ||
      "",
  }));
};

export const SliderGenerico: React.FC<SliderProps> = ({ items }) => {
  if (!items) return null; // Salir si items es null
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true, // Centra los elementos en el slider
  };

  const slideItems = transformToSlideItems(items);
  const handleSucursalClick = (sucursal: ISucursal) => {
    dispatch(setSucursal(sucursal));
    navigate(`/menu`);
    console.log("clickeado en la sucrusal: ", sucursal);
  };

  return (
    <Slider {...settings} className={style.slider}>
      {slideItems.map((item) => (
        <StyledSlide
          key={item.id}
          onClick={() => handleSucursalClick(item as ISucursal)}
        >
          {item.imagen ||
            (item.logo && (
              <img src={item.imagen || item.logo} alt={item.nombre} />
            ))}
          <h5>{item.nombre}</h5>
        </StyledSlide>
      ))}
    </Slider>
  );
};
