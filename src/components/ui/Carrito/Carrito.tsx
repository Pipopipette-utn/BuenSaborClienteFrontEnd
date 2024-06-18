import React, { useMemo, useState } from "react";
import { RootState } from "../../../redux/Store";
import {
  reduceItem,
  addItem,
  clearItems,
  removeItem,
} from "../../../redux/slices/CartSlice";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PedidoService } from "../../../services/PedidoService";
import { IDetallePedidoPostDTO, IPedidoDTO } from "../../../types/dto";
import { FormaPago, TipoEnvio } from "../../../types/enums";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IArticuloManufacturado } from "../../../types/empresa";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import { SuccessMessage } from "../commons/SuccessMessage";
import { ErrorMessage } from "../commons/ErrorMessage";
import { emptyPedidoDto } from "../../../types/emptyEntities";
import { setNewPedido } from "../../../redux/slices/SelectedData";
import { CheckoutMp } from "../../MP/CheckoutMP";
import { IDetallePedido } from "../../../types/pedido";
import { useNavigate } from "react-router-dom";

export function Carrito() {
  const [pedido, _setPedido] = useState<IPedidoDTO>(emptyPedidoDto);
  const [envio, setEnvio] = useState<TipoEnvio>(TipoEnvio.DELIVERY);
  const [pago, setPago] = useState<FormaPago>(FormaPago.MERCADO_PAGO);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [showMercadoPagoButton, setShowMercadoPagoButton] = useState(false);
  const [showSuccess, setShowSuccess] = useState("");
  const [showError, setShowError] = useState("");
  const items = useAppSelector((state: RootState) => state.cart.items);
  const usuario = useAppSelector((state: RootState) => state.user.user);
  const estaLogeado = useAppSelector((state: RootState) => state.user.isLogged);
  const sucursalId = useAppSelector(
    (state: RootState) => state.selectedData.sucursal?.id
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const calculateSubtotal = () => {
    return items.reduce(
      (acc, item) => acc + item.cantidad * item.articulo.precioVenta,
      0
    );
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();
    if (envio === TipoEnvio.TAKE_AWAY) {
      total *= 0.9; // aplica el 10% de descuento
    }
    return total;
  };

  const mercadoPagoButton = useMemo(() => {
    if (showMercadoPagoButton) {
      return <CheckoutMp />;
    }
    return null;
  }, [showMercadoPagoButton]);

  const handleGuardarCarrito = async () => {
    /*En caso de querer que rediriga al login, manejar aca*/
    if (!estaLogeado) {
      return navigate("login");
    }
    try {
      const pedidoService = new PedidoService("/pedidos");
      const detallesPedido: IDetallePedidoPostDTO[] = items.map((item) => ({
        cantidad: item.cantidad,
        subTotal: item.cantidad * item.articulo.precioVenta,
        articulo: {
          id: item.articulo.id,
          tiempoEstimadoMinutos: item.articulo.esInsumo
            ? 0
            : (item.articulo as IArticuloManufacturado).tiempoEstimadoMinutos,
        },
      }));

      const newPedido: IPedidoDTO = {
        total: calculateTotal(),
        tipoEnvio: envio,
        formaPago: pago,
        cliente: {
          id: usuario?.id,
        },
        sucursal: {
          id: sucursalId,
        },
        detallePedidos: detallesPedido,
      };
      if (newPedido.tipoEnvio === TipoEnvio.DELIVERY && selectedAddress) {
        newPedido.domicilio = { id: selectedAddress };
      }

      console.log("Pedido: ", newPedido);

      const response = await pedidoService.create(newPedido);
      dispatch(setNewPedido(newPedido));
      console.log("Pedido guardado con éxito", response);
      if (newPedido.formaPago === FormaPago.MERCADO_PAGO) {
        setShowMercadoPagoButton(true);
      }
      handleShowSuccess("Pedido guardado con éxito!");
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        handleShowError(
          "Error al crear el pedido: " + error.response.data.message
        );
      } else {
        handleShowError("Error al crear el pedido: " + error.message);
      }
      console.error("Error al guardar el pedido", error);
    }
  };

  const validateStock = (item: IDetallePedido) => {
    const stockDisponible = item.articulo.stockActual;
    const stockMinimo = item.articulo.stockMinimo;

    return stockDisponible! > stockMinimo!;
  };

  const handleAddItem = (item: IDetallePedido) => {
    if (!validateStock(item)) {
      handleShowError(
        "No se puede agregar el artículo, superaría el stock mínimo"
      );
      return;
    }
    dispatch(addItem(item.articulo));
  };

  const handleClearItems = () => {
    dispatch(clearItems());
  };

  const handleShowSuccess = (message: string) => setShowSuccess(message);
  const handleCloseSuccess = () => setShowSuccess("");

  const handleShowError = (message: string) => setShowError(message);
  const handleCloseError = () => setShowError("");

  console.log("Render de carrito");
  return (
    <Stack
      className="cart"
      p={2}
      component={Paper}
      height="auto"
      sx={{
        position: "sticky",
        top: "20px",
        width: "25vw",
        maxHeight: "90vh",
        overflow: "hidden", // Oculta el desbordamiento del Stack principal
      }}
    >
      <Typography variant="h6" gutterBottom>
        Carrito de Compras
      </Typography>
      {items.length === 0 ? (
        <Typography variant="body1">El carrito está vacío</Typography>
      ) : (
        <>
          <List sx={{ overflowY: "auto", maxHeight: "70 vh", flexGrow: 1 }}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={item.articulo?.denominacion}
                    secondary={`Cantidad: ${item.cantidad} - Precio: $${
                      item.articulo?.precioVenta * item.cantidad
                    }`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="reduce"
                      onClick={() => dispatch(reduceItem(item.articulo))}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => handleAddItem(item)}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => dispatch(removeItem(item.articulo))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>

          {envio === TipoEnvio.DELIVERY && (
            <ListItem>
              <ListItemText primary={`Subtotal: $${calculateSubtotal()}`} />
            </ListItem>
          )}
          <ListItem>
            <ListItemText primary={`Total: $${calculateTotal()}`} />
          </ListItem>
          {}
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="tipo-envio-label">Tipo de Envío</InputLabel>
              <Select
                labelId="tipo-envio-label"
                id="tipo-envio-select"
                value={envio}
                label="Tipo de Envío"
                onChange={(e) => setEnvio(e.target.value as TipoEnvio)}
              >
                <MenuItem value={TipoEnvio.DELIVERY}>
                  Envío a domicilio
                </MenuItem>
                <MenuItem value={TipoEnvio.TAKE_AWAY}>
                  Retiro en sucursal
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="forma-pago-label">Forma de Pago</InputLabel>
              <Select
                labelId="forma-pago-label"
                id="forma-pago-select"
                value={pago}
                label="Forma de Pago"
                onChange={(e) => setPago(e.target.value as FormaPago)}
                disabled={envio === TipoEnvio.DELIVERY}
              >
                <MenuItem value={FormaPago.MERCADO_PAGO}>Mercado Pago</MenuItem>
                {envio !== TipoEnvio.DELIVERY && (
                  <MenuItem value={FormaPago.EFECTIVO}>Efectivo</MenuItem>
                )}
              </Select>
            </FormControl>
          </ListItem>
          {envio === TipoEnvio.DELIVERY && (
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="domicilio-select-label">Domicilio</InputLabel>
                <Select
                  labelId="domicilio-select-label"
                  id="domicilio-select"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value as number)}
                >
                  {usuario?.domicilios.map((domicilio) => (
                    <MenuItem key={domicilio.id} value={domicilio.id}>
                      {domicilio.calle} {domicilio.numero}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          )}
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClearItems}
            >
              Cancelar
            </Button>

            {pedido.formaPago === FormaPago.EFECTIVO ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleGuardarCarrito}
              >
                Pagar
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{
                  width: "100px",
                  marginLeft: "10vh",
                  right: "-19px",
                }}
                color="primary"
                onClick={handleGuardarCarrito}
              >
                Guardar Pedido
              </Button>
            )}
          </ListItem>
        </>
      )}
      {showSuccess && (
        <SuccessMessage
          open={!!showSuccess}
          message={showSuccess}
          onClose={handleCloseSuccess}
        />
      )}
      {showError && (
        <ErrorMessage
          open={!!showError}
          message={showError}
          onClose={handleCloseError}
        />
      )}
      {mercadoPagoButton}
    </Stack>
  );
}
