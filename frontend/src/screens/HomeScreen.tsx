import { ProductsState } from '@store/productsSlice';
import React, { useEffect, useState } from 'react';
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
  const { items, loading, error, hasMore } = useSelector((state: RootState) => state.products as ProductsState);
  const user = useSelector((state: RootState) => (state.user as any).user);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('All');

  // Example categories, replace with dynamic if available
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];

  // Note: filtering and sorting handled by backend/Redux thunks now
  
  // Initial load and refresh on filters
  useEffect(() => {
    dispatch(setSearchFilter(search));
    // Don't send 'All' as a category; treat as no filter
    dispatch(setCategoryFilter(category === 'All' ? '' : category));
    dispatch(setSortOrder(sort));
    dispatch<any>(loadProducts());
  }, [search, category, sort]);

  const onEndReached = () => {
    if (!loading && hasMore) {
      dispatch<any>(loadMoreProducts());
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Banner />
      <Text className="text-2xl font-bold mb-2">Products</Text>
      {user && user.role === 'admin' && (
        <Button title="Admin: Manage Products" onPress={() => navigation.navigate('AdminProductManagement')} />
      )}
      <SearchBar value={search} onChangeText={setSearch} />
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
          ListFooterComponent={loading ? (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator color="#2563eb" />
            </View>
          ) : null}
          ListEmptyComponent={<Text>No products found.</Text>}
        />
      )}
    </View>
  );
};

export default HomeScreen;
