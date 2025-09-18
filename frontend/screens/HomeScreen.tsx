
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Hero Gradient Banner */}
      <View style={{ height: 180, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' }} className="mb-6">
        <View style={{ position: 'absolute', width: '100%', height: '100%', background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)' }} />
        <View className="flex-1 justify-center items-center">
          <Text className="text-white text-3xl font-bold mb-2 mt-8">E-Com Shop</Text>
          <Text className="text-white text-base mb-2">Find your favorite products</Text>
          <Image source={{ uri: 'https://img.icons8.com/color/96/000000/shopping-cart.png' }} style={{ width: 48, height: 48 }} />
        </View>
      </View>
      {/* Modern Search Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-white rounded-xl shadow-md px-4 py-3">
          <MaterialIcons name="search" size={24} color="#2563eb" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search products..."
            placeholderTextColor="#888"
          />
        </View>
      </View>
      {/* Categories Bar with Icons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 mb-6">
        {[
          { name: 'Electronics', icon: <MaterialIcons name="devices" size={20} color="#2563eb" /> },
          { name: 'Fashion', icon: <FontAwesome5 name="tshirt" size={18} color="#2563eb" /> },
          { name: 'Home', icon: <MaterialIcons name="home" size={20} color="#2563eb" /> },
          { name: 'Beauty', icon: <MaterialIcons name="spa" size={20} color="#2563eb" /> },
          { name: 'Sports', icon: <MaterialIcons name="sports-soccer" size={20} color="#2563eb" /> },
          { name: 'Toys', icon: <MaterialIcons name="toys" size={20} color="#2563eb" /> },
        ].map((cat) => (
          <TouchableOpacity key={cat.name} className="bg-blue-50 rounded-full px-5 py-2 mr-3 flex-row items-center shadow-sm">
            {cat.icon}
            <Text className="text-blue-700 font-medium ml-2">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Featured Products Card Layout Placeholder */}
      <View className="px-6 mb-8">
        <Text className="text-xl font-bold mb-3 text-gray-900">Featured Products</Text>
        <View className="flex-row">
          {[1, 2, 3].map((i) => (
            <View key={i} className="bg-white rounded-xl shadow-md mr-4 p-4 w-44 items-center justify-center">
              <Image source={{ uri: 'https://img.icons8.com/color/96/000000/product.png' }} style={{ width: 64, height: 64 }} />
              <Text className="text-gray-900 font-semibold mt-2">Product {i}</Text>
              <Text className="text-blue-600 font-bold">$99.99</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Main Navigation Buttons */}
      <View className="px-6">
        <TouchableOpacity
          className="bg-blue-600 rounded-xl py-4 mb-4 w-full items-center shadow-md"
          onPress={() => navigation.navigate('Products')}
          activeOpacity={0.85}
        >
          <Text className="text-white font-semibold text-lg">Browse Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-600 rounded-xl py-4 mb-4 w-full items-center shadow-md"
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.85}
        >
          <Text className="text-white font-semibold text-lg">View Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-800 rounded-xl py-4 w-full items-center shadow-md"
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.85}
        >
          <Text className="text-white font-semibold text-lg">Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;