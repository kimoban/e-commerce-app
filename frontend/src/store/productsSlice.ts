
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ImageSourcePropType } from 'react-native';
import { fetchProducts } from '@services/products';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | ImageSourcePropType;
  category: string;
}

export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  hasMore: boolean;
  category?: string;
  search?: string;
  sort?: 'asc' | 'desc';
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 12,
  hasMore: true,
  category: 'All',
  search: '',
  sort: 'asc',
};


export const loadProducts = createAsyncThunk(
  'products/load',
  async (_: void, { getState }) => {
    const state = getState() as any;
    const { page, pageSize, category, search, sort } = state.products as ProductsState;
    const res = await fetchProducts({ page, pageSize, category, search, sort });
    return res;
  }
);

export const loadMoreProducts = createAsyncThunk(
  'products/loadMore',
  async (_: void, { getState }) => {
    const state = getState() as any;
    const { page, pageSize, category, search, sort } = state.products as ProductsState;
    const res = await fetchProducts({ page: page + 1, pageSize, category, search, sort });
    return res;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
    },
    updateProduct(state, action) {
      const updated = action.payload;
      state.items = state.items.map(p => p.id === updated.id ? updated : p);
    },
    deleteProduct(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
    setSort(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sort = action.payload;
      state.page = 1;
      state.items = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        const newItems = action.payload.items || [];
        state.items = newItems;
        state.page = 1;
        state.hasMore = newItems.length >= state.pageSize;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(loadMoreProducts.pending, (state) => {
        // Use loading to drive a footer spinner if desired
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        const incoming = action.payload.items || [];
        const existingIds = new Set(state.items.map((p) => p.id));
        const merged = [...state.items];
        for (const p of incoming) if (!existingIds.has(p.id)) merged.push(p);
        state.items = merged;
        state.page = state.page + 1;
        state.hasMore = incoming.length >= state.pageSize;
      })
      .addCase(loadMoreProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load more products';
      });
  },
});

export const { addProduct, updateProduct, deleteProduct, setCategory, setSearch, setSort } = productsSlice.actions;
export default productsSlice.reducer;
