import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import {
  IArticulo,
  IPromocion,
  IArticuloManufacturado,
} from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Box, CardMedia, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./ModalDetalle.module.css";
import Carousel from "./CarouselModal";

interface ModalDetalleProps {
  open: boolean;
  handleClose: () => void;
  articulo: IArticulo | IPromocion;
}

export const ModalDetalle: React.FC<ModalDetalleProps> = ({
  open,
  handleClose,
  articulo,
}) => {
  const theme = useTheme(); // Obtiene el tema actual
  const imageUrls = useCloudinary(articulo.imagenes || []);

  // Función para verificar si el artículo es una promoción
  const esPromocion = (
    articulo: IArticulo | IPromocion
  ): articulo is IPromocion => {
    return (articulo as IPromocion).precioPromocional !== undefined;
  };

  const esManufacturado = (
    articulo: IArticulo | IPromocion
  ): articulo is IArticuloManufacturado => {
    return (articulo as IArticuloManufacturado).descripcion !== undefined;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className={styles.modalBox}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 3,
            top: -3,
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        {imageUrls.length > 1 ? (
          <Carousel images={imageUrls} />
        ) : (
          <CardMedia
            component="img"
            className={styles.modalBoxMedia}
            image={imageUrls[0]}
            alt={articulo.denominacion}
          />
        )}
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: "2rem" }, paddingLeft: "16px" }}
        >
          {articulo.denominacion}
        </Typography>
        {/* Verifica si el artículo es IArticulo antes de acceder a sus propiedades específicas */}
        {!esPromocion(articulo) && esManufacturado(articulo) && (
          <Typography variant="h6" sx={{ mt: 2, paddingLeft: "16px" }}>
            {(articulo as IArticuloManufacturado).descripcion}
          </Typography>
        )}
        {esPromocion(articulo) && (
          <>
            <Typography variant="h6" sx={{ mt: 2, paddingLeft: "16px" }}>
              {(articulo as IPromocion).descripcionDescuento}
            </Typography>
            <Typography variant="h6" sx={{ paddingLeft: "16px" }}>
              {
                (articulo as IPromocion).promocionDetalles?.articulo
                  ?.denominacion
              }{" "}
              - {(articulo as IPromocion).promocionDetalles?.cantidad}
            </Typography>
          </>
        )}

        {/* Muestra el precio dependiendo del tipo de artículo */}
        <Typography
          variant="h6"
          sx={{ mt: 2, paddingLeft: "16px", paddingBottom: "16px" }}
        >
          Precio: $
          {esPromocion(articulo)
            ? articulo.precioPromocional
            : articulo.precioVenta}
        </Typography>
      </Box>
    </Modal>
  );
};
