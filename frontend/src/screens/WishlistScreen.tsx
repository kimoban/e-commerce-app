import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Button from '../components/Button';
import { removeFromWishlist } from '../store/wishlistSlice';


const WishlistScreen = () => {
  const { items, loading, error } = useSelector((state: RootState) => (state.wishlist as any));
  const dispatch = useDispatch();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Loading wishlist...</Text>
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
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Wishlist</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Button title="Remove" onPress={() => dispatch(removeFromWishlist(item.id))} style={{ marginLeft: 8 }} />
          </View>
        )}
        ListEmptyComponent={<Text>Your wishlist is empty.</Text>}
      />
    </View>
  );
};

export default WishlistScreen;
