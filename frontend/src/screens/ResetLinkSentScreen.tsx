import React from 'react';
import { View, Text } from 'react-native';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';

const ResetLinkSentScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      <Text className="text-2xl font-bold mb-2">Check your email</Text>
      <Text className="text-gray-600 text-center mb-6">If an account exists, we sent a password reset link to your email.</Text>
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default ResetLinkSentScreen;