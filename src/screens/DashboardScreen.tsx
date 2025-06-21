import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  RefreshControl, 
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// Components
import SummaryCard from '../components/ui/SummaryCard';
import ActionButton from '../components/ui/ActionButton';
import FAB from '../components/ui/FAB';
import ClientStatusPieChart from '../components/charts/DashboardCharts/ClientStatusPieChart';
import PaymentStatusBarChart from '../components/charts/DashboardCharts/PaymentStatusBarChart';

// Store
import { useDashboardStore } from '../store/dashboardStore';

/**
 * DashboardScreen Component
 * 
 * Main dashboard screen (home tab) displaying summary metrics, charts,
 * and quick action buttons for the PPPoE management app
 */
const DashboardScreen: React.FC = () => {
  // Get data from store
  const { 
    summary, 
    clientStatus, 
    paymentStatus, 
    refreshData,
    addRouter,
    addClient
  } = useDashboardStore();
  
  // State for pull-to-refresh
  const [refreshing, setRefreshing] = React.useState(false);
  
  // Animation for header
  const headerAnimation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Animate header on mount
    Animated.timing(headerAnimation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API refresh delay
    setTimeout(() => {
      refreshData();
      setRefreshing(false);
    }, 1000);
  }, [refreshData]);
  
  // Icon components
  const icons = {
    routers: <Ionicons name="hardware-chip-outline" size={24} color="#99627A" />,
    clients: <Ionicons name="people-outline" size={24} color="#C88EA7" />,
    connected: <Ionicons name="checkmark-circle-outline" size={24} color="#643843" />,
    expiring: <Ionicons name="time-outline" size={24} color="#EF4444" />,
    addClient: <Ionicons name="person-add-outline" size={22} color="#FFFFFF" />,
    addRouter: <Ionicons name="add-circle-outline" size={22} color="#FFFFFF" />,
    fab: <Ionicons name="add" size={28} color="#FFFFFF" />,
    refresh: <Ionicons name="refresh-outline" size={20} color="#99627A" />,
    analytics: <Ionicons name="stats-chart-outline" size={20} color="#99627A" />
  };

  // Handler for FAB press - Could show a modal with options
  const handleFabPress = () => {
    // In a real app, this would open a modal with options
    console.log('FAB pressed');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <Animated.View 
        className="px-4 py-6 bg-white"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
          opacity: headerAnimation,
          transform: [
            { 
              translateY: headerAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0]
              }) 
            }
          ]
        }}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-custom-deep-burgundy">Dashboard</Text>
            <Text className="text-sm text-gray-500">
              PPPoE Management System
            </Text>
          </View>
          <TouchableOpacity 
            onPress={onRefresh}
            className="p-2 rounded-full bg-gray-100"
          >
            {icons.refresh}
          </TouchableOpacity>
        </View>
      </Animated.View>
      
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#643843']}
            tintColor="#643843"
          />
        }
      >
        {/* Summary Cards Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-custom-muted-purple">
              Summary
            </Text>
            <Text className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 
            </Text>
          </View>
          
          {/* 2x2 Summary Cards Grid */}
          <View>
            {/* First row */}
            <View className="flex-row justify-between mb-3">
              {/* Routers Card */}
              <TouchableOpacity 
                activeOpacity={0.8}
                className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-muted-purple" 
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 4
                }}
              >
                <View className="flex-row items-center mb-2">
                  {icons.routers}
                  <Text className="ml-2 font-medium text-gray-700">Routers</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-800">{summary.totalRouters}</Text>
              </TouchableOpacity>
              
              {/* Clients Card */}
              <TouchableOpacity 
                activeOpacity={0.8}
                className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-dusty-rose" 
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 4
                }}
              >
                <View className="flex-row items-center mb-2">
                  {icons.clients}
                  <Text className="ml-2 font-medium text-gray-700">Clients</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-800">{summary.totalClients}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Second row */}
            <View className="flex-row justify-between">
              {/* Connected Card */}
              <TouchableOpacity 
                activeOpacity={0.8}
                className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-muted-purple" 
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 4
                }}
              >
                <View className="flex-row items-center mb-2">
                  {icons.connected}
                  <Text className="ml-2 font-medium text-gray-700">Connected</Text>
                </View>
                <Text className="text-2xl font-bold text-custom-muted-purple">{summary.connectedClients}</Text>
              </TouchableOpacity>
              
              {/* Expiring Card */}
              <TouchableOpacity 
                activeOpacity={0.8}
                className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-deep-burgundy" 
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 3,
                  elevation: 4
                }}
              >
                <View className="flex-row items-center mb-2">
                  {icons.expiring}
                  <Text className="ml-2 font-medium text-gray-700">Expiring Soon</Text>
                </View>
                <Text className={`text-2xl font-bold ${summary.expiringSoon > 0 ? 'text-custom-deep-burgundy' : 'text-gray-800'}`}>
                  {summary.expiringSoon}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Action Buttons Section */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-medium text-custom-muted-purple">
            Quick Actions
          </Text>
          
          <View className="flex-row justify-between">
            <TouchableOpacity 
              onPress={addClient}
              className="w-[48%] py-4 px-4 rounded-xl bg-custom-deep-burgundy flex-row items-center justify-center" 
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 4
              }}
            >
              {icons.addClient}
              <Text className="ml-2 font-medium text-white">New Client</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={addRouter}
              className="w-[48%] py-4 px-4 rounded-xl bg-custom-muted-purple flex-row items-center justify-center" 
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                elevation: 4
              }}
            >
              {icons.addRouter}
              <Text className="ml-2 font-medium text-white">New Router</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Charts Section */}
        <View>
          <View className="flex-row items-center mb-3">
            <View className="flex-row items-center">
              {icons.analytics}
              <Text className="ml-2 text-lg font-medium text-custom-muted-purple">
                Analytics
              </Text>
            </View>
          </View>
          
          <View className="bg-white rounded-xl p-4 mb-4" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <Text className="text-base font-medium text-gray-800 mb-2">Client Status</Text>
            <ClientStatusPieChart data={clientStatus} />
          </View>
          
          <View className="bg-white rounded-xl p-4 mb-4" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}>
            <Text className="text-base font-medium text-gray-800 mb-2">Payment Status</Text>
            <PaymentStatusBarChart data={paymentStatus} />
          </View>
        </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <FAB
        onPress={handleFabPress}
        icon={icons.fab}
        position="bottomRight"
      />
    </SafeAreaView>
  );
};

export default styled(DashboardScreen);
