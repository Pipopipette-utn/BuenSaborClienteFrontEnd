import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { ISucursal } from "../../../types/empresa";

interface CardSucursalProps {
  sucursal: ISucursal;
}

const CardSucursal: React.FC<CardSucursalProps> = ({ sucursal }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {sucursal.nombre}
        </Typography>
        <Typography variant="body2">
          Dirección: {sucursal.domicilio?.localidad?.nombre}
        </Typography>
        {/* Aca se pueden agregar más cositas de la sucursal  */}
      </CardContent>
    </Card>
  );
};

export default CardSucursal;
