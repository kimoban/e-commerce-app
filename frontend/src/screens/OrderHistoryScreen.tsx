
import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const OrderHistoryScreen = () => {
  const { orders, loading, error } = useSelector((state: RootState) => (state.orders as any));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16, padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>Order #{item.id}</Text>
            <Text>Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Total: ${item.total.toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No orders found.</Text>}
      />
    </View>
  );
};

export default OrderHistoryScreen;
