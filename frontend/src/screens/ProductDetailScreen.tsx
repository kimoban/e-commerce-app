
import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import Button from '../components/Button';
import { addToWishlist, removeFromWishlist } from '../store/wishlistSlice';
import { formatCurrency } from '@utils/currency';

// Simulated product and reviews for demo
const product = {
  id: '1',
  name: 'Demo Product',
  price: 99.99,
  image: 'https://via.placeholder.com/300',
  category: 'Electronics',
  description: 'This is a demo product for display.',
};
const initialReviews = [
  { id: 'r1', user: 'Alice', text: 'Great product!' },
  { id: 'r2', user: 'Bob', text: 'Good value.' },
];


const ProductDetailScreen = () => {
  const isAuthenticated = useSelector((state: RootState) => (state.user as any).isAuthenticated);
  const user = useSelector((state: RootState) => (state.user as any).user);
  const wishlistState = useSelector((state: RootState) => (state.wishlist as any));
  const wishlist = wishlistState.items;
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewText, setReviewText] = useState('');

  const isWishlisted = wishlist.some((item: any) => item.id === product.id);

  const handleAddReview = () => {
    if (reviewText.trim() && user) {
      setReviews([...reviews, { id: `r${reviews.length + 1}`, user: user.name, text: reviewText }]);
      setReviewText('');
    }
  };

  const handleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image }));
    }
  };

  if (wishlistState.loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Loading wishlist...</Text>
      </View>
    );
  }

  if (wishlistState.error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: 'red' }}>Error: {wishlistState.error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Image source={{ uri: product.image }} style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 16 }} />
    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>{product.name}</Text>
  <Text style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>{formatCurrency(product.price)}</Text>
      <Text style={{ marginBottom: 12 }}>{product.description}</Text>
      <Button
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        onPress={handleWishlist}
        style={{ marginBottom: 16 }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.user}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No reviews yet.</Text>}
      />
      {isAuthenticated && (
        <View style={{ marginTop: 16 }}>
          <TextInput
            placeholder="Add a review..."
            value={reviewText}
            onChangeText={setReviewText}
            style={{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 8, marginBottom: 8 }}
          />
          <Button title="Submit Review" onPress={handleAddReview} />
        </View>
      )}
    </View>
  );
};

export default ProductDetailScreen;
