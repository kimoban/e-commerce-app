import React from 'react';
import { View, Text, ImageBackground, Platform } from 'react-native';

const Banner: React.FC = () => {
  const isWeb = Platform.OS === 'web';
  const bgSource = isWeb
    ? require('@assets/images/background image web.png')
    : require('@assets/images/background image mobile.png');
  return (
    <ImageBackground
      source={bgSource}
      resizeMode="cover"
      imageStyle={{ borderRadius: 12 }}
      className="w-full rounded-xl overflow-hidden mb-4"
    >
      <View className="bg-black/40 p-4 rounded-xl">
        <Text className="text-white text-xl font-bold">Welcome to EComShop</Text>
        <Text className="text-white/90">Great deals, curated for you.</Text>
      </View>
    </ImageBackground>
  );
};

export default Banner;
