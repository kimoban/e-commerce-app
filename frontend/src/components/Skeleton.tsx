import React from 'react';
import { View } from 'react-native';

interface SkeletonProps {
  height?: number;
  width?: number | string;
  style?: any;
}

const Skeleton: React.FC<SkeletonProps> = ({ height = 20, width = '100%', style }) => (
  <View
    style={[{ backgroundColor: '#d1d5db', borderRadius: 8, height, width }, style]}
  />
);

export default Skeleton;
