import React, { useState } from "react";
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
} from "@mui/material";
import { PedidoService } from "../../../services/PedidoService";
import { IDetallePedidoPostDTO, IPedidoDTO } from "../../../types/dto";
import { FormaPago, TipoEnvio } from "../../../types/enums";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IArticuloManufacturado } from "../../../types/empresa";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";

export function Carrito() {
	const items = useAppSelector((state: RootState) => state.cart.items);
	const dispatch = useAppDispatch();
	const [envio, setEnvio] = useState<TipoEnvio>(TipoEnvio.DELIVERY);

	const calculateSubtotal = () => {
		return items.reduce(
			(acc, item) => acc + item.cantidad * item.articulo.precioVenta,
			0
		);
	};

	const calculateTotal = () => {
		return calculateSubtotal();
	};

	const handleGuardarCarrito = async () => {
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
			formaPago: FormaPago.EFECTIVO,
			sucursal: {
				id: 1,
			},
			detallePedidos: detallesPedido,
		};

		try {
			const response = await pedidoService.create(newPedido);
			console.log("Pedido guardado con éxito", response);
		} catch (error) {
			console.error("Error al guardar el pedido", error);
		}
	};

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

						<ListItem>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => dispatch(clearItems())}
								style={{ marginRight: "1rem" }}
							>
								Cancelar
							</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleGuardarCarrito}
							>
								Guardar Carrito
							</Button>
						</ListItem>
					</List>
				)}
		</Stack>
	);
}
