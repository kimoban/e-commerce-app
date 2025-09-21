import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const emailValid = /.+@.+\..+/.test(email.trim());

  const handleReset = () => {
    if (!emailValid) return;
    // TODO: Integrate real reset flow
    alert('If this email exists, a reset link will be sent.');
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-2">Reset your password</Text>
      <Text className="text-gray-600 mb-4">Enter your email and we will send you a reset link.</Text>
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
      <Button title="Send reset link" onPress={handleReset} disabled={!emailValid} />
    </View>
  );
};

export default ForgotPasswordScreen;