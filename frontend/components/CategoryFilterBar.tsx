import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

export type Category = {
  id: number;
  name: string;
};

interface CategoryFilterBarProps {
  selected: number | null;
  onSelect: (id: number | null) => void;
}

export default function CategoryFilterBar({ selected, onSelect }: CategoryFilterBarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
  fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/categories/`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
      <TouchableOpacity
        className={`px-4 py-2 mr-2 rounded-full border ${selected === null ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
        onPress={() => onSelect(null)}
      >
        <Text className={selected === null ? 'text-white font-semibold' : 'text-gray-700'}>All</Text>
      </TouchableOpacity>
      {categories.map(cat => (
        <TouchableOpacity
          key={cat.id}
          className={`px-4 py-2 mr-2 rounded-full border ${selected === cat.id ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
          onPress={() => onSelect(cat.id)}
        >
          <Text className={selected === cat.id ? 'text-white font-semibold' : 'text-gray-700'}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
