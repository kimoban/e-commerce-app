import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// Update the import path if your store file is located elsewhere, for example:
// Update the import path if your store file is located elsewhere, for example:
// import { RootState } from '../store/store';
// Or, if your store file is named 'store.ts' in the same directory:
import { RootState } from '../store';
// Make sure '../store' exists and exports RootState.
import { logout } from '../store/authSlice';


const ProfileScreen = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Alert.alert('Logged out', 'You have been logged out.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Profile</Text>
      {user ? (
        <>
          {/* Avatar and Edit Profile */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.usernameText}>Username: <Text style={styles.usernameBold}>{user.username}</Text></Text>
          {/* Address management */}
          <TouchableOpacity style={styles.manageAddressButton}>
            <Text style={styles.manageAddressText}>Manage Addresses</Text>
          </TouchableOpacity>
          {/* Order history placeholder */}
          <View style={styles.orderHistorySection}>
            <Text style={styles.orderHistoryTitle}>Order History</Text>
            <View style={styles.orderHistoryPlaceholder}>
              <Text style={styles.orderHistoryPlaceholderText}>[Order history coming soon]</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.notLoggedInSection}>
          <View style={styles.notLoggedInAvatar}>
            <Text style={styles.notLoggedInAvatarIcon}>👤</Text>
          </View>
          <Text style={styles.notLoggedInText}>Not logged in.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    backgroundColor: '#e5e7eb',
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarIcon: {
    fontSize: 32,
    color: '#6b7280',
  },
  editProfileButton: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginBottom: 8,
  },
  editProfileText: {
    color: '#1d4ed8',
    fontWeight: '500',
  },
  usernameText: {
    fontSize: 16,
    marginBottom: 8,
  },
  usernameBold: {
    fontWeight: '600',
  },
  manageAddressButton: {
    backgroundColor: '#bbf7d0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    marginBottom: 16,
  },
  manageAddressText: {
    color: '#047857',
    fontWeight: '500',
  },
  orderHistorySection: {
    width: '100%',
    marginBottom: 16,
  },
  orderHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderHistoryPlaceholder: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderHistoryPlaceholderText: {
    color: '#9ca3af',
  },
  logoutButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  notLoggedInSection: {
    alignItems: 'center',
  },
  notLoggedInAvatar: {
    backgroundColor: '#f3f4f6',
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  notLoggedInAvatarIcon: {
    fontSize: 32,
    color: '#9ca3af',
  },
  notLoggedInText: {
    color: '#6b7280',
  },
});

export default ProfileScreen;
