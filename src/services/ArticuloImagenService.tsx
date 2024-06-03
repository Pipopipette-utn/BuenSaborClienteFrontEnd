// Importamos el tipo de dato IEmpresa y la clase BackendClient
import { IImagen } from "../types/empresa";
import { BackendClient } from "./BackendClient";

// Clase EmpresaService que extiende BackendClient para interactuar con la API de personas
export class ArticuloImagenService extends BackendClient<IImagen> {
  async crearArticuloImagen(
    selectedFiles: FileList,
    idArticulo: number
  ): Promise<any> {
    try {
      // Crear un objeto FormData y agregar los archivos seleccionados
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("uploads", file);
      });
      // Realizar la petición POST para subir los archivos
      const response = await fetch(`${this.baseUrl}/${idArticulo}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
