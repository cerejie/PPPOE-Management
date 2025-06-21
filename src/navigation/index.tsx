import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomBottomTabBar from './CustomBottomTabBar';
import DashboardScreen from '../screens/DashboardScreen';
import RoutersScreen from '../screens/RoutersScreen';
import ClientsScreen from '../screens/ClientsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useThemeStore } from '../store';

const Stack = createNativeStackNavigator();

/**
 * Custom Tab Navigator using the new dynamic tab bar
 */
function TabNavigator() {
  const { secondaryColor } = useThemeStore();
  const [activeTab, setActiveTab] = useState('Home');

  // Tab configuration matching your existing screens
  const tabs = [
    {
      key: 'Home',
      label: 'Home',
      iconActive: 'home',
      iconInactive: 'home-outline'
    },
    {
      key: 'Routers',
      label: 'Routers',
      iconActive: 'router',
      iconInactive: 'router-wireless'
    },
    {
      key: 'Clients',
      label: 'Clients',
      iconActive: 'account-group',
      iconInactive: 'account-group-outline'
    },
    {
      key: 'Notifications',
      label: 'Notifications',
      iconActive: 'bell',
      iconInactive: 'bell-outline'
    },
    {
      key: 'Profile',
      label: 'Profile',
      iconActive: 'account',
      iconInactive: 'account-outline'
    }
  ];

  
  // Handle tab press to change screens
  const handleTabPress = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  // Function to render the current screen based on active tab
  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <DashboardScreen />;
      case 'Routers':
        return <RoutersScreen />;
      case 'Clients':
        return <ClientsScreen />;
      case 'Notifications':
        return <NotificationsScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Main content area */}
      {renderScreen()}
      
      {/* Custom Tab Bar */}
      <CustomBottomTabBar
        activeTab={activeTab}
        onTabPress={handleTabPress}
        tabs={tabs}
        activeColor={secondaryColor}
        backgroundColor="#ffffff"
      />
    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
