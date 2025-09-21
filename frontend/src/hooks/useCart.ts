import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const useCart = () => {
  const items = useSelector((state: RootState) => (state.cart as any).items);
  return { items };
};
