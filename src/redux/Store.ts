import { configureStore } from "@reduxjs/toolkit/react";
import CartReducer from "./slices/CartSlice";

const store = configureStore({
    reducer:{ 
        cart: CartReducer,
    }
    
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;