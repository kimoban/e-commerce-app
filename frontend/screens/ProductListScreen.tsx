import React, { useEffect, useState, useCallback } from 'react';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sort, setSort] = useState<'price_asc' | 'price_desc'>('price_asc');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const fetchProducts = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      let url = `${API_URL}?page=${reset ? 1 : page}&page_size=${PAGE_SIZE}`;
      if (selectedCategory) url += `&category=${selectedCategory}`;
      if (sort === 'price_asc') url += `&ordering=price`;
      if (sort === 'price_desc') url += `&ordering=-price`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      const newProducts = reset ? data.results : [...products, ...data.results];
      setProducts(newProducts);
      setHasMore(!!data.next);
      setPage(reset ? 2 : page + 1);
    } catch (err: any) {
      setError(err.message || 'Error loading products');
    } finally {
      setLoading(false);
      if (reset) setRefreshing(false);
    }
  }, [page, products, loading, selectedCategory, sort]);

  useEffect(() => {
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, sort]);

  const handleLoadMore = () => {
    if (!loading && hasMore) fetchProducts();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts(true);
  };

  return (
    <View className="flex-1 bg-gray-50 px-2 pt-2">
      <CategoryFilterBar selected={selectedCategory} onSelect={id => { setSelectedCategory(id); setPage(1); }} />
      <View className="flex-row mb-2 items-center justify-between">
        <View className="flex-row">
          <TouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full border ${sort === 'price_asc' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setSort('price_asc')}
          >
            <Text className={sort === 'price_asc' ? 'text-white font-semibold' : 'text-gray-700'}>Price: Low-High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-4 py-2 mr-2 rounded-full border ${sort === 'price_desc' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setSort('price_desc')}
          >
            <Text className={sort === 'price_desc' ? 'text-white font-semibold' : 'text-gray-700'}>Price: High-Low</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row">
          <TouchableOpacity
            className={`px-3 py-2 rounded border ${viewType === 'grid' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setViewType('grid')}
          >
            <Text className={viewType === 'grid' ? 'text-white font-semibold' : 'text-gray-700'}>Grid</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`ml-2 px-3 py-2 rounded border ${viewType === 'list' ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
            onPress={() => setViewType('list')}
          >
            <Text className={viewType === 'list' ? 'text-white font-semibold' : 'text-gray-700'}>List</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Product count display */}
      <Text className="mb-2 text-gray-600">{products.length} products found</Text>
      {error ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 text-base mb-4">{error}</Text>
          <TouchableOpacity
            className="bg-blue-600 px-4 py-2 rounded"
            onPress={() => fetchProducts(true)}
            accessibilityRole="button"
            accessibilityLabel="Retry"
          >
            <Text className="text-white font-semibold">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : loading && products.length === 0 ? (
        <View className="mt-4">
          {[...Array(6)].map((_, i) => (
            <ProductCard key={i} loading />
          ))}
        </View>
      ) : products.length === 0 ? (
        <View className="flex-1 items-center justify-center mt-16">
          <Text className="text-gray-500 text-base mb-4">No products found.</Text>
          <View className="bg-gray-100 rounded-full w-32 h-32 items-center justify-center">
            <Text className="text-gray-400">📦</Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(_, idx) => idx.toString()}
          numColumns={viewType === 'grid' ? 2 : 1}
          renderItem={({ item }) => (
            <View className={viewType === 'grid' ? 'flex-1 m-1' : 'w-full mb-2'}>
              <ProductCard
                product={item}
                onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
              />
              {/* Quick add to cart placeholder */}
              <TouchableOpacity className="bg-green-600 rounded-lg py-2 mt-2 items-center">
                <Text className="text-white font-semibold">Quick Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={loading && !refreshing ? <ActivityIndicator size="large" color="#2563eb" /> : null}
        />
      )}
    </View>

  );
};

export default ProductListScreen;
