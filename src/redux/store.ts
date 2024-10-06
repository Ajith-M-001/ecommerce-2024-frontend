import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/userApi';
import { userReducer } from './reducer/userReducer';
import { ProductApi } from './api/ProductApi';
import { cartReducer } from './reducer/cartReducer';
import { OrderApi } from './api/OrderApi';
import { dashBoardApi } from './api/dashBoardApi';

// export const server = import.meta.env.VITE_SERVER;


export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [dashBoardApi.reducerPath]: dashBoardApi.reducer,

    [userReducer.name] : userReducer.reducer,
    [cartReducer.name] : cartReducer.reducer,
  },
  middleware: (mid) => [...mid(), userApi.middleware,ProductApi.middleware,OrderApi.middleware , dashBoardApi.middleware]
})