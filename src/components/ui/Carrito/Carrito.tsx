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

// Función que retorna las direcciones guardadas del cliente [IMPLEMENTAR FILTRANDO SOLO LAS UBICACIONES? EN SERVICE]
const getSavedAddresses = () => {
  return ["Dirección 1", "Dirección 2", "Dirección 3"]; // HARDCODEOOO
};

export function Carrito() {
  const items = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const [envio, setEnvio] = useState<TipoEnvio>(TipoEnvio.DELIVERY);
  const [pedido, setPedido] = useState<IPedidoDTO>(emptyPedidoDto);

  const [showMercadoPagoButton, setShowMercadoPagoButton] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(
    getSavedAddresses()[0]
  );
  //const [selectedAddress, setSelectedAddress] = useState<number>(0);

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
        formaPago: pedido.formaPago,
        /* domicilio: {
          id: 10, // hardcodeado usar cliente.domicilio o un selectedDomicilio (total se listan los domicilios de ese cliente)
        }, */
        cliente: {
          id: 6, //reemplazar con un id que guardare en un slice
        },
        sucursal: {
          id: 2, //reemplazar con un id que guardo en un slice
        },
        detallePedidos: detallesPedido,
      };
      newPedido.formaPago === FormaPago.MERCADO_PAGO
        ? setShowMercadoPagoButton(true)
        : null;
      /* //Descomentar cuando tenga un get domicilios
      if (newPedido.tipoEnvio === TipoEnvio.DELIVERY) {
        newPedido.domicilio?.id = selectedAddress;
      }
        */

      //setPedido(newPedido); //Local, borrar posiblemente
      dispatch(setNewPedido(newPedido)); //con Redux
      const response = await pedidoService.create(newPedido);
      //setShowMercadoPagoButton(true);                     //Descomentar cuando funcione
      console.log("Pedido guardado con éxito", response);
      handleShowSuccess("Pedido guardado con éxito!");
    } catch (error: any) {
      handleShowError("Error al crear el pedido: " + error);
      console.error("Error al guardar el pedido", error);
    }
  };

  const [showSuccess, setShowSuccess] = useState("");
  const handleShowSuccess = (message: string) => setShowSuccess(message);
  const handleCloseSuccess = () => setShowSuccess("");

  const [showError, setShowError] = useState("");
  const handleShowError = (message: string) => setShowError(message);
  const handleCloseError = () => setShowError("");

  console.log("Render de carrito");

  return (
    <Stack
      className="cart"
      p={2}
      component={Paper}
      elevation={3}
      height="75vh"
      sx={{ width: "25vw" }}
    >
      <Typography variant="h6" gutterBottom>
        Carrito de Compras
      </Typography>
      {items.length === 0 ? (
        <Typography variant="body1">El carrito está vacío</Typography>
      ) : (
        <List>
          {items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={item.articulo.denominacion}
                  secondary={`Cantidad: ${item.cantidad} - Precio: $${
                    item.articulo.precioVenta * item.cantidad
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
                    onClick={() => dispatch(addItem(item.articulo))}
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
          {envio === TipoEnvio.DELIVERY && (
            <ListItem>
              <ListItemText primary={`Subtotal: $${calculateSubtotal()}`} />
            </ListItem>
          )}
          <ListItem>
            <ListItemText primary={`Total: $${calculateTotal()}`} />
          </ListItem>
          {/* Botones de tipo de envio y metodo de pago, pueden ir en un componente */}
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
                value={pedido.formaPago}
                label="Forma de Pago"
                onChange={(e) =>
                  setPedido({
                    ...pedido,
                    formaPago: e.target.value as FormaPago,
                  })
                }
                disabled={envio === TipoEnvio.DELIVERY} // Deshabilita el select si el tipo de envío es retiro
              >
                <MenuItem value={FormaPago.MERCADO_PAGO}>Mercado Pago</MenuItem>

                {envio !== TipoEnvio.DELIVERY && (
                  <MenuItem value={FormaPago.EFECTIVO}>Efectivo</MenuItem>
                )}
              </Select>
            </FormControl>
          </ListItem>
          {/** Aca se elige domicilio*/}
          {envio === TipoEnvio.DELIVERY && (
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="domicilio-cliente-label">
                  Domicilio del Cliente
                </InputLabel>
                <Select
                  labelId="domicilio-cliente-label"
                  id="domicilio-cliente-select"
                  value={selectedAddress}
                  label="Seleccione el domicilio a enviar"
                  onChange={(e) => setSelectedAddress(e.target.value as string)} //CAMBIAR CUANDO TENGA GET DOMICILIO
                >
                  {/*          <MenuItem value={getSavedAddresses()[0]}>
                    {getSavedAddresses()[0]}
                  </MenuItem> */}
                  {getSavedAddresses().map((address) => (
                    <MenuItem key={address} value={address}>
                      {address}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          )}
          {mercadoPagoButton || (
            <ListItem>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => dispatch(clearItems())}
                style={{ marginRight: "1rem" }}
              >
                Cancelar
              </Button>

              {envio === TipoEnvio.DELIVERY ||
              pedido.formaPago === FormaPago.MERCADO_PAGO ? (
                //En caso de envio
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGuardarCarrito}
                >
                  Guardar Carrito
                </Button>
              ) : (
                //En caso de retiro
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleGuardarCarrito}
                >
                  Pagar
                </Button>
              )}
            </ListItem>
          )}
        </List>
      )}
      <SuccessMessage
        open={!!showSuccess}
        onClose={handleCloseSuccess}
        message={showSuccess}
      />
      <ErrorMessage
        open={!!showError}
        onClose={handleCloseError}
        message={showError}
      />
    </Stack>
  );
}
