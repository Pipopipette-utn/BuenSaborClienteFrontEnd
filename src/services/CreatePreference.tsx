import PreferenceMP from "../types/PreferenceMP";
import { IPedido } from "../types/pedido";

export async function createPreferenceMP(pedido: IPedido): Promise<PreferenceMP> {
    const { id, fechaPedido, total } = pedido;
    
    const { data, error, status } = await 
      .from('pedidos')
      .insert([
        { id, fechaPedido: fechaPedido.toISOString(), total }
      ]);
  
    if (error) {
      throw new Error(`Failed to insert pedido: ${error.message}`);
    }
  
    const preferenceMP: PreferenceMP = {
      id: data[0].id,
      statusCode: status
    };
  
    return preferenceMP;
  }