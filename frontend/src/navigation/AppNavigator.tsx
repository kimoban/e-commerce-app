
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useSelector } from 'react-redux';
import HomeScreen from '@screens/HomeScreen';
import ProductDetailScreen from '@screens/ProductDetailScreen';
import CategoryScreen from '@screens/CategoryScreen';
import CartScreen from '@screens/CartScreen';
import CheckoutScreen from '@screens/CheckoutScreen';
import ProfileScreen from '@screens/ProfileScreen';
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import ForgotPasswordScreen from '@screens/ForgotPasswordScreen';
import ResetLinkSentScreen from '@screens/ResetLinkSentScreen';
import OrderHistoryScreen from '@screens/OrderHistoryScreen';
import { RootState } from '@store';
import { UserState } from '@store/userSlice';
import AdminProductManagementScreen from '@screens/AdminProductManagementScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
  const userState = useSelector((state: RootState) => (state.user as UserState));
  const isAuthenticated = userState.isAuthenticated && userState.user !== null;
  const user = userState.user;

  // Debug log to help troubleshoot the Expo Go issue
  console.log('AppNavigator - isAuthenticated:', isAuthenticated, 'user:', user?.name || 'null');

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'} screenOptions={{ headerShown: true }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
          <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
          {user && user.role === 'admin' && (
            <Stack.Screen name="AdminProductManagement" component={AdminProductManagementScreen} options={{ title: 'Admin: Products' }} />
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Create Account' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset Password' }} />
          <Stack.Screen name="ResetLinkSent" component={ResetLinkSentScreen} options={{ title: 'Check Your Email' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
