
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { login } from '@store/userSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Simulate login, replace with real API call
    dispatch(login({ id: '1', name: 'Demo User', email, role: 'user' }));
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-2">Login</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 12 }} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 16 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
