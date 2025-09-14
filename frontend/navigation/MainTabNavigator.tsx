import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
  <Tab.Navigator
    screenOptions={({
      route,
    }: {
      route: import('@react-navigation/native').RouteProp<
        Record<string, object | undefined>,
        string
      >;
    }) => ({
      tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
        let iconName = 'home';
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'Products') iconName = 'pricetags';
        else if (route.name === 'Cart') iconName = 'cart';
        else if (route.name === 'Profile') iconName = 'person';
        return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} accessibilityLabel={route.name + ' tab'} />;
      },
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        height: 64,
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarLabelStyle: {
        fontSize: 13,
        fontWeight: '600',
      },
      headerShown: false,
    })}
  >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
