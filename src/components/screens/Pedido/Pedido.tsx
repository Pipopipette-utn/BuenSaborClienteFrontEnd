import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

export const Pedido = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <div>
        {cartItems.length === 0 ? (
          <Typography variant="body1">
            No hay artículos en el carrito.
          </Typography>
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
