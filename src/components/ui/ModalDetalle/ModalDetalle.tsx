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
        {articulo.esInsumo? (null):(   <Typography variant="h6" sx={{ mt: 2 }}>
          {(articulo as IArticuloManufacturado).descripcion}
        </Typography>)}
     
        <Typography variant="h6" sx={{ mt: 2 }}>
          Precio: ${articulo.precioVenta}
        </Typography>
      </Box>
    </Modal>
  );
};

/* import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { IArticulo } from "../../../types/empresa";
import useCloudinary from "../../../hooks/useCloudinary";
import { Box, CardMedia, Grid, IconButton, Stack } from "@mui/material";
import { useAppDispatch } from "../../../redux/HookReducer";
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
  const dispatch = useAppDispatch();


  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={styles.modalBox}
      >
        <Grid item xs={12} sm={6} md={8} lg={6}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              {imageUrls.length > 1 ? (
                <Carousel images={imageUrls} />
              ) : (
                <CardMedia
                  component="img"
                  className={styles.modalBoxMedia} // Usa la clase CSS definida
                  image={imageUrls[0]}
                  alt={articulo.denominacion}
                />
              )}
            </Box>
            <Box sx={{ flex: 1, p: { xs: 2, sm: 0 } }}>
              <Typography variant="h3" component="h2" sx={{ fontSize: "2rem" }}>
                {articulo.denominacion}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {articulo.descripcion}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Precio: ${articulo.precioVenta}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Modal>
  );
};

 */
