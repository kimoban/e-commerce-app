import React, { useState } from 'react';
import { View, Text, Image, TextInput, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Button from '../components/Button';

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
  const [reviews, setReviews] = useState(initialReviews);
  const [reviewText, setReviewText] = useState('');

  const handleAddReview = () => {
    if (reviewText.trim() && user) {
      setReviews([...reviews, { id: `r${reviews.length + 1}`, user: user.name, text: reviewText }]);
      setReviewText('');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Image source={{ uri: product.image }} style={{ width: '100%', height: 200, borderRadius: 12, marginBottom: 16 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>{product.name}</Text>
      <Text style={{ color: '#2563eb', fontWeight: 'bold', marginBottom: 8 }}>${product.price.toFixed(2)}</Text>
      <Text style={{ marginBottom: 12 }}>{product.description}</Text>
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
