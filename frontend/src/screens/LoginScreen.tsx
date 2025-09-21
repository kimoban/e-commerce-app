
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { login } from '@store/userSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const isValid = email.trim().length > 0 && password.trim().length >= 6;

  const handleLogin = () => {
    // Simulate login, replace with real API call
    dispatch(login({ id: '1', name: 'Demo User', email, role: 'user' }));
  };

  return (
    <View className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md">
            <Text className="text-3xl font-extrabold text-center text-brand-primary">Welcome back</Text>
            <Text className="text-center text-gray-500 mt-1">Sign in to continue to EComShop</Text>

            <View className="mt-6">
              <Text className="mb-1 text-gray-700 font-medium">Email</Text>
              <Input
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                accessibilityLabel="Email address"
                style={{ marginBottom: 12 }}
              />

              <Text className="mb-1 text-gray-700 font-medium">Password</Text>
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password"
                style={{ marginBottom: 4 }}
              />

              <TouchableOpacity accessibilityRole="button" accessibilityLabel="Forgot password" className="self-end mt-1">
                <Text className="text-brand-primary font-medium">Forgot password?</Text>
              </TouchableOpacity>

              <Button title="Login" onPress={handleLogin} disabled={!isValid} style={{ marginTop: 16 }} />

              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-600">New here? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')} accessibilityRole="button" accessibilityLabel="Create an account">
                  <Text className="text-brand-primary font-semibold">Create an account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
