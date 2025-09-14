import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';


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
          <Text className="text-base mb-2">Username: <Text className="font-semibold">{user.username}</Text></Text>
          <TouchableOpacity
            className="bg-blue-600 py-3 px-8 rounded mt-6"
            onPress={handleLogout}
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-gray-500">Not logged in.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
