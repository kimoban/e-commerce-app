
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
    <View className="flex-1 justify-center bg-white px-6">
      <TailwindSmoke />
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
    </View>
  );
};

export default HomeScreen;