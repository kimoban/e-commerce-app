import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Skeleton from '../components/Skeleton';
// Removed NativeWind import, using className prop
import { useRoute } from '@react-navigation/native';



const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/products/`;

type Product = {
  id: number;
  name: string;
  price: string | number;
  image: string;
  brand?: string;
  description?: string;
  stock?: number;
};

const ProductDetailScreen = () => {
  const route = useRoute<any>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}${productId}/`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Error loading product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      brand: product.brand,
      quantity: 1,
    }));
    Alert.alert('Success', 'Product added to cart!');
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white px-4 pt-8">
        <Skeleton className="w-full h-64 rounded-lg mb-4" />
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-5 w-1/3 mb-1" />
        <Skeleton className="h-7 w-1/4 mb-2" />
        <Skeleton className="h-5 w-full mb-4" />
        <Skeleton className="h-5 w-1/4 mb-4" />
        <View className="h-12 w-full bg-blue-200 rounded" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 text-base mb-4">{error || 'Product not found'}</Text>
        <TouchableOpacity
          className="bg-blue-600 px-4 py-2 rounded"
          onPress={() => {
            setError('');
            setLoading(true);
            setTimeout(() => {
              fetch(`${API_URL}${productId}/`)
                .then(res => res.json())
                .then(data => setProduct(data))
                .catch(() => setError('Failed to fetch product'))
                .finally(() => setLoading(false));
            }, 300);
          }}
          accessibilityRole="button"
          accessibilityLabel="Retry"
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 36 }}>
        <Image
          source={{ uri: product.image }}
          className="w-full h-64 rounded-xl mb-5 bg-gray-100"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-gray-900 mb-1">{product.name}</Text>
        {product.brand && (
          <Text className="text-base text-gray-500 mb-2">{product.brand}</Text>
        )}
        <Text className="text-xl font-bold text-blue-600 mb-2">${product.price}</Text>
        <Text className="text-base text-gray-700 mb-4">{product.description}</Text>
        <Text className="text-sm text-gray-500 mb-6">Stock: {product.stock ?? 'N/A'}</Text>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg py-3 mt-2 mb-4 items-center"
          onPress={handleAddToCart}
          accessibilityRole="button"
          accessibilityLabel="Add to Cart"
        >
          <Text className="text-white text-base font-bold uppercase tracking-wide">Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductDetailScreen;
