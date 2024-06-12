import { configureStore } from "@reduxjs/toolkit/react";
import CartReducer from "./slices/CartSlice";
import SelectedDataReducer from "./slices/SelectedData";
import { loadState } from "../utils/localStorage";
import auhtReducer from "./slices/Auth";

const store = configureStore({
    reducer:{ 
        cart: CartReducer,
        selectedData: SelectedDataReducer,
        user: auhtReducer,
    },
  });

  export default store;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;