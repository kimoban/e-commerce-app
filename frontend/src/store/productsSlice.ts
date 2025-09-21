
import { createSlice } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
