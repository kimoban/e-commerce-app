import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Category Screen</Text>
    {/* Category products will go here */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryScreen;
