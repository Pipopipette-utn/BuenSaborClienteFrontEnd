import { configureStore } from "@reduxjs/toolkit/react";

const store = configureStore({
    reducer:{ 
        cart: CartReducer,
    }
    
  });
  
  export default store;
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;