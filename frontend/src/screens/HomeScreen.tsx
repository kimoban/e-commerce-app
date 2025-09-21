import { ProductsState } from '@store/productsSlice';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Update the import path if your store file is named differently or located elsewhere
import { RootState } from '@store'; // or update to the correct path, e.g., '../store/index'

import ProductCard from '@components/ProductCard';
import SearchBar from '@components/SearchBar';
import CategoryFilterBar from '@components/CategoryFilterBar';
import Banner from '@components/Banner';
import { loadMoreProducts, loadProducts, setCategory as setCategoryFilter, setSearch as setSearchFilter, setSort as setSortOrder } from '@store/productsSlice';

type RootStackParamList = {
  Home: undefined;
  AdminProductManagement: undefined;
  // Add other routes here as needed
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { items, loading, error, hasMore, category: storeCategory, sort: storeSort, search: storeSearch } = useSelector((state: RootState) => state.products as ProductsState);
  const user = useSelector((state: RootState) => (state.user as any).user);
  const [searchInput, setSearchInput] = useState(storeSearch || '');
  const [debouncedSearch, setDebouncedSearch] = useState(storeSearch || '');
  const dispatch = useDispatch();
  const [sort, setSort] = useState<'asc' | 'desc'>(storeSort || 'asc');
  const [category, setCategory] = useState(storeCategory || 'All');
  const syncedFromStoreRef = useRef(false);
  const [refreshing, setRefreshing] = useState(false);

  // Example categories, replace with dynamic if available
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];

  // Note: filtering and sorting handled by backend/Redux thunks now

  // Debounce search input to reduce requests
  useEffect(() => {
    const handle = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(handle);
  }, [searchInput]);

  // One-time sync from store after hydration/navigation so UI reflects persisted filters
  useEffect(() => {
    if (syncedFromStoreRef.current) return;
    const shouldSync = (
      (storeSearch ?? '') !== (debouncedSearch ?? '') ||
      (storeCategory ?? 'All') !== (category ?? 'All') ||
      (storeSort ?? 'asc') !== (sort ?? 'asc')
    );
    if (shouldSync) {
      setSearchInput(storeSearch || '');
      setDebouncedSearch(storeSearch || '');
      setCategory(storeCategory || 'All');
      setSort(storeSort || 'asc');
      syncedFromStoreRef.current = true;
    }
  }, [storeSearch, storeCategory, storeSort]);
  
  // Initial load and refresh on filters
  useEffect(() => {
    dispatch(setSearchFilter(debouncedSearch));
    // Don't send 'All' as a category; treat as no filter
    dispatch(setCategoryFilter(category === 'All' ? '' : category));
    dispatch(setSortOrder(sort));
    dispatch<any>(loadProducts());
  }, [debouncedSearch, category, sort]);

  const onEndReached = () => {
    if (!loading && hasMore) {
      dispatch<any>(loadMoreProducts());
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // Reset to first page and reload via filters already in state
    await dispatch<any>(loadProducts());
    setRefreshing(false);
  };

  const renderFooter = () => {
    if (loading && items.length > 0) {
      return (
        <View style={{ paddingVertical: 16 }}>
          <ActivityIndicator color="#2563eb" />
        </View>
      );
    }
    if (!hasMore && items.length > 0) {
      return (
        <View style={{ paddingVertical: 16, alignItems: 'center' }}>
          <Text style={{ color: '#6b7280' }}>You have reached the end</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Banner />
      <Text className="text-2xl font-bold mb-2">Products</Text>
      {user && user.role === 'admin' && (
        <Button title="Admin: Manage Products" onPress={() => navigation.navigate('AdminProductManagement')} />
      )}
  <SearchBar value={searchInput} onChangeText={setSearchInput} />
      <CategoryFilterBar categories={categories} selected={category} onSelect={setCategory} />
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => setSort('asc')} style={{ marginRight: 8 }}>
          <Text style={{ color: sort === 'asc' ? '#2563eb' : '#6b7280', fontWeight: 'bold' }}>Price: Low to High</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSort('desc')}>
          <Text style={{ color: sort === 'desc' ? '#2563eb' : '#6b7280', fontWeight: 'bold' }}>Price: High to Low</Text>
        </TouchableOpacity>
      </View>
      {error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard {...item} onPress={() => {}} />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={<Text>No products found.</Text>}
        />
      )}
    </View>
  );
};

export default HomeScreen;
