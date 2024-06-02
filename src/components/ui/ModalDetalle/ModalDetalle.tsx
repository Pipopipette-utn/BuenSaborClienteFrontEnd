import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IArticulo } from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Box, CardMedia, Grid, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../../redux/HookReducer";
import { addItems } from "../../../redux/slices/CartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import styles from "./ModalDetalle.module.css";

interface ModalDetalleProps {
  open: boolean;
  handleClose: () => void;
  articulo: IArticulo;
  addToCart: (articulo: IArticulo, cantidad: number) => void;
}

export const ModalDetalle: React.FC<ModalDetalleProps> = ({
  open,
  handleClose,
  articulo,
}) => {
  const imageUrls = useCloudinary(articulo.imagenes || []);
  const [cantidad, setCantidad] = useState<number>(1);
  //const items = useSelector((state: RootState) => state.cart.items);
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
        <Grid container spacing={2}>
          {imageUrls.map((url, index) => (
            <CardMedia
              key={index}
              component="img"
              className={styles.modalBoxMedia}
              image={url}
              alt={`${articulo.denominacion} ${index + 1}`}
            />
          ))}
        </Grid>
        <Typography variant="h3" component="h2">
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
