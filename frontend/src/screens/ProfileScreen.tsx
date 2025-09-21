import React from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { UserState } from '../store/userSlice';
import Button from '../components/Button';
import { logout } from '../store/userSlice';

const ProfileScreen = () => {
  const user = useSelector((state: RootState) => (state.user as UserState).user);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Profile</Text>
      {user ? (
        <>
          <Text style={{ marginBottom: 8 }}>Name: {user.name}</Text>
          <Text style={{ marginBottom: 8 }}>Email: {user.email}</Text>
          <Button title="Logout" onPress={() => dispatch(logout())} style={{ marginTop: 16 }} />
        </>
      ) : (
        <Text>No user info available.</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
