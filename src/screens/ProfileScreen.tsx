import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function ProfileScreen() {
  const { secondaryColor } = useThemeStore();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: secondaryColor }]}>Profile</Text>
      <Text style={styles.subtitle}>Manage your profile here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
