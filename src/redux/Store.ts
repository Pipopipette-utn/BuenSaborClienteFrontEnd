import { configureStore } from "@reduxjs/toolkit/react";
import CartReducer from "./slices/CartSlice";
import SelectedDataReducer from "./slices/SelectedData";
const store = configureStore({
    reducer:{ 
        cart: CartReducer,
        selectedData: SelectedDataReducer,
    }
    
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;