
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import TailwindSmoke from '../components/TailwindSmoke';
import { useNavigation, NavigationProp } from '@react-navigation/native';



type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  ProductDetail: undefined;
  Cart: undefined;
  Profile: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <ScrollView className="flex-1 bg-white px-6" contentContainerStyle={{ paddingBottom: 24 }}>
      <TailwindSmoke />
      {/* Search Bar */}
      <View className="mt-6 mb-4">
        <TextInput
          className="bg-gray-100 rounded-lg px-4 py-3 text-base"
          placeholder="Search products..."
          placeholderTextColor="#888"
        />
      </View>
      {/* Categories Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        {['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Toys'].map((cat) => (
          <TouchableOpacity key={cat} className="bg-blue-100 rounded-full px-5 py-2 mr-3">
            <Text className="text-blue-700 font-medium">{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Featured Products Carousel Placeholder */}
      <View className="mb-8">
        <Text className="text-xl font-bold mb-3">Featured Products</Text>
        <View className="bg-gray-200 rounded-lg h-32 items-center justify-center">
          <Text className="text-gray-500">[Product Carousel Coming Soon]</Text>
        </View>
      </View>
      <Text className="text-3xl font-bold mb-10 text-center">Welcome to E-Com Shop!</Text>
      <TouchableOpacity
        className="bg-blue-600 rounded-lg py-4 mb-4 w-full items-center"
        onPress={() => navigation.navigate('Products')}
        activeOpacity={0.85}
      >
        <Text className="text-white font-semibold text-lg">Browse Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-green-600 rounded-lg py-4 mb-4 w-full items-center"
        onPress={() => navigation.navigate('Cart')}
        activeOpacity={0.85}
      >
        <Text className="text-white font-semibold text-lg">View Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-gray-800 rounded-lg py-4 w-full items-center"
        onPress={() => navigation.navigate('Profile')}
        activeOpacity={0.85}
      >
        <Text className="text-white font-semibold text-lg">Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;