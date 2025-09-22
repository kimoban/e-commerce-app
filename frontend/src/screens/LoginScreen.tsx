
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Alert, ActivityIndicator, Dimensions } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import { useDispatch } from 'react-redux';
import { login, setJwt } from '@store/userSlice';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { exchangeProviderToken } from '@services/auth';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [loadingProvider, setLoadingProvider] = useState<null | 'google' | 'facebook'>(null);
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

  // Read public env vars safely in RN + web
  const env = useMemo(() => ((global as any)?.process?.env ?? {}) as Record<string, string | undefined>, []);

  // Google Auth: supply platform-specific IDs (fallback to placeholder to avoid runtime throws)
  const googleIds = {
    ios: env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || 'disabled-ios-google-client-id',
    android: env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || 'disabled-android-google-client-id',
    web: env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || 'disabled-web-google-client-id',
  };
  const googleConfigured = Platform.select({
    android: !!env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    ios: !!env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    default: !!env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  }) as boolean;

  const [gRequest, gResponse, gPromptAsync] = Google.useAuthRequest({
    iosClientId: googleIds.ios,
    androidClientId: googleIds.android,
    webClientId: googleIds.web,
    responseType: ResponseType.Token,
    scopes: ['openid', 'profile', 'email'],
  });

  useEffect(() => {
    const run = async () => {
      if (gResponse?.type === 'success') {
        try {
          setLoadingProvider('google');
          const accessToken = gResponse.authentication?.accessToken;
          if (!accessToken) throw new Error('No access token');
          // Exchange with backend for our JWT
          const exchange = await exchangeProviderToken('google', accessToken);
          dispatch(setJwt(exchange.token));
          const name = exchange.user.name || 'Google User';
          const emailAddr = exchange.user.email || '';
          dispatch(login({ id: exchange.user.id, name, email: emailAddr, role: exchange.user.role || 'user' }));
        } catch (e: any) {
          Alert.alert('Google Sign-in failed', e?.message || 'Please try again.');
        } finally {
          setLoadingProvider(null);
        }
      }
    };
    run();
  }, [gResponse]);

  // Facebook Auth
  const facebookConfigured = !!env.EXPO_PUBLIC_FACEBOOK_APP_ID;
  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: env.EXPO_PUBLIC_FACEBOOK_APP_ID,
    responseType: ResponseType.Token,
    scopes: ['public_profile', 'email'],
  });

  useEffect(() => {
    const run = async () => {
      if (fbResponse?.type === 'success') {
        try {
          setLoadingProvider('facebook');
          const accessToken = fbResponse.authentication?.accessToken;
          if (!accessToken) throw new Error('No access token');
          const exchange = await exchangeProviderToken('facebook', accessToken);
          dispatch(setJwt(exchange.token));
          const name = exchange.user.name || 'Facebook User';
          const emailAddr = exchange.user.email || '';
          dispatch(login({ id: exchange.user.id, name, email: emailAddr, role: exchange.user.role || 'user' }));
        } catch (e: any) {
          Alert.alert('Facebook Sign-in failed', e?.message || 'Please try again.');
        } finally {
          setLoadingProvider(null);
        }
      }
    };
    run();
  }, [fbResponse]);

  const isWeb = Platform.OS === 'web';
  const windowHeight = isWeb ? Dimensions.get('window').height : undefined;
  const __DEV__FLAG = (global as any)?.__DEV__ ?? process.env.NODE_ENV !== 'production';

  return (
    <View className="flex-1 bg-gray-50">
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1" style={{ minHeight: 0 }}>
        <View
          className="flex-1 items-center justify-center px-4"
          style={isWeb ? { minHeight: windowHeight } : undefined}
        >
          <View className="w-full max-w-md bg-white rounded-2xl p-6 shadow-md">
            <View className="items-center mb-3">
              <Image source={require('@assets/icons/logo.png')} style={{ width: 64, height: 64, borderRadius: 12 }} />
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

              {/* Social login options */}
              <View className="mt-4">
                <Text className="text-center text-gray-500 mb-2">Or continue with</Text>
                <View className="flex-row justify-center space-x-4">
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Facebook"
                    className="rounded-full p-2 bg-gray-100"
                    disabled={!facebookConfigured || !!loadingProvider}
                    onPress={() => {
                      if (!fbRequest) return;
                      if (!facebookConfigured) {
                        Alert.alert('Missing configuration', 'FACEBOOK_APP_ID is not set.');
                        return;
                      }
                      fbPromptAsync();
                    }}
                  >
                    {loadingProvider === 'facebook' ? (
                      <ActivityIndicator />
                    ) : (
                      <Image source={require('@assets/images/facebook.png')} style={{ width: 32, height: 32 }} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Continue with Google"
                    className="rounded-full p-2 bg-gray-100"
                    disabled={!googleConfigured || !!loadingProvider}
                    onPress={() => {
                      if (!gRequest) return;
                      if (!googleConfigured) {
                        Alert.alert('Missing configuration', 'Google client ID is not set for this platform.');
                        return;
                      }
                      gPromptAsync();
                    }}
                  >
                    {loadingProvider === 'google' ? (
                      <ActivityIndicator />
                    ) : (
                      <Image source={require('@assets/images/google.png')} style={{ width: 32, height: 32 }} />
                    )}
                  </TouchableOpacity>
                </View>
                {__DEV__FLAG && (
                  <View className="mt-3 items-center">
                    <TouchableOpacity
                      accessibilityRole="button"
                      accessibilityLabel="Test exchange endpoint"
                      className="px-3 py-2 rounded-md bg-yellow-100"
                      onPress={async () => {
                        try {
                          const res = await exchangeProviderToken('google', 'dev-token-livecheck');
                          Alert.alert('Exchange OK', `User: ${res.user.email || res.user.name}`);
                        } catch (e: any) {
                          Alert.alert('Exchange failed', e?.message || 'Unknown error');
                        }
                      }}
                    >
                      <Text className="text-yellow-800">Dev: Test Exchange</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

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
