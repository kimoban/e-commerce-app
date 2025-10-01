import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  jwt?: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  jwt: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setJwt(state, action: PayloadAction<string | null | undefined>) {
      state.jwt = action.payload ?? null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.jwt = null;
    },
    register(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setUser(state, action: PayloadAction<UserState>) {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated && action.payload.user !== null;
      state.jwt = action.payload.jwt ?? null;
    },
  },
});

export const { login, logout, register, setUser, setJwt } = userSlice.actions;
export default userSlice.reducer;
