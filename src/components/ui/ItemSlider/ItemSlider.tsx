import React from "react";
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
  const handleSucursalClick = (sucursal: ISucursal) => {
    dispatch(setSucursal(sucursal));
    navigate(`/menu`);
    console.log("clickeado en la sucrusal: ", sucursal);
  };

  return (
    <Slider {...settings}>
      {slideItems.map((item) => (
        <div
          className="StyledSlide"
          key={item.id}
          onClick={() => handleSucursalClick(item as ISucursal)}
        >
          <Stack className="Stack" spacing={2}>
            {(item.imagenes && item.imagenes[0] && item.imagenes[0].url) ||
              (item.logo && (
                <img
                  src={item.logo || item.imagenes![0].url}
                  alt={item.nombre}
                />
              ))}
            <h5>{item.nombre}</h5>
          </Stack>
        </div>
      ))}
    </Slider>
  );
};
