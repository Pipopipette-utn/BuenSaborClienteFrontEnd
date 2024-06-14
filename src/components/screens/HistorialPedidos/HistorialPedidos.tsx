import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
} from "@mui/material";
import { IPedido } from "../../../types/pedido";
import { baseUrl } from "../../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";

export const HistorialPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [filteredPedidos, setFilteredPedidos] = useState<IPedido[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");
  const usuarioId = useAppSelector((state: RootState) => state.user?.user?.id)
  useEffect(() => {
    fetch(baseUrl + `/clientes/${usuarioId}/pedidos`)
      .then((response) => response.json())
      .then((data) => {
        setPedidos(data);
        setFilteredPedidos(data);
      })
      .catch((error) => console.error("Error al obtener los pedidos:", error));
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      setFilteredPedidos(
        pedidos.filter((pedido) => pedido.fechaPedido.startsWith(selectedDate))
      );
    } else {
      setFilteredPedidos(pedidos);
    }
  };

  const handleCancel = async (pedido: IPedido) => {
    const baja = {
      baja: "false",
      estado: "2"
    }
    try {
      const response = await fetch(baseUrl + `/pedidos/cambiarEstado/${pedido.id}`,
        {method: "PUT",
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(baja)
        }
      );
      if(response.ok){
        fetch(baseUrl + `/clientes/${usuarioId}/pedidos`)
        .then((response) => response.json())
        .then((data) => {
          setPedidos(data);
          setFilteredPedidos(data);
        })
        .catch((error) => console.error("Error al obtener los pedidos:", error));
      }
    }
    catch (error) {
      console.error("Error al cambiar de estado:", error);
    }
  }

  const handleDownloadPdf = async (pedido: IPedido) => {
    try {
      const response = await fetch(baseUrl + `/factura/generar/${pedido.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });
      if (!response.ok) {
        throw new Error("Error al descargar la factura");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `factura_pedido_${pedido.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar la factura:", error);
    }
  };
  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Historial de Pedidos
      </Typography>
      <TextField
        label="Filtrar por fecha"
        type="date"
        value={filterDate}
        onChange={handleFilterChange}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
      />
      <List>
        {filteredPedidos.map((pedido) => (
          <ListItem key={pedido.id} divider>
            <ListItemText
              primary={`Pedido ID: ${pedido.id}`}
              secondary={`Fecha: ${pedido.fechaPedido} - Total: $${pedido.total}`}
            />
            <Chip label={pedido.estado} color={pedido.estado.toString() === "CANCELADO" ? "error": "default"} sx={{mr: 2}}/>
            <Button
              disabled={pedido.estado.toString() === "CANCELADO"}
              variant="contained"
              color="primary"
              onClick={() => handleDownloadPdf(pedido)}
            >
              Descargar Factura
            </Button>
            <IconButton
                  disabled={pedido.estado.toString() === "CANCELADO"}
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleCancel(pedido)}
                  >
                    <DeleteIcon />
                  </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
