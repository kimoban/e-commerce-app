
import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import productsReducer, { setCategory, setSearch, setSort } from './productsSlice';
import cartReducer, { setCart } from './cartSlice';
import userReducer, { setUser, login as loginAction, logout as logoutAction, register as registerAction } from './userSlice';
import wishlistReducer, { setWishlist } from './wishlistSlice';
import ordersReducer from './ordersSlice';
import { loadData, saveData } from '../utils/storage';

// Persist filters to AsyncStorage when they change
const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(setCategory, setSearch, setSort),
  effect: async (_action, api) => {
    const state = api.getState() as any;
    const { category, search, sort } = state.products || {};
    try {
      await saveData('filters', { category: category ?? '', search: search ?? '', sort: sort ?? 'asc' });
    } catch (_) {
      // ignore persistence errors
    }
  },
});

// Persist user on auth changes
listenerMiddleware.startListening({
  matcher: isAnyOf(loginAction, registerAction, logoutAction),
  effect: async (_action, api) => {
    const state = api.getState() as any;
    const userState = state.user as { user: any; isAuthenticated: boolean };
    try {
      await saveData('user', userState);
    } catch (_) {
      // ignore persistence errors
    }
  },
});

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Hydrate persisted state on app start
export const hydrateState = async () => {
  const cart = await loadData('cart');
  if (cart) store.dispatch(setCart(cart));
  const wishlist = await loadData('wishlist');
  if (wishlist) store.dispatch(setWishlist(wishlist));
  const user = await loadData('user');
  if (user) store.dispatch(setUser(user));
  const filters = await loadData('filters');
  if (filters) {
    if (typeof filters.category === 'string') store.dispatch(setCategory(filters.category));
    if (typeof filters.search === 'string') store.dispatch(setSearch(filters.search));
    if (filters.sort === 'asc' || filters.sort === 'desc') store.dispatch(setSort(filters.sort));
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { hydrateState as _hydrateState };
