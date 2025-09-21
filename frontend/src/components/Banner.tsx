import React from 'react';
import { View, Text, ImageBackground, Platform, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Banner: React.FC = () => {
  const isWeb = Platform.OS === 'web';
  const { width } = useWindowDimensions();
  const isNarrow = width < 640; // Tailwind md breakpoint ~640px
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
      {/* Overlay: on native keep semi-transparent black; on web add gentle gradient */}
      {isWeb ? (
        <LinearGradient
          colors={["rgba(0,0,0,0.20)", "rgba(0,0,0,0.45)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16, borderRadius: 12 }}
        >
          <View className={isNarrow ? 'items-center' : 'items-start'}>
            <Text className="text-white text-xl font-bold">Welcome to EComShop</Text>
            <Text className="text-white/90">Great deals, curated for you.</Text>
          </View>
        </LinearGradient>
      ) : (
        <View className="bg-black/40 p-4 rounded-xl">
          <Text className="text-white text-xl font-bold text-center">Welcome to EComShop</Text>
          <Text className="text-white/90 text-center">Great deals, curated for you.</Text>
        </View>
      )}
    </ImageBackground>
  );
};

export default Banner;
