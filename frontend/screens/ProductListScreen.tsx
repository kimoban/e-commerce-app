import React, { useState } from 'react';
import type { AccessibilityRole } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { useQuery } from '@tanstack/react-query';
import { View, Text, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
// Removed styled import, using className prop
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeleton';
import CategoryFilterBar from '../components/CategoryFilterBar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';



const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/products/`;

type Product = {
  id: number;
  name: string;
  price: string | number;
  image: string;
  brand?: string;
};

type RootStackParamList = {
  Main: undefined;
  ProductDetail: { productId: number };
};

const PAGE_SIZE = 10;

const ProductListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sort, setSort] = useState<'price_asc' | 'price_desc'>('price_asc');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async (): Promise<{ results: Product[]; next?: string }> => {
    let url = `${API_URL}?page=${page}&page_size=${PAGE_SIZE}`;
    if (selectedCategory) url += `&category=${selectedCategory}`;
    if (sort === 'price_asc') url += `&ordering=price`;
    if (sort === 'price_desc') url += `&ordering=-price`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  };

  const { data, error, isLoading, refetch } = useQuery<{ results: Product[]; next?: string }>(
    ['products', page, selectedCategory, sort],
    fetchProducts,
    {
      keepPreviousData: true,
    }
  );

  const handleLoadMore = () => {
    const paged = data as { results?: Product[]; next?: string };
    if (paged.next) setPage(page + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => setRefreshing(false));
  };

  return (
    <View className="flex-1 bg-gray-50 px-2 pt-2">
      <CategoryFilterBar
        selected={selectedCategory}
        onSelect={id => { setSelectedCategory(id); setPage(1); }}
        // accessibility props removed (not supported by CategoryFilterBar)
      />
      <View
        className="flex-row mb-2 items-center justify-between"
        // accessibility props removed (not supported by View)
      >
        <View className="flex-row">
          <TouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full border ${sort === 'price_asc' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setSort('price_asc')}
            accessibilityRole={"button" as AccessibilityRole}
            accessibilityLabel="Sort by price low to high"
            testID="sort-low-high"
          >
            <Text className={sort === 'price_asc' ? 'text-white font-semibold' : 'text-gray-700'}>Price: Low-High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full border ${sort === 'price_desc' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setSort('price_desc')}
            accessibilityRole={"button" as AccessibilityRole}
            accessibilityLabel="Sort by price high to low"
            testID="sort-high-low"
          >
            <Text className={sort === 'price_desc' ? 'text-white font-semibold' : 'text-gray-700'}>Price: High-Low</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            className={`px-3 py-2 rounded border ${viewType === 'grid' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setViewType('grid')}
            accessibilityRole={"button" as AccessibilityRole}
            accessibilityLabel="Grid view"
            testID="view-grid"
          >
            <Text className={viewType === 'grid' ? 'text-white font-semibold' : 'text-gray-700'}>Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-2 px-3 py-2 rounded border ${viewType === 'list' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setViewType('list')}
            accessibilityRole={"button" as AccessibilityRole}
            accessibilityLabel="List view"
            testID="view-list"
          >
            <Text className={viewType === 'list' ? 'text-white font-semibold' : 'text-gray-700'}>List</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Product count display */}
  <Text className="mb-2 text-gray-600">{Array.isArray((data as any)?.results) ? (data as any).results.length : 0} products found</Text>
      {error ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 text-base mb-4">{error.message || 'Error loading products'}</Text>
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded"
            onPress={() => refetch()}
            accessibilityRole="button"
            accessibilityLabel="Retry"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
  ) : isLoading && (!Array.isArray((data as any)?.results) || (data as any).results.length === 0) ? (
        <View className="mt-4">
          {[...Array(6)].map((_, i) => (
            <ProductCard key={i} loading />
          ))}
        </View>
  ) : !Array.isArray((data as any)?.results) || (data as any).results.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-16">
          <Text className="text-gray-500 text-base mb-4">No products found.</Text>
          <View className="bg-gray-100 rounded-full w-32 h-32 items-center justify-center">
            <Text className="text-gray-400">📦</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={Array.isArray((data as any)?.results) ? (data as any).results : []}
          keyExtractor={(_, idx) => idx.toString()}
          numColumns={viewType === 'grid' ? 2 : 1}
          renderItem={({ item }) => (
            <Animated.View
              className={viewType === 'grid' ? 'flex-1 m-1' : 'w-full mb-2'}
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
              layout={Layout.springify()}
              // accessibilityRole removed (not supported by Animated.View)
              accessibilityLabel={`Product card for ${item.name}`}
              testID={`product-card-${item.id}`}
            >
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
                accessibilityLabel={`View details for ${item.name}`}
                accessibilityRole={"button" as AccessibilityRole}
                testID={`product-card-btn-${item.id}`}
              />
              {/* Quick add to cart placeholder */}
              <TouchableOpacity
                className="bg-green-600 rounded-lg py-2 mt-2 items-center"
                accessibilityRole={"button" as AccessibilityRole}
                accessibilityLabel={`Quick add ${item.name} to cart`}
                testID={`quick-add-${item.id}`}
              >
                <Text className="text-white font-semibold">Quick Add to Cart</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={isLoading && !refreshing ? <ActivityIndicator size="large" color="#2563eb" /> : null}
          accessibilityLabel="Products list"
          accessibilityRole={"list" as AccessibilityRole}
          testID="products-list"
        />
      )}
    </View>

  );
};

export default ProductListScreen;
