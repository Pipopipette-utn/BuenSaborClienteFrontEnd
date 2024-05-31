import { useAppDispatch } from "../../../redux/HookReducer";
import {
  reduceItem,
  addItem,
  clearItems,
} from "../../../redux/slices/CartSlice";
import { Button, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export function Carrito() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();

  const calculateSubtotal = () => {
    return items.reduce(
      (acc, item) => acc + item.cantidad * item.articulo.precioVenta,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };
  const handleGuardarCarrito = () => {
    console.log("Guardar carrito");
  };
  return (
    <>
      <div className="cart">
        <h2>Carrito de Compras</h2>
        {items.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <div>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.articulo.denominacion}
                  <IconButton
                    onClick={() => dispatch(reduceItem(item.articulo))}
                    style={{ fontSize: "0.5em", marginRight: "4px" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  x{item.cantidad}
                  <IconButton
                    onClick={() => dispatch(addItem(item.articulo))}
                    style={{ fontSize: "0.5em", marginLeft: "4px" }}
                  >
                    <AddIcon />
                  </IconButton>
                  - ${item.articulo.precioVenta * item.cantidad}
                </li>
              ))}
            </ul>
            <div>Subtotal: ${calculateSubtotal()}</div>
            <div>Total: ${calculateTotal()}</div>
            <Button
              onClick={() => dispatch(clearItems())}
              style={{ marginRight: "5rem" }}
            >
              Cancelar
            </Button>
            <Button onClick={handleGuardarCarrito}>Guardar Carrito</Button>
          </div>
        )}
      </div>
    </>
  );
}
