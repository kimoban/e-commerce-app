
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import { formatCurrency } from '@utils/currency';

const OrderHistoryScreen = () => {
  const { orders, loading, error } = useSelector((state: RootState) => (state.orders as any));

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-2">Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16, padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>Order #{item.id}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: {formatCurrency(item.total)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No orders found.</Text>}
      />
    </View>
  );
};

export default OrderHistoryScreen;
