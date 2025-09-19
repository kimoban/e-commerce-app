/// <reference types="nativewind/types" />
import React from 'react';
import { View, Text } from 'react-native';

export default function TailwindSmoke() {
  return (
    <View className="p-4">
      <Text className="text-2xl font-bold text-blue-600">Tailwind is working</Text>
      <View className="mt-3 h-4 w-full bg-gray-200 rounded">
        <View className="h-4 w-1/2 bg-green-500 rounded" />
      </View>
    </View>
  );
}
