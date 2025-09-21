import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Order {
  id: string;
  date: string;
  items: Array<{ id: string; name: string; quantity: number; price: number }>;
  total: number;
  status: string;
}


export interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};


const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    setOrdersLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setOrdersError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { addOrder, setOrdersLoading, setOrdersError } = ordersSlice.actions;
export default ordersSlice.reducer;
