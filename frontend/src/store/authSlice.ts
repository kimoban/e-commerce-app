import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: { id: number; username: string } | null;
  loading: boolean;
  error: string;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = '';
    },
    loginSuccess(state, action: PayloadAction<{ token: string; user: { id: number; username: string } }>) {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.error = '';
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = '';
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
