
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { register } from '../store/userSlice';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleRegister = () => {
    // Simulate registration, replace with real API call
    dispatch(register({ id: '2', name, email, role: 'user' }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Register</Text>
      <Input placeholder="Name" value={name} onChangeText={setName} style={{ marginBottom: 12 }} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 12 }} />
      <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 16 }} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
