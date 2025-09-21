
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice.js';
import cartReducer, { setCart } from './cartSlice.js';
import userReducer, { setUser } from './userSlice.js';
import wishlistReducer, { setWishlist } from './wishlistSlice.js';
import ordersReducer from './ordersSlice.js';
import { loadData } from '../utils/storage.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
});

// Hydrate persisted state on app start
export const hydrateState = async () => {
  const cart = await loadData('cart');
  if (cart) store.dispatch(setCart(cart));
  const wishlist = await loadData('wishlist');
  if (wishlist) store.dispatch(setWishlist(wishlist));
  const user = await loadData('user');
  if (user) store.dispatch(setUser(user));
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
