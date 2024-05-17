// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { IPais } from "../types/ubicacion";
import { BackendClient } from "./BakendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class PaisService extends BackendClient<IPais> {}
