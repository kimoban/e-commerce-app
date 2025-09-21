import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import Button from '../components/Button';
import { CartState } from '../store/cartSlice';
import { formatCurrency } from '@utils/currency';

const CartScreen = () => {
  const items = useSelector((state: RootState) => (state.cart as CartState).items);
  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ flex: 1 }}>{item.name} x{item.quantity}</Text>
            <Text style={{ color: '#2563eb', fontWeight: 'bold' }}>{formatCurrency(item.price * item.quantity)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Your cart is empty.</Text>}
      />
      <View style={{ marginTop: 16 }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total: {formatCurrency(total)}</Text>
        <Button title="Checkout" onPress={() => {}} style={{ marginTop: 12 }} />
      </View>
    </View>
  );
};

export default CartScreen;
