// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { ICategoria, ISucursal } from "../types/empresa";
import { BackendClient } from "./BackendClient";

// Clase SucursalService que extiende BackendClient para interactuar con la API de personas
export class SucursalService extends BackendClient<ISucursal> {
  filterByEmpresaId = (sucursales: ISucursal[], id: number): ISucursal[] => {
    return sucursales.filter((s) => s.empresa!.id == id);
  };

  async getCategorias(id: number): Promise<ICategoria[]> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}/categorias`);
      if (!response.ok) {
        throw new Error(`Error fetching categorias: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching categorias:", error);
      throw error;
    }
  }
}
