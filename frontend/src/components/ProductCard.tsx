import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { formatCurrency } from '@utils/currency';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={`${name}, ${formatCurrency(price)}`}
    accessibilityHint="Opens product details"
    className="bg-white rounded-xl p-4 mb-4"
    style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 }}
  >
    <Image source={{ uri: image }} style={{ width: '100%', height: 160, borderRadius: 12 }} resizeMode="cover" />
    <Text className="mt-2 text-lg font-bold">{name}</Text>
  <Text className="text-brand-primary font-semibold">{formatCurrency(price)}</Text>
  </TouchableOpacity>
);

export default ProductCard;
