import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, padding: 16, marginBottom: 16 }}>
    <Image source={{ uri: image }} style={{ width: '100%', height: 160, borderRadius: 12 }} resizeMode="cover" />
    <Text style={{ marginTop: 8, fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
    <Text style={{ color: '#2563eb', fontWeight: '600' }}>${price.toFixed(2)}</Text>
  </TouchableOpacity>
);

export default ProductCard;
