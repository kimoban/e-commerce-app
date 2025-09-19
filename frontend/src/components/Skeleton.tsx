import React from 'react';
import { View } from 'react-native';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <View className={`bg-gray-200 rounded animate-pulse ${className || ''}`} />
  );
}
