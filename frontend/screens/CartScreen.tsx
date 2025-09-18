import React from 'react';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';


const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => dispatch(removeFromCart(id));
  const handleQuantity = (id: number, quantity: number) => dispatch(updateQuantity({ id, quantity }));
  const handleClear = () => dispatch(clearCart());

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <View className="flex-1 bg-white px-4 pt-4">
      <Text className="text-2xl font-bold mb-4">Cart</Text>
      {cart.length === 0 ? (
        <View className="items-center mt-16">
          <Text className="text-gray-500 text-base mb-4 text-center">Your cart is empty.</Text>
          {/* Empty cart illustration placeholder */}
          <View className="bg-gray-100 rounded-full w-32 h-32 items-center justify-center">
            <Text className="text-gray-400">🛒</Text>
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row items-center bg-gray-50 rounded-lg mb-3 p-3">
                <View className="flex-1">
                  <Text className="font-semibold text-base mb-1">{item.name}</Text>
                  <Text className="text-xs text-gray-500 mb-1">{item.brand}</Text>
                  <Text className="text-blue-600 font-bold text-base">${item.price}</Text>
                </View>
                <View className="flex-row items-center">
                  <TouchableOpacity
                    className="px-2 py-1 bg-gray-200 rounded-l"
                    onPress={() => handleQuantity(item.id, Math.max(1, item.quantity - 1))}
                  >
                    <Text className="text-lg">-</Text>
                  </TouchableOpacity>
                  <Text className="px-3 text-base">{item.quantity}</Text>
                  <TouchableOpacity
                    className="px-2 py-1 bg-gray-200 rounded-r"
                    onPress={() => handleQuantity(item.id, item.quantity + 1)}
                  >
                    <Text className="text-lg">+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  className="ml-4 px-2 py-1 bg-red-500 rounded"
                  onPress={() => handleRemove(item.id)}
                >
                  <Text className="text-white">Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          {/* Discount code input placeholder */}
          <View className="mt-4 mb-2">
            <Text className="text-base font-medium mb-2">Discount Code</Text>
            <View className="flex-row">
              <View className="flex-1">
                <View className="bg-gray-100 rounded-lg px-3 py-2">
                  <Text className="text-gray-400">[Enter code]</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-blue-600 rounded-lg px-4 ml-2 justify-center">
                <Text className="text-white font-semibold">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Cart summary */}
          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-base mb-1">Subtotal: <Text className="font-bold">${subtotal.toFixed(2)}</Text></Text>
            <Text className="text-base mb-1">Shipping: <Text className="font-bold">${shipping.toFixed(2)}</Text></Text>
            <Text className="text-lg font-bold">Total: ${total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            className="bg-green-600 py-4 rounded-lg mb-2"
            onPress={() => {}}
          >
            <Text className="text-center text-white font-semibold text-lg">Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-300 py-3 rounded-lg mt-2"
            onPress={handleClear}
          >
            <Text className="text-center text-gray-700 font-semibold">Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CartScreen;
