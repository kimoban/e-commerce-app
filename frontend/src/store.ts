import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './store/productsSlice';
import cartReducer from './store/cartSlice';
import userReducer from './store/userSlice';
import wishlistReducer from './store/wishlistSlice';
import ordersReducer from './store/ordersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
