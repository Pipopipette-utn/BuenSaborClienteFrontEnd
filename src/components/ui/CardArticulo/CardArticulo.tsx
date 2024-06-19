import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ModalDetalle } from "../ModalDetalle/ModalDetalle";
import useCloudinary from "../../../hooks/useCloudinary";
import { IArticulo } from "../../../types/empresa";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface CardArticuloProps {
  articulo: IArticulo;
}

export const CardArticulo: React.FC<CardArticuloProps> = ({ articulo }) => {
  const imageUrls = useCloudinary(articulo.imagenes || []);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const obtenerImagenPrincipal = (imageUrls: any) => {
    return imageUrls.length > 0 ? imageUrls[0] : undefined;
  };
  const imagenPrincipal = obtenerImagenPrincipal(imageUrls);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("xs"));
  //const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Card
        sx={{
          width: "100%", // Ocupar el ancho completo del contenedor
          margin: "0.5rem", // Margen entre cards
        }}
      >
        <CardContent>
          <CardMedia
            component="img"
            sx={{ height: isXs ? 180 : 240, borderRadius: 3 }}
            image={imagenPrincipal}
            alt={`${articulo.denominacion} - Imagen principal`}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "18px", fontWeight: "bold" }}
          >
            {articulo.denominacion}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "18px" }}
          >
            ${articulo.precioVenta}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" size="small" onClick={handleOpen}>
            Ver más
          </Button>
        </CardActions>
      </Card>
      <ModalDetalle open={open} handleClose={handleClose} articulo={articulo} />
    </>
  );
};
