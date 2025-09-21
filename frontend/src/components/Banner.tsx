import React from 'react';
import { View, Text } from 'react-native';

const Banner: React.FC = () => {
  return (
    <View className="w-full rounded-xl bg-brand-primary p-4 mb-4">
      <Text className="text-white text-xl font-bold">Welcome to EComShop</Text>
      <Text className="text-white/90">Great deals, curated for you.</Text>
    </View>
  );
};

export default Banner;
