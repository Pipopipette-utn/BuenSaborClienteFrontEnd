import { IPedidoDTO, ISucursalDTO } from "../types/dto";
import { BackendClient } from "./BackendClient";

export class PedidoService extends BackendClient<IPedidoDTO> {
  async baja(id: number, sucursal: ISucursalDTO) {
    try {
      const response = await fetch(`${this.baseUrl}/baja/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sucursal),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.error(error); // Imprime el error en la consola
    }
  }
}
