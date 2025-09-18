import React, { useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { MaterialIcons } from '@expo/vector-icons';


const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRemove = (id: number) => dispatch(removeFromCart(id));
  const handleQuantity = (id: number, quantity: number) => dispatch(updateQuantity({ id, quantity }));
  const handleClear = () => dispatch(clearCart());

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      <View className="bg-white px-4 pt-4 flex-1">
        <Text className="text-2xl font-bold mb-4 text-orange-600">My Cart</Text>
        {cart.length === 0 ? (
          <View className="items-center mt-16">
            <Text className="text-gray-500 text-base mb-4 text-center">Your cart is empty.</Text>
            <View className="bg-orange-100 rounded-full w-32 h-32 items-center justify-center">
              <MaterialIcons name="shopping-cart" size={48} color="#FF9900" />
            </View>
          </View>
        ) : (
          <>
            <FlatList
              data={cart}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Animated.View style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  shadowColor: '#232F3E',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.12,
                  shadowRadius: 6,
                  marginBottom: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <View className="flex-row items-center flex-1">
                    <Image source={{ uri: item.image || 'https://img.icons8.com/color/96/000000/product.png' }} style={{ width: 48, height: 48, borderRadius: 12, marginRight: 12 }} />
                    <View>
                      <Text className="font-semibold text-base mb-1 text-gray-900">{item.name}</Text>
                      <Text className="text-xs text-gray-500 mb-1">{item.brand}</Text>
                      <Text className="text-orange-600 font-bold text-base">${item.price}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <TouchableOpacity
                      className="px-2 py-1 bg-orange-100 rounded-l"
                      onPress={() => handleQuantity(item.id, Math.max(1, item.quantity - 1))}
                      activeOpacity={0.7}
                    >
                      <Text className="text-lg text-orange-600">-</Text>
                    </TouchableOpacity>
                    <Text className="px-3 text-base text-gray-900">{item.quantity}</Text>
                    <TouchableOpacity
                      className="px-2 py-1 bg-orange-100 rounded-r"
                      onPress={() => handleQuantity(item.id, item.quantity + 1)}
                      activeOpacity={0.7}
                    >
                      <Text className="text-lg text-orange-600">+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    className="ml-4 px-2 py-1 bg-red-500 rounded"
                    onPress={() => handleRemove(item.id)}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="delete" size={20} color="#fff" />
                  </TouchableOpacity>
                </Animated.View>
              )}
            />
            {/* Discount code input placeholder */}
            <View className="mt-4 mb-2">
              <Text className="text-base font-medium mb-2 text-gray-900">Discount Code</Text>
              <View className="flex-row">
                <View className="flex-1">
                  <View className="bg-gray-100 rounded-lg px-3 py-2">
                    <Text className="text-gray-400">[Enter code]</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-orange-500 rounded-lg px-4 ml-2 justify-center" activeOpacity={0.8}>
                  <Text className="text-white font-semibold">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Cart summary */}
            <View className="bg-orange-50 rounded-lg p-4 mb-4">
              <Text className="text-base mb-1 text-gray-900">Subtotal: <Text className="font-bold">${subtotal.toFixed(2)}</Text></Text>
              <Text className="text-base mb-1 text-gray-900">Shipping: <Text className="font-bold">${shipping.toFixed(2)}</Text></Text>
              <Text className="text-lg font-bold text-orange-600">Total: ${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              className="bg-orange-500 py-4 rounded-lg mb-2"
              onPress={() => {}}
              activeOpacity={0.85}
            >
              <Text className="text-center text-white font-semibold text-lg">Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-300 py-3 rounded-lg mt-2"
              onPress={handleClear}
              activeOpacity={0.85}
            >
              <Text className="text-center text-gray-700 font-semibold">Clear Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Animated.View>
  );
};

export default CartScreen;
