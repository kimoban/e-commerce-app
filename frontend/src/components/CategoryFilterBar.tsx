import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

interface CategoryFilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({ categories, selected, onSelect }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
    <View className="flex-row">
      {categories.map((cat) => {
        const isSelected = selected === cat;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            className={`mr-2 px-4 py-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}
          >
            <Text className={`font-bold ${isSelected ? 'text-white' : 'text-blue-600'}`}>{cat}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </ScrollView>
);

export default CategoryFilterBar;
