import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { IArticulo, IArticuloManufacturado } from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Box, CardMedia } from "@mui/material";
import styles from "./ModalDetalle.module.css";
import Carousel from "./CarouselModal";

interface ModalDetalleProps {
  open: boolean;
  handleClose: () => void;
  articulo: IArticulo;
}

export const ModalDetalle: React.FC<ModalDetalleProps> = ({
  open,
  handleClose,
  articulo,
}) => {
  const imageUrls = useCloudinary(articulo.imagenes || []);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalBox}>
        <Box>
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
        </Box>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: "2rem" } }}
        >
          {articulo.denominacion}
        </Typography>
        {articulo.esInsumo ? null : (
          <Typography variant="h6" sx={{ mt: 2 }}>
            {(articulo as IArticuloManufacturado).descripcion}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>
          Precio: ${articulo.precioVenta}
        </Typography>
      </Box>
    </Modal>
  );
};
