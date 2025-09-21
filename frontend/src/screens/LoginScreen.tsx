import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Login</Text>
      <Input placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 12 }} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 16 }} />
      <Button title="Login" onPress={() => {}} />
    </View>
  );
};

export default LoginScreen;
