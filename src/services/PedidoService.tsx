import { ISucursalDTO } from "../types/dto";
import { IPedido } from "../types/pedido";
import { BackendClient } from "./BackendClient";

export class PedidoService extends BackendClient<IPedido> {
  filterBySucursal = async (
    pedidos: IPedido[],
    sucursalId: number
  ): Promise<IPedido[]> => {
    const pedidosSucursal = pedidos.filter((pedido) =>
      pedido.sucursal?.some((s) => s.id === sucursalId)
    );

    return pedidosSucursal;
  };

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
