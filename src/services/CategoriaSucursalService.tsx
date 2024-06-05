// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { ICategoriaSucursal } from "../types/empresa";
import { BackendClient } from "./BackendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class CategoriaSucursalService extends BackendClient<ICategoriaSucursal> {}
