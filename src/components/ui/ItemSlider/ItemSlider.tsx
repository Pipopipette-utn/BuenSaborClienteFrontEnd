import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { ICategoria, IPromocion, ISucursal } from "../../../types/empresa";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setSucursal } from "../../../redux/slices/SelectedData";
import { useNavigate } from "react-router-dom";
import { useWindowResize } from "../../../hooks/useWindowRezise";
import { Stack } from "@mui/material";

const StyledSlide = styled.div`
	width: "180px",
	border-radius: 20px;
	text-align: center;
	img {
		border-radius: 30px;
		border-bottom-right-radius: 0px;
		border-bottom-left-radius: 0px;
		width: 100%; /* Establece el ancho al 100% del contenedor */
		height: 150px; /* Establece la altura deseada para las imágenes */
		object-fit: cover; /* Escala las imágenes manteniendo la relación de aspecto y recortando si es necesario */
	}
`;

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
    slidesToShow: isMobile ? 1 : isSmall ? 2 : isLarge ? 6 : 6,
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
    <Slider {...settings}>
      {slideItems.map((item) => (
        <StyledSlide
          key={item.id}
          onClick={() => handleSucursalClick(item as ISucursal)}
        >
          <Stack
            sx={{
              backgroundColor: "#DDDDDD",
              width: "180px",
              height: "230px",
              borderRadius: "30px",
            }}
            spacing={2}
          >
            {(item.imagenes && item.imagenes[0] && item.imagenes[0].url) ||
              (item.logo && (
                <img
                  src={item.logo || item.imagenes![0].url}
                  alt={item.nombre}
                />
              ))}
            <h5
              style={{
                marginBottom: "16%",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {item.nombre}
            </h5>
          </Stack>
        </StyledSlide>
      ))}
    </Slider>
  );
};
