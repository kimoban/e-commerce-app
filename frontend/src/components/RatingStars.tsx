import React from 'react';
import { View, Text } from 'react-native';

interface RatingStarsProps {
  rating: number;
  max?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, max = 5 }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {[...Array(max)].map((_, i) => (
      <Text key={i} style={{ color: i < rating ? '#facc15' : '#d1d5db', fontSize: 18 }}>★</Text>
    ))}
  </View>
);

export default RatingStars;
