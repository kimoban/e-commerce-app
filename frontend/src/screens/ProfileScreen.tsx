import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/index';
import { logout } from '@store/authSlice';


const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Alert.alert('Logged out', 'You have been logged out.');
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold mb-4">Profile</Text>
      {user ? (
        <>
          {/* Avatar and Edit Profile */}
          <View className="items-center mb-4">
            <View className="bg-gray-200 rounded-full w-20 h-20 items-center justify-center mb-2">
              <Text className="text-3xl text-gray-500">👤</Text>
            </View>
            <TouchableOpacity className="bg-blue-100 px-4 py-2 rounded-full mb-2">
              <Text className="text-blue-700 font-medium">Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base mb-2">Username: <Text className="font-semibold">{user.username}</Text></Text>
          {/* Address management */}
          <TouchableOpacity className="bg-green-100 px-4 py-2 rounded-full mb-4">
            <Text className="text-green-700 font-medium">Manage Addresses</Text>
          </TouchableOpacity>
          {/* Order history placeholder */}
          <View className="w-full mb-4">
            <Text className="text-lg font-bold mb-2">Order History</Text>
            <View className="bg-gray-100 rounded-lg h-16 items-center justify-center">
              <Text className="text-gray-400">[Order history coming soon]</Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-blue-600 py-3 px-8 rounded mt-2"
            onPress={handleLogout}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View className="items-center">
          <View className="bg-gray-100 rounded-full w-20 h-20 items-center justify-center mb-2">
            <Text className="text-3xl text-gray-400">👤</Text>
          </View>
          <Text className="text-gray-500">Not logged in.</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
