
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { RootState } from '../store';
import { UserState } from '../store/userSlice';
import AdminProductManagementScreen from '../screens/AdminProductManagementScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator = () => {
  const userState = useSelector((state: RootState) => (state.user as UserState));
  const isAuthenticated = userState.isAuthenticated;
  const user = userState.user;

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Category" component={CategoryScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
          {user && user.role === 'admin' && (
            <Stack.Screen name="AdminProductManagement" component={AdminProductManagementScreen} />
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
