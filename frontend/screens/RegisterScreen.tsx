import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default function RegisterScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = async () => {
    setErrorMsg('');
    if (!username || !email || !password || !confirmPassword) {
      setErrorMsg('Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMsg('You must accept the terms and conditions.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!response.ok) throw new Error('Registration failed');
      Alert.alert('Success', 'Account created! Please log in.');
      navigation.replace('Login');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">Register</Text>
      <TextInput
        className="border border-gray-300 rounded px-4 py-3 mb-4"
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="border border-gray-300 rounded px-4 py-3 mb-4"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View className="relative mb-4">
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
      <TextInput
        className="border border-gray-300 rounded px-4 py-3 mb-4"
        placeholder="Confirm Password"
        secureTextEntry={!showPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {/* Inline error message */}
      {errorMsg ? (
        <Text className="text-red-500 text-center mb-2">{errorMsg}</Text>
      ) : null}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          className={`w-5 h-5 mr-2 rounded border ${acceptedTerms ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}
          onPress={() => setAcceptedTerms((v) => !v)}
        >
          {acceptedTerms ? <Text className="text-white text-center">✓</Text> : null}
        </TouchableOpacity>
        <Text className="text-gray-700">I accept the Terms and Conditions</Text>
      </View>
      <TouchableOpacity
        className="bg-blue-600 py-3 rounded mb-4"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center font-semibold">Register</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text className="text-blue-600 text-center">Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
