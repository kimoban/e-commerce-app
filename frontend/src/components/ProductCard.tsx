/// <reference types="nativewind/types" />

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import Skeleton from '@components/Skeleton';

import type { AccessibilityRole } from 'react-native';

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

export default function ProductCard({ product, onPress, loading, accessibilityLabel, accessibilityRole, testID }: ProductCardProps & {
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  testID?: string;
}) {
  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(300)}
      layout={Layout.springify()}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      <TouchableOpacity
        disabled={loading}
        onPress={onPress}
        className="w-full mb-3"
        accessibilityLabel={accessibilityLabel}
        accessibilityRole={accessibilityRole ?? 'button'}
        testID={testID}
      >
        <View className="flex-row bg-white rounded-lg shadow-lg elevation-3 p-3 items-center">
          {loading ? (
            <Skeleton className="w-20 h-20 rounded mr-4" />
          ) : (
            <Image
              source={{ uri: product?.image }}
              className="w-20 h-20 rounded mr-4 bg-gray-100"
              resizeMode="cover"
              accessibilityLabel={product?.name ? `Image of ${product.name}` : 'Product image'}
              testID={product?.name ? `product-image-${product.name}` : 'product-image'}
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
                <Text className="text-base font-semibold text-gray-900 mb-1" accessibilityLabel={`Product name: ${product?.name}`}>{product?.name}</Text>
                {product?.brand && (
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }} accessibilityLabel={`Brand: ${product.brand}`}>{product.brand}</Text>
                )}
                <Text className="text-base font-bold text-blue-600" accessibilityLabel={`Price: $${product?.price}`}>${product?.price}</Text>
              </>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}