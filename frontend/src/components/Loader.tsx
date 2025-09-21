import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#2563eb" />
  </View>
);

export default Loader;
