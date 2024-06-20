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
  padding: 10px;
  box-sizing: border-box;

  @media (600px <= width <= 1400px) {
    padding-left: 20%; /* Incrementa el espaciado para vistas mayores a 1000px */
  }

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
        <StyledSlide
          key={item.id}
          onClick={() => handleSucursalClick(item as ISucursal)}
        >
          <Stack
            sx={{
              backgroundColor: "#FF6633   ",
              width: "100%",
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
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333333",
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

/* 
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
  background-color: white;

  img {
    padding: 6%;
    border-radius: 30px;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    margin: 2%;
    img {
      height: 150px;
    }
  }

  @media (max-width: 480px) {
    margin: 1%;
    img {
      height: 100px;
    }
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
  if (!items) return null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
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
          {item.imagen || (item.logo && (
            <img src={item.imagen || item.logo} alt={item.nombre} />
          ))}
          <h5>{item.nombre}</h5>
        </StyledSlide>
      ))}
    </Slider>
  );
};
 */