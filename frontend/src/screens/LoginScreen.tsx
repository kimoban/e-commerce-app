
import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { login } from '@store/userSlice';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const emailValid = /.+@.+\..+/.test(email.trim());
  const passwordValid = password.trim().length >= 6;
  const isValid = emailValid && passwordValid;

  const handleLogin = () => {
    setTouched({ email: true, password: true });
    if (!isValid) return;
    // Simulate login, replace with real API call
    dispatch(login({ id: '1', name: 'Demo User', email, role: 'user' }));
  };

  return (
    <View className="flex-1 bg-gray-50">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <View className="flex-1 items-center justify-center px-4">
          <View className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md">
            <View className="items-center mb-3">
              <Image source={require('@assets/icon.png')} style={{ width: 64, height: 64, borderRadius: 12 }} />
            </View>
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
                onChangeText={(v) => setEmail(v)}
                accessibilityLabel="Email address"
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                style={{ marginBottom: 8, borderColor: touched.email && !emailValid ? '#ef4444' : '#d1d5db' }}
              />
              {touched.email && !emailValid && (
                <Text className="text-red-500 mb-2">Please enter a valid email address.</Text>
              )}

              <Text className="mb-1 text-gray-700 font-medium">Password</Text>
              <Input
                placeholder="••••••••"
                value={password}
                onChangeText={(v) => setPassword(v)}
                secureTextEntry
                accessibilityLabel="Password"
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                style={{ marginBottom: 4, borderColor: touched.password && !passwordValid ? '#ef4444' : '#d1d5db' }}
              />
              {touched.password && !passwordValid && (
                <Text className="text-red-500">Password must be at least 6 characters.</Text>
              )}

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} accessibilityRole="button" accessibilityLabel="Forgot password" className="self-end mt-1">
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
