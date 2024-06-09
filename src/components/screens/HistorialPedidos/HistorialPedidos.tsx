import React, { useEffect, useState } from 'react';
import { Button, TextField, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { jsPDF } from 'jspdf';
import { IPedido } from '../../../types/pedido';

export const HistorialPedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [filteredPedidos, setFilteredPedidos] = useState<IPedido[]>([]);
  const [filterDate, setFilterDate] = useState<string>('');

  useEffect(() => {
    get('/api/pedidos')
      .then(response => {
        setPedidos(response.data);
        setFilteredPedidos(response.data);
      })
      .catch(error => console.error('Error al obtener los pedidos:', error));
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;
    setFilterDate(selectedDate);
    if (selectedDate) {
      setFilteredPedidos(pedidos.filter(pedido => pedido.fechaPedido.startsWith(selectedDate)));
    } else {
      setFilteredPedidos(pedidos);
    }
  };

  const handleDownloadPdf = (pedido: IPedido) => {
    const doc = new jsPDF();
    doc.text(`Factura: ${pedido.factura.id}`, 10, 10);
    doc.text(`Pedido N°: ${pedido.id}`, 10, 10);
    doc.text(`Fecha del Pedido: ${pedido.fechaPedido}`, 10, 20);
    doc.text(`Sucursal: ${pedido.sucursal.nombre}`, 10, 10);
    doc.text(`SR : ${pedido.cliente.nombre+ " " +pedido.cliente.apellidos}`, 10, 10);
    doc.text(`Pedido ID: ${pedido.id}`, 10, 10);
    doc.text(`Detalle: ${pedido.detallesPedido}`, 10, 10);
    doc.text(`Total: $${pedido.total}`, 10, 30);
    doc.text(`Forma de pago: ${pedido.formaPago}`, 10, 20);
    doc.text(`Tipo entrega: ${pedido.tipoEnvio}`, 10, 10);
    doc.text(`Operador: ${pedido.empleado.nombre + " " +pedido.empleado.apellidos}`, 10, 10);
    doc.save(`factura_pedido_${pedido.id}.pdf`);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
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
        {filteredPedidos.map(pedido => (
          <ListItem key={pedido.id} divider>
            <ListItemText
              primary={`Pedido ID: ${pedido.id}`}
              secondary={`Fecha: ${pedido.fechaPedido} - Total: $${pedido.total}`}
            />
            <Button variant="contained" color="primary" onClick={() => handleDownloadPdf(pedido)}>
              Descargar Factura
            </Button>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};


