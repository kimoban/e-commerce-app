import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const HomeScreen = () => {
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const filtered = items
    .filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a: any, b: any) => sort === 'asc' ? a.price - b.price : b.price - a.price);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Products</Text>
      <SearchBar value={search} onChangeText={setSearch} />
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
