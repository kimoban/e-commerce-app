import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import type { RootState } from '../store';

export default function LoginScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    dispatch(loginStart());
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      const data = await response.json();
      dispatch(loginSuccess({ token: data.access, user: { id: 0, username } }));
      Alert.alert('Success', 'Logged in!');
      navigation.replace('Main');
    } catch (err: any) {
      dispatch(loginFailure(err.message || 'Login failed'));
      setErrorMsg(err.message || 'Login failed');
    }
  };

  return (
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <View className="w-full max-w-md">
        <Text className="text-2xl font-bold mb-6 text-center">Sign In</Text>
        <TextInput
          className="border border-gray-300 rounded px-4 py-3 mb-4"
          placeholder="Email or Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <View className="relative mb-6">
          <TextInput
            className="border border-gray-300 rounded px-4 py-3"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={() => setShowPassword((v) => !v)}
          >
            <Text className="text-blue-600 font-semibold">{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
        {/* Inline error message */}
        {errorMsg ? (
          <Text className="text-red-500 text-center mb-2">{errorMsg}</Text>
        ) : null}
        <TouchableOpacity
          className="bg-blue-600 py-3 rounded mb-4"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" testID="loading-indicator" />
          ) : (
            <Text className="text-white text-center font-semibold">Sign In</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text className="text-blue-500 text-center mb-2">Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text className="text-blue-600 text-center">Don't have an account? Register</Text>
        </TouchableOpacity>
        <View className="my-6 flex-row items-center justify-center">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-gray-400">or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>
        <TouchableOpacity className="bg-red-500 py-3 rounded mb-3">
          <Text className="text-white text-center font-semibold">Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-800 py-3 rounded">
          <Text className="text-white text-center font-semibold">Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
