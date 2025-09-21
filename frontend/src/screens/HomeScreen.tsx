import { ProductsState } from '../store/productsSlice';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilterBar from '../components/CategoryFilterBar';

type RootStackParamList = {
  Home: undefined;
  AdminProductManagement: undefined;
  // Add other routes here as needed
};

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { items, loading, error } = useSelector((state: RootState) => state.products as ProductsState);
  const user = useSelector((state: RootState) => (state.user as any).user);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('All');

  // Example categories, replace with dynamic if available
  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty'];

  const filtered = items
    .filter((p: any) =>
      (category === 'All' || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) => sort === 'asc' ? a.price - b.price : b.price - a.price);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Products</Text>
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
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard {...item} onPress={() => {}} />
          )}
          ListEmptyComponent={<Text>No products found.</Text>}
        />
      )}
    </View>
  );
};

export default HomeScreen;
