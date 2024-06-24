import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ICategoria, IPromocion, ISucursal } from "../../../types/empresa";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setSucursal } from "../../../redux/slices/SelectedData";
import { useNavigate } from "react-router-dom";
import { useWindowResize } from "../../../hooks/useWindowRezise";
import { Stack } from "@mui/material";
import "./SliderGenerico.css";

interface SlideItem {
  id: number;
  logo?: string | undefined;
  imagenes?: { url: string }[] | undefined;
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
    logo: (item as ISucursal).imagenSucursal?.url || undefined,
    imagenes: (item as IPromocion).imagenes || undefined,
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
  const { isMobile, isSmall, isLarge } = useWindowResize();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isSmall ? 2 : isLarge ? 4 : 6,
    slidesToScroll: 1,
    centerMode: true, // Centra los elementos en el slider
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slideItems = transformToSlideItems(items);

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(false); // Iniciar como no arrastrando
  };

  const handleMouseMove = () => {
    setIsDragging(true); // Cambiar a arrastrando
  };

  const handleMouseUp = (item: SlideItem) => {
    if (!isDragging) {
      if (!item.logo && !item.imagenes) {
        // Es una categoría
        navigate(`/sucursales`);
      } else if (item.logo !== undefined || item.imagenes !== undefined) {
        // Es una sucursal
        dispatch(setSucursal(item as ISucursal));
        navigate(`/menu`);
        console.log("Clickeado en la sucursal: ", item);
      } else if ("precioPromocional" in item) {
        // En caso de que sea una promoción (mickey herramienta misteriosa)
        // navigate(`/promociones/${item.id}`);
      }
    }
  };

  return (
    <Slider {...settings}>
      {slideItems.map((item) => (
        <div
          className="StyledSlide"
          key={item.id}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={() => handleMouseUp(item)}
        >
          <Stack
            className={item.logo || item.imagenes ? "Stack" : "StackNoImg"}
            spacing={2}
          >
            {(item.imagenes && item.imagenes[0] && item.imagenes[0].url) ||
              (item.logo && (
                <img
                  src={item.logo || (item.imagenes && item.imagenes[0].url)}
                  alt={item.nombre}
                />
              )) ||
              null}
            <h5>{item.nombre}</h5>
          </Stack>
        </div>
      ))}
    </Slider>
  );
};
