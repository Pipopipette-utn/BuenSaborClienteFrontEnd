// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { ISucursal } from "../types/empresa";
import { BackendClient } from "./BakendClient";

// Clase SucursalService que extiende BackendClient para interactuar con la API de personas
export class SucursalService extends BackendClient<ISucursal> {
	filterByEmpresaId = (sucursales: ISucursal[], id: number): ISucursal[] => {
		return sucursales.filter((s) => s.empresa!.id == id);
	};
}
