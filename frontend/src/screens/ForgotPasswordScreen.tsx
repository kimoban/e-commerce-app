import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { forgotPassword } from '@services/auth';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const emailValid = /.+@.+\..+/.test(email.trim());

  const handleReset = () => {
    if (!emailValid || loading) return;
    setLoading(true);
    setError(null);
    forgotPassword(email)
      .then(() => {
        navigation.navigate('ResetLinkSent');
      })
      .catch((e) => setError(e.message || 'Something went wrong'))
      .finally(() => setLoading(false));
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
      {error && <Text className="text-red-600 mb-3">{error}</Text>}
      <Button title={loading ? 'Sending…' : 'Send reset link'} onPress={handleReset} disabled={!emailValid || loading} />
      {loading && (
        <View className="mt-3"><ActivityIndicator /></View>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;