import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IArticulo } from '../../../types/empresa';

interface ModalDetalleProps {
  open: boolean;
  handleClose: () => void;
  articulo: IArticulo;
  addToCart: (articulo: IArticulo, cantidad: number) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ModalDetalle: React.FC<ModalDetalleProps> = ({ open, handleClose, articulo, addToCart }) => {
  const [cantidad, setCantidad] = useState<number>(1);

  const handleIncrement = () => {
    setCantidad(cantidad + 1);
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(articulo, cantidad);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {articulo.denominacion}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {articulo.descripcion}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Precio: ${articulo.precioVenta}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" onClick={handleDecrement} sx={{ mr: 2 }}>-</Button>
          <Typography variant="body1">{cantidad}</Typography>
          <Button variant="contained" onClick={handleIncrement} sx={{ ml: 2 }}>+</Button>
        </Box>
        <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 2 }}>Agregar al carrito</Button>
      </Box>
    </Modal>
  );
};
