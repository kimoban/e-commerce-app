import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

interface CategoryFilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({ categories, selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: selected === cat ? '#2563eb' : '#f3f4f6',
            marginRight: 8,
          }}
        >
          <Text style={{ color: selected === cat ? '#fff' : '#2563eb', fontWeight: 'bold' }}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </ScrollView>
);

export default CategoryFilterBar;
