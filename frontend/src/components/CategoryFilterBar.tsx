import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

interface CategoryFilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({ categories, selected, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mb-4"
    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
  >
    {categories.map((cat) => {
      const isSelected = selected === cat;
      return (
        <TouchableOpacity
          key={cat}
          onPress={() => onSelect(cat)}
          accessibilityRole="button"
          accessibilityLabel={`Filter by ${cat}`}
          accessibilityState={{ selected: isSelected }}
          className={`mr-2 px-4 py-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-gray-100'}`}
        >
          <Text className={`font-bold ${isSelected ? 'text-white' : 'text-blue-600'}`}>{cat}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default CategoryFilterBar;
