import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IArticulo } from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Box, CardMedia, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../../redux/HookReducer";
import { addItems } from "../../../redux/slices/CartSlice";
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
  const [cantidad, setCantidad] = useState<number>(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      setCantidad(1); // Reset cantidad a 1 cada vez que el modal se abre
    }
  }, [open]);

  const handleIncrement = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addItems({ articulo, cantidad }));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.modalBox}>
        {imageUrls.length > 1 ? (
          <Carousel images={imageUrls} />
        ) : (
          <CardMedia
            component="img"
            sx={{ height: 240, borderRadius: "20px" }} //tamaño
            image={imageUrls[0]}
            alt={articulo.denominacion}
          />
        )}

        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: "2rem" } }}
        >
          {articulo.denominacion}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {articulo.descripcion}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Precio: ${articulo.precioVenta}
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            disableRipple
            className={styles.incrementDecrementButton}
            onClick={handleDecrement}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{cantidad}</Typography>
          <IconButton
            disableRipple
            className={styles.incrementDecrementButton}
            onClick={handleIncrement}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          className={styles.addToCartButton}
          startIcon={<ShoppingCartIcon />}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Modal>
  );
};
