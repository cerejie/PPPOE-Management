import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/navigation';

// Apply NativeWind styles globally
import 'nativewind';

export default function App() {
  return (
    <AuthProvider children={
      <View className="flex-1">
        <Navigation />
        <StatusBar style="auto" />
      </View>
    }>
    </AuthProvider>
  );
}
