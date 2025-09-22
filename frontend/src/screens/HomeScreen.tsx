import { ProductsState } from '@store/productsSlice';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, ActivityIndicator, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// Update the import path if your store file is named differently or located elsewhere
import { RootState } from '@store'; // or update to the correct path, e.g., '../store/index'
import { logout } from '@store/userSlice';

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

  // Fixed categories for horizontal bar on web (aligned with mock image mapping)
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Accessories', 'Automotive'];

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

  // Build a combined data list with a sticky controls row as the first item
  const stickyControls = { __type: 'sticky' as const, id: '__sticky__' };
  const dataCombined: any[] = [stickyControls, ...items];

  return (
    <View className="flex-1 bg-white p-4" style={{ minHeight: 0 }}>
      <View className="flex-1" style={{ minHeight: 0 }}>
        <FlatList
          data={dataCombined}
          keyExtractor={(item: any) => (item?.__type === 'sticky' ? item.id : item.id)}
          renderItem={({ item }: any) => (
            item?.__type === 'sticky' ? (
              <View style={{ backgroundColor: 'white' }}>
                <CategoryFilterBar categories={categories} selected={category} onSelect={setCategory} />
                <View className="flex-row mb-3">
                  <TouchableOpacity onPress={() => setSort('asc')} className="mr-2">
                    <Text className={`${sort === 'asc' ? 'text-brand-primary' : 'text-gray-500'} font-bold`}>Price: Low to High</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSort('desc')}>
                    <Text className={`${sort === 'desc' ? 'text-brand-primary' : 'text-gray-500'} font-bold`}>Price: High to Low</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ProductCard {...item} onPress={() => {}} />
            )
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListFooterComponent={renderFooter}
          stickyHeaderIndices={[1]}
          ListHeaderComponent={(
            <View>
              {/* Top bar: user badge and sign out */}
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xl font-semibold">EComShop</Text>
                {user ? (
                  <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-brand-primary/10 items-center justify-center mr-2">
                      <Text className="text-brand-primary font-bold" accessibilityLabel={`Logged in as ${user.name}`}>
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => dispatch(logout())} accessibilityRole="button" accessibilityLabel="Sign out">
                      <Text className="text-red-600 font-semibold">Sign out</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <Banner />
              {/* Minimal error banner for 401 Unauthorized */}
              {typeof (error) === 'string' && /unauthorized|401/i.test(error) && (
                <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                  <Text className="text-red-700 mb-2">Your session has expired. Please sign in again.</Text>
                  <View className="flex-row">
                    <TouchableOpacity onPress={() => navigation.navigate('Login' as any)} accessibilityRole="button" accessibilityLabel="Sign in again">
                      <Text className="text-brand-primary font-semibold">Sign in again</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <Text className="text-2xl font-bold mb-2">Products</Text>
              {user && user.role === 'admin' && (
                <Button title="Admin: Manage Products" onPress={() => navigation.navigate('AdminProductManagement')} />
              )}
              <SearchBar value={searchInput} onChangeText={setSearchInput} />
            </View>
          )}
          ListEmptyComponent={
            <Text className="text-gray-600">
              {error ? String(error) : 'No products found.'}
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default HomeScreen;
