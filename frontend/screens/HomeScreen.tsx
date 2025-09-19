
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Animated } from 'react-native';
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
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Hero Gradient Banner */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <View style={{ height: 180, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden', backgroundColor: '#FF9900' }} className="mb-6">
          <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#FF9900', opacity: 0.95 }} />
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-3xl font-bold mb-2 mt-8">E-Com Shop</Text>
            <Text className="text-white text-base mb-2">Find your favorite products</Text>
            <Image source={{ uri: 'https://img.icons8.com/color/96/000000/shopping-cart.png' }} style={{ width: 48, height: 48 }} />
          </View>
        </View>
      </Animated.View>
      {/* Modern Search Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-white rounded-xl shadow-md px-4 py-3 border border-orange-300">
          <MaterialIcons name="search" size={24} color="#FF9900" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search products..."
            placeholderTextColor="#888"
          />
        </View>
      </View>
      {/* Categories Bar with Icons - Vertical Layout for Web */}
      <View className="px-6 mb-6">
        {/* Electronics Section with Images */}
        <View className="bg-orange-100 rounded-xl px-5 py-4 mb-3 flex-col items-start shadow-sm" style={{ borderWidth: 1, borderColor: '#FF9900' }}>
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="devices" size={20} color="#232F3E" />
            <Text className="text-orange-700 font-medium ml-2 text-lg">Electronics</Text>
          </View>
          <View className="flex-row items-center">
            <View style={{ alignItems: 'center', marginRight: 24 }}>
              <Image source={require('../assets/images/Computer.png')} style={{ width: 48, height: 48 }} />
              <Text className="text-xs text-gray-700 mt-2">Computer</Text>
            </View>
            <View style={{ alignItems: 'center', marginRight: 24 }}>
              <Image source={require('../assets/images/headphone.png')} style={{ width: 48, height: 48 }} />
              <Text className="text-xs text-gray-700 mt-2">Headphones</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../assets/images/Smart Watch.jpg')} style={{ width: 48, height: 48 }} />
              <Text className="text-xs text-gray-700 mt-2">Smart Watch</Text>
            </View>
          </View>
        </View>
        {/* Other Categories */}
        {[{ name: 'Fashion', icon: <FontAwesome5 name="tshirt" size={18} color="#232F3E" /> },
          { name: 'Home', icon: <MaterialIcons name="home" size={20} color="#232F3E" /> },
          { name: 'Beauty', icon: <MaterialIcons name="spa" size={20} color="#232F3E" /> },
          { name: 'Sports', icon: <MaterialIcons name="sports-soccer" size={20} color="#232F3E" /> },
          { name: 'Toys', icon: <MaterialIcons name="toys" size={20} color="#232F3E" /> },
        ].map((cat) => (
          <TouchableOpacity
            key={cat.name}
            className="bg-orange-100 rounded-full px-5 py-2 mb-3 flex-row items-center shadow-sm"
            activeOpacity={0.7}
            style={{ transform: [{ scale: 1 }], borderWidth: 1, borderColor: '#FF9900' }}
          >
            {cat.icon}
            <Text className="text-orange-700 font-medium ml-2">{cat.name}</Text>
          </TouchableOpacity>
        ))}
        {/* Social Icons Section */}
        <View className="flex-row items-center mt-4">
          <Image source={require('../assets/images/facebook.png')} style={{ width: 32, height: 32, marginRight: 16 }} />
          <Image source={require('../assets/images/google.png')} style={{ width: 32, height: 32 }} />
        </View>
      </View>
      {/* Featured Products Card Layout Placeholder */}
      <Animated.View style={{ opacity: cardAnim }}>
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold mb-3 text-gray-900">Featured Products</Text>
          <View className="flex-row">
            {[1, 2, 3].map((i) => (
              <Animated.View
                key={i}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  shadowColor: '#232F3E',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 6,
                  marginRight: 16,
                  padding: 16,
                  width: 160,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: [{ scale: cardAnim }],
                }}
              >
                <Image source={{ uri: 'https://img.icons8.com/color/96/000000/product.png' }} style={{ width: 64, height: 64 }} />
                <Text className="text-gray-900 font-semibold mt-2">Product {i}</Text>
                <Text className="text-orange-600 font-bold">$99.99</Text>
              </Animated.View>
            ))}
          </View>
        </View>
      </Animated.View>
      {/* Main Navigation Buttons */}
      <View className="px-6">
        <TouchableOpacity
          className="bg-orange-500 rounded-xl py-4 mb-4 w-full items-center shadow-md"
          onPress={() => navigation.navigate('Products')}
          activeOpacity={0.85}
          style={{ transform: [{ scale: 1 }], borderWidth: 1, borderColor: '#FF9900' }}
        >
          <Text className="text-white font-semibold text-lg">Browse Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-700 rounded-xl py-4 mb-4 w-full items-center shadow-md"
          onPress={() => navigation.navigate('Cart')}
          activeOpacity={0.85}
          style={{ transform: [{ scale: 1 }], borderWidth: 1, borderColor: '#232F3E' }}
        >
          <Text className="text-white font-semibold text-lg">View Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-800 rounded-xl py-4 w-full items-center shadow-md"
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.85}
          style={{ transform: [{ scale: 1 }], borderWidth: 1, borderColor: '#232F3E' }}
        >
          <Text className="text-white font-semibold text-lg">Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;