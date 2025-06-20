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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { secondaryColor } = useThemeStore();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Routers') {
            iconName = focused ? 'router' : 'router-wireless';
          } else if (route.name === 'Clients') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          if (focused) {
            return (
              <View style={{
                backgroundColor: secondaryColor,
                borderRadius: 8,
                paddingVertical: 15,
                width: 65,
                height: 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name={iconName} size={size-1} color="#FFFFFF" />
              </View>
            );
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: ({ focused, color, children }) => {
          return (
            <Text style={{ 
              color: focused ? '#FFFFFF' : color, 
              fontSize: 12,
              fontWeight: focused ? '500' : 'normal',
              marginTop: focused ? 0 : undefined
            }}>
              {children}
            </Text>
          );
        },
        tabBarStyle: {
          height: 90,
          paddingBottom: 0,
          paddingTop: 0,
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
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Routers" component={RoutersScreen} />
      <Tab.Screen name="Clients" component={ClientsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
