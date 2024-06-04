import { configureStore } from "@reduxjs/toolkit/react";
import CartReducer from "./slices/CartSlice";
import CategoriaReducer from "./slices/CategoriaSlice";
import SelectedDataReducer from "./slices/SelectedData";
const store = configureStore({
    reducer:{ 
        cart: CartReducer,
        categoria: CategoriaReducer,
        selectedData: SelectedDataReducer,
    }
    
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;