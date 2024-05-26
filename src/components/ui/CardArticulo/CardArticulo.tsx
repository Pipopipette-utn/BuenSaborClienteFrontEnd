import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ModalDetalle } from "../ModalDetalle/ModalDetalle";
import { IArticulo, IImagen } from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Grid } from "@mui/material";

interface CardArticuloProps {
  articulo: IArticulo;
}

export const CardArticulo: React.FC<CardArticuloProps> = ({ articulo }) => {
  const imageUrls = useCloudinary(articulo.imagenes || []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const obtenerImagenPrincipal = (articulo: IArticulo): IImagen | undefined => {
    return articulo.imagenes!.length > 0 ? articulo.imagenes![0] : undefined;
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Grid container spacing={2}>
          {imageUrls.map((url, index) => (
            //<Grid item xs={6} md={4} key={index}>
            <CardMedia
              component="img"
              //sx={{ height: 140 }} //tamaño
              image={url}
              alt={`${articulo.denominacion} ${index + 1}`}
            />
            //</Grid>
          ))}
        </Grid>
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
