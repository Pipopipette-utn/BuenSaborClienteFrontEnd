import { useSelector } from 'react-redux';
import { useFetch } from "../../../hooks/UseFetch";
import { IEmpresa } from "../../../types/empresa";
import { IDetallePedido } from "../../../types/pedido";
import { RootState } from '../../../redux/Store';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export const Pedido = () => {
  const { data: empresa, loading: loadingEmpresa } = useFetch<IEmpresa>(
    "http://localhost:8080/empresas/3"
  ); //debo pasarle el id desde otro lado

  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (loadingEmpresa) return <h1>Cargando...</h1>;

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {empresa?.nombre}
      </Typography>
      <div>
        {cartItems.length === 0 ? (
          <Typography variant="body1">No hay artículos en el carrito.</Typography>
        ) : (
          <List>
            {cartItems.map((item) => (
              <ListItem key={item.articulo.id} divider>
                <ListItemText
                  primary={`Artículo: ${item.articulo.denominacion}`}
                  secondary={`Cantidad: ${item.cantidad}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </Paper>
  );
};
