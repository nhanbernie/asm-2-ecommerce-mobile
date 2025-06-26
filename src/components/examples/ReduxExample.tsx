import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser, updateUser } from '@/redux/slices/userSlice';
import { useGetUserQuery, useUpdateUserMutation } from '@/redux/api/userApi';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReduxExample = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { currentUser, isLoading } = useAppSelector((state) => state.user);
  
  const { data: userData, error, isLoading: isQueryLoading } = useGetUserQuery('1', {
    skip: !!currentUser,
  });
  
  const [updateUserMutation, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleLoadUser = () => {
    if (userData) {
      dispatch(setUser(userData));
    }
  };

  const handleUpdateUser = async () => {
    if (currentUser) {
      try {
        const result = await updateUserMutation({
          id: currentUser.id,
          name: 'Updated Name',
          bio: 'Updated bio via RTK Query',
        }).unwrap();
        dispatch(updateUser(result));
      } catch (error) {
        console.error('Update failed:', error);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Redux Toolkit Demo
      </Text>
      
      {isQueryLoading && (
        <Text style={[styles.status, { color: colors.textSecondary }]}>
          Loading user data...
        </Text>
      )}
      
      {error && (
        <Text style={[styles.error, { color: '#FF3B30' }]}>
          Error loading user
        </Text>
      )}
      
      {currentUser ? (
        <View style={[styles.userCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {currentUser.name}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
            {currentUser.email}
          </Text>
          <Text style={[styles.userBio, { color: colors.textSecondary }]}>
            {currentUser.bio}
          </Text>
        </View>
      ) : (
        <Button
          title="Load User Data"
          onPress={handleLoadUser}
          disabled={!userData}
        />
      )}
      
      {currentUser && (
        <Button
          title={isUpdating ? 'Updating...' : 'Update User'}
          onPress={handleUpdateUser}
          disabled={isUpdating}
          variant="secondary"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  status: {
    textAlign: 'center',
    marginVertical: 10,
  },
  error: {
    textAlign: 'center',
    marginVertical: 10,
  },
  userCard: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 10,
  },
  userBio: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ReduxExample;
