
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import Skeleton from './Skeleton';



type ProductCardProps = {
  product?: {
    name: string;
    price: string | number;
    image: string;
    brand?: string;
  };
  onPress?: () => void;
  loading?: boolean;
};

export default function ProductCard({ product, onPress, loading }: ProductCardProps) {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      layout={Layout.springify()}
    >
      <TouchableOpacity disabled={loading} onPress={onPress} className="w-full mb-3" testID="product-card">
        <View className="flex-row bg-white rounded-lg shadow-lg elevation-3 p-3 items-center">
          {loading ? (
            <Skeleton className="w-20 h-20 rounded mr-4" />
          ) : (
            <Image
              source={{ uri: product?.image }}
              className="w-20 h-20 rounded mr-4 bg-gray-100"
              resizeMode="cover"
            />
          )}
          <View className="flex-1 ml-2">
            {loading ? (
              <>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-5 w-16" />
              </>
            ) : (
              <>
                <Text className="text-base font-semibold text-gray-900 mb-1">{product?.name}</Text>
                {product?.brand && (
                  <Text className="text-xs text-gray-500 mb-1">{product.brand}</Text>
                )}
                <Text className="text-base font-bold text-blue-600">${product?.price}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}