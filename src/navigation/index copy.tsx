import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen';
import RoutersScreen from '../screens/RoutersScreen';
import ClientsScreen from '../screens/ClientsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useThemeStore } from '../store';

// We'll handle the label directly in the tabBarIcon function now
// So we can remove the separate getConditionalLabel function

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { secondaryColor } = useThemeStore();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let label = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            label = 'Home';
          } else if (route.name === 'Routers') {
            iconName = focused ? 'router' : 'router-wireless';
            label = 'Routers';
          } else if (route.name === 'Clients') {
            iconName = focused ? 'account-group' : 'account-group-outline';
            label = 'Clients';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-outline';
            label = 'Notifications';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
            label = 'Profile';
          }

          if (focused) {
            return (
              <View style={{
                flexDirection: 'row',
                width: 130,
                height: 50,
                backgroundColor: secondaryColor,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}>
                <Icon name={iconName} size={size-1} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500' }}>{label}</Text>
              </View>
            );
          }
          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'gray',
        // We're handling the label in the tabBarIcon function
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 80,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#f4f4f4',
          borderTopWidth: 2,
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: secondaryColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen}
      />
      <Tab.Screen 
        name="Routers" 
        component={RoutersScreen}
      />
      <Tab.Screen 
        name="Clients" 
        component={ClientsScreen}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
    </Tab.Navigator>
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
