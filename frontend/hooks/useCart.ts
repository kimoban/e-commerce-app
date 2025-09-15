import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

export function useCart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  return {
    cart,
    addToCart: (item: any) => dispatch(addToCart(item)),
    removeFromCart: (id: number) => dispatch(removeFromCart(id)),
    updateQuantity: (id: number, quantity: number) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
  };
}
