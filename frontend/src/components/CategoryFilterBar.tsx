import React from 'react';
import { ScrollView, Pressable, Text } from 'react-native';

interface CategoryFilterBarProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const labelWithEmoji = (cat: string) => {
  switch (cat) {
    case 'All':
      return '✨ All';
    case 'Electronics':
      return '🔌 Electronics';
    case 'Fashion':
      return '👗 Fashion';
    case 'Home':
      return '🏠 Home';
    default:
      return cat;
  }
};

const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({ categories, selected, onSelect }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mb-4"
    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
  >
    {categories.map((cat, idx) => {
      const isSelected = selected === cat;
      const isLast = idx === categories.length - 1;
      const base = 'px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95';
      const selectedClasses = 'bg-blue-600 border-2 border-blue-600 shadow-md hover:bg-blue-700';
      const unselectedClasses = 'bg-gray-50 border border-blue-200 hover:bg-gray-200';
      const spacing = isLast ? 'mr-0' : 'mr-3';

      return (
        <Pressable
          key={cat}
          onPress={() => onSelect(cat)}
          accessibilityRole="button"
          accessibilityLabel={`Filter by ${cat}`}
          accessibilityState={{ selected: isSelected }}
          className={`${base} ${spacing} ${isSelected ? selectedClasses : unselectedClasses}`}
        >
          <Text className={`font-bold ${isSelected ? 'text-white' : 'text-blue-700'}`}>{labelWithEmoji(cat)}</Text>
        </Pressable>
      );
    })}
  </ScrollView>
);

export default CategoryFilterBar;
