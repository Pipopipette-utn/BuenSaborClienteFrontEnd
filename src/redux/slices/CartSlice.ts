import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Instrumento, PedidoDetalle } from '../../types/types';
import { RootState } from '../Store';
import { IDetallePedido } from '../../types/pedido';
import { IArticulo, IArticuloManufacturado, IArticuloManufacturadoDetalle } from '../../types/empresa';

// Define el estado inicial del carrito
interface CartState {
  items: IDetallePedido[];
}

const initialState: CartState = {
  items: [],
};

// Crea un slice para el carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IArticulo>) => {
      const articulo = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === articulo.id);
      if (existingItemIndex !== -1) {
        // Si el artículo ya está en el carrito, aumenta la cantidad en lugar de agregar un nuevo elemento
        state.items[existingItemIndex].cantidad += 1;
      } else {
        // Si el artículo no está en el carrito, agrégalo con cantidad inicial 1
        state.items.push({
            articulo: articulo, 
            cantidad: 1,
            baja: false
        });
      }
    },
    reduceItem: (state, action: PayloadAction<IArticulo>) => {
      const articulo = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === articulo.id);
      if (existingItemIndex !== -1) {
        const item = state.items[existingItemIndex];
        if (item.cantidad > 1) {
          item.cantidad -= 1;
        } else {
          state.items.splice(existingItemIndex, 1);
        }
      }
    },
    removeItem: (state, action: PayloadAction<IArticulo>) => {
      const articulo = action.payload;
      state.items = state.items.filter(item => item.id !== articulo.id);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { addItem, reduceItem, removeItem, clearItems } = cartSlice.actions;

// Exporta el reductor
export default cartSlice.reducer;