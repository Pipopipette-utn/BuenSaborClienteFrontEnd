import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDetallePedido } from '../../types/pedido';
import { IArticulo } from '../../types/empresa';

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
      const existingItemIndex = state.items.findIndex(item => item.articulo.id === articulo.id);
      if (existingItemIndex !== -1) {
        // Si el artículo ya está en el carrito, aumenta la cantidad 
        state.items[existingItemIndex].cantidad += 1;
      } else {
        // Si el artículo no está en el carrito, lo agrega con cantidad inicial 1
        state.items.push({
            articulo: articulo, 
            cantidad: 1,
        });
      }
    },
    //Agrega muchos, pasamos la cantidad como parametro
    addItems: (state, action: PayloadAction<{ articulo: IArticulo; cantidad: number }>) => {
      const { articulo, cantidad } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.articulo.id === articulo.id);
      if (existingItemIndex !== -1) {
        // Si el artículo ya está en el carrito, aumenta la cantidad
        state.items[existingItemIndex].cantidad += cantidad;
      } else {
        // Si el artículo no está en el carrito, lo agrega con la cantidad especificada
        state.items.push({
          articulo: articulo,
          cantidad: cantidad,
         
        });
      }
    },
    reduceItem: (state, action: PayloadAction<IArticulo>) => {
      const articulo = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.articulo.id === articulo.id);
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
      state.items = state.items.filter(item => item.articulo.id !== articulo.id);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { addItem,addItems, reduceItem, removeItem, clearItems } = cartSlice.actions;

// Exporta el reductor
export default cartSlice.reducer;