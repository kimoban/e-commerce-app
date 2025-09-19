import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { login, logout } from '../store/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector((state: RootState) => state.auth);

  return {
    user,
    loading,
    error,
    token,
    login: (username: string, password: string) => dispatch(login({ username, password })),
    logout: () => dispatch(logout()),
  };
}
