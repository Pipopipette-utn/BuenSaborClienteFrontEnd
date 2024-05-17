// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { IArticuloInsumoTableDTO } from "../types/dto";
import { IArticuloInsumo } from "../types/empresa";
import { BackendClient } from "./BakendClient";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloInsumoService extends BackendClient<IArticuloInsumo> {
	articulosInsumosToDTO = (
		insumos: IArticuloInsumo[]
	): IArticuloInsumoTableDTO[] => {
		const insumosDTO = insumos.map((insumo) => {
			const insumoDTO = {
				...insumo,
				esParaElaborar: insumo.esParaElaborar ? (
					<TaskAltIcon color="primary" />
				) : (
					<RemoveCircleOutlineIcon color="primary" />
				),
				precioCompra: insumo.precioCompra ? `$${insumo.precioCompra}` : "-",
				precioVenta: insumo.precioVenta ? `$${insumo.precioVenta}` : "-",
				unidadMedida: insumo.unidadMedida?.denominacion,
				categoria: insumo.categoria ? insumo.categoria.denominacion : "-",
			};
			return insumoDTO as IArticuloInsumoTableDTO;
		});
		return insumosDTO;
	};
}
