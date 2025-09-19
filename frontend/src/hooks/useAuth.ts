import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, loading, error, token } = useSelector((state: RootState) => state.auth);

  return {
    user,
    loading,
    error,
    token,
    login: (username: string, password: string) => {
      dispatch(loginStart());
      // In a real implementation, you would call an API here
      // For now, we'll simulate a successful login
      try {
        dispatch(loginSuccess({
          token: 'fake-token',
          user: { id: 1, username }
        }));
      } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : 'Unknown error'));
      }
    },
    logout: () => dispatch(logout()),
  };
}
