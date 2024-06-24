import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ISucursal } from "../../../types/empresa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/HookReducer";
import { setSucursal } from "../../../redux/slices/SelectedData";

interface CardSucursalProps {
  sucursal: ISucursal;
}

const CardSucursal: React.FC<CardSucursalProps> = ({ sucursal }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setSucursal(sucursal));
    navigate("/menu");
  };
  return (
    <Card
      variant="outlined"
      sx={{
        marginBottom: 2,
        borderRadius: isSm ? 5 : 0,
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          sx={{
            height: isSm ? 150 : 170,
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
          }}
          image={sucursal.imagenSucursal?.url}
        />
        <CardContent
          sx={{
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.primary.dark
                : undefined,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {sucursal.nombre}
          </Typography>
          <Typography variant="body1">
            Dirección: {sucursal.domicilio?.localidad?.nombre}
          </Typography>
          {/* Aca se pueden agregar más cositas de la sucursal  */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardSucursal;
