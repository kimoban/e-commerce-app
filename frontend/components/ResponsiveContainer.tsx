import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, style }) => (
  <View style={[styles.container, style]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 1200,
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
});

export default ResponsiveContainer;
