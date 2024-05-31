import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IArticulo } from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Box, CardMedia, Grid, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { lightTheme } from "../../Themes/LightTheme";
import { useCarrito } from "../../../hooks/useCarrito";
import { useAppDispatch } from "../../../redux/HookReducer";
import { addItem, addItems } from "../../../redux/slices/CartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
interface ModalDetalleProps {
  open: boolean;
  handleClose: () => void;
  articulo: IArticulo;
  addToCart: (articulo: IArticulo, cantidad: number) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "60%", lg: "45%" },
  minHeight: "90%",
  maxHeight: "95%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
//meterle uso de la store de redux
export const ModalDetalle: React.FC<ModalDetalleProps> = ({
  open,
  handleClose,
  articulo,
}) => {
  const imageUrls = useCloudinary(articulo.imagenes || []);
  const [cantidad, setCantidad] = useState<number>(1);
  //const items = useSelector((state: RootState) => state.cart.items); //No lo uso
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      setCantidad(1);
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
      <Box sx={style}>
        <Grid container spacing={2}>
          {imageUrls.map((url, index) => (
            <CardMedia
              component="img"
              sx={{ height: 240, borderRadius: "20px" }} //tamaño
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
            sx={{
              backgroundColor: lightTheme.palette.primary.main,
              borderRadius: 1,
              marginRight: "10px",
            }}
            onClick={handleDecrement}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{cantidad}</Typography>
          <IconButton
            disableRipple
            sx={{
              backgroundColor: lightTheme.palette.primary.main,
              borderRadius: 1,
              marginLeft: "10px",
            }}
            onClick={handleIncrement}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
          startIcon={<ShoppingCartIcon />}
        >
          Agregar al carrito
        </Button>
      </Box>
    </Modal>
  );
};
