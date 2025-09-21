import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}


export interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setWishlistLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setWishlistError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlistLoading, setWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
