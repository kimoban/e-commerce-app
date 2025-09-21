import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const useAuth = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => (state.user as any));
  return { user, isAuthenticated };
};
