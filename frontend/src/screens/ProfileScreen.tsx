import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { UserState } from '@store/userSlice';
import Button from '@components/Button';
import { logout } from '@store/userSlice';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => (state.user as UserState).user);
  const dispatch = useDispatch();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-2">Profile</Text>
      {user ? (
        <>
          <Text className="mb-2">Name: {user.name}</Text>
          <Text className="mb-2">Email: {user.email}</Text>
          <Button title="Logout" onPress={() => dispatch(logout())} style={{ marginTop: 16 }} />
        </>
      ) : (
        <Text>No user info available.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
