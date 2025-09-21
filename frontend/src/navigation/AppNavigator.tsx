
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => (state.user as UserState).isAuthenticated);

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
