import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './store/productsSlice.js';
import cartReducer from './store/cartSlice.js';
import userReducer from './store/userSlice.js';
import wishlistReducer from './store/wishlistSlice.js';
import ordersReducer from './store/ordersSlice.js';

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
