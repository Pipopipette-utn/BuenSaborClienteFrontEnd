import { configureStore } from "@reduxjs/toolkit/react";
import CartReducer from "./slices/CartSlice";
import SelectedDataReducer from "./slices/SelectedData";
import LocationReducer from "./slices/Location"
import UbiReducer from "./slices/Ubi"
import AuthReducer from "./slices/Auth"
const store = configureStore({
    reducer:{ 
        cart: CartReducer,
        selectedData: SelectedDataReducer,
        location: LocationReducer,
        ubicacion: UbiReducer,
        user: AuthReducer,
    }
  });

  export default store;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;