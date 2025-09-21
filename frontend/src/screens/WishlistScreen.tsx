import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import Button from '@components/Button';
import { removeFromWishlist } from '@store/wishlistSlice';


const WishlistScreen = () => {
  const { items, loading, error } = useSelector((state: RootState) => (state.wishlist as any));
  const dispatch = useDispatch();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text>Loading wishlist...</Text>
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
      <Text className="text-2xl font-bold mb-2">Wishlist</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center mb-3">
            <Text className="flex-1">{item.name}</Text>
            <Button title="Remove" onPress={() => dispatch(removeFromWishlist(item.id))} style={{ marginLeft: 8 }} />
          </View>
        )}
        ListEmptyComponent={<Text>Your wishlist is empty.</Text>}
      />
    </View>
  );
};

export default WishlistScreen;
