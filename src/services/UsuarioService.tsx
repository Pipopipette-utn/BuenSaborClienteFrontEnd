// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { IUsuario } from "../types/usuario";
import { BackendClient } from "./BackendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class UsuarioService extends BackendClient<IUsuario> {}
