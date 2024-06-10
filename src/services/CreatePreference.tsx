import { baseUrl } from "../App";
import { PreferenceMp } from "../types/PreferenceMP";
import { IPedidoDTO } from "../types/dto";
import { IPedido } from "../types/pedido";

export async function createPreferenceMp(pedido: IPedidoDTO) {
  const response = await fetch(baseUrl + "/mercadoPago/preference_mp", {
    method: "POST",
    body: JSON.stringify(pedido),
    headers: {
      "Content-type": "application/json",
    },
  });
  return (await response.json()) as PreferenceMp;
}
