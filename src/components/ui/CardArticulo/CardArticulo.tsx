import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ModalDetalle } from "../ModalDetalle/ModalDetalle";
import { IArticulo } from "../../../types/empresa";

interface CardArticuloProps {
  articulo: IArticulo;
}

export const CardArticulo: React.FC<CardArticuloProps> = ({ articulo }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const obtenerImagenPrincipal = (articulo: IArticulo): string | undefined => {
    return articulo.imagenes.length > 0 ? articulo.imagenes[0] : undefined;
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          imagen={obtenerImagenPrincipal}
          titulo={articulo.denominacion}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {articulo.denominacion}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            ${articulo.precioVenta}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Detalle
          </Button>
        </CardActions>
      </Card>
      <ModalDetalle open={open} handleClose={handleClose} articulo={articulo} />
    </>
  );
};
