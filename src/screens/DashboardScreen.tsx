import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  RefreshControl, 
  SafeAreaView,
  Animated
} from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';

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
    routers: <MaterialIcons name="router" size={24} color="#643843" />,
    clients: <MaterialIcons name="people" size={24} color="#643843" />,
    connected: <MaterialIcons name="wifi" size={24} color="#643843" />,
    expiring: <MaterialIcons name="timer" size={24} color="#643843" />,
    addClient: <MaterialIcons name="person-add" size={20} color="#FFFFFF" />,
    addRouter: <MaterialIcons name="add-circle" size={20} color="#FFFFFF" />,
    fab: <MaterialIcons name="add" size={28} color="#FFFFFF" />
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
        <Text className="text-2xl font-bold text-custom-deep-burgundy">Dashboard</Text>
        <Text className="text-sm text-gray-500">
          PPPoE Management System
        </Text>
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
          <Text className="mb-3 text-lg font-bold text-custom-muted-purple">
            Summary
          </Text>
          
          <View className="p-2">
            {/* First row */}
            <View className="flex flex-row mb-4">
              <View className="flex-1 mr-2">
                <SummaryCard
                  title="Total Routers"
                  value={summary.totalRouters}
                  icon={icons.routers}
                />
              </View>
              <View className="flex-1 ml-2">
                <SummaryCard
                  title="Total Clients"
                  value={summary.totalClients}
                  icon={icons.clients}
                />
              </View>
            </View>
            
            {/* Second row */}
            <View className="flex flex-row">
              <View className="flex-1 mr-2">
                <SummaryCard
                  title="Connected Clients"
                  value={summary.connectedClients}
                  icon={icons.connected}
                />
              </View>
              <View className="flex-1 ml-2">
                <SummaryCard
                  title="Expiring Soon"
                  value={summary.expiringSoon}
                  icon={icons.expiring}
                  bgColor="bg-custom-light-pink"
                />
              </View>
            </View>

          </View>
        </View>
        
        {/* Action Buttons Section */}
        <View className="mb-6">
          <Text className="mb-3 text-lg font-medium text-custom-muted-purple">
            Quick Actions
          </Text>
          
          <View className="flex flex-row space-x-3">
            <View className="flex-1">
              <ActionButton
                label="Add New Client"
                onPress={addClient}
                icon={icons.addClient}
              />
            </View>
            
            <View className="flex-1">
              <ActionButton
                label="Add New Router"
                onPress={addRouter}
                icon={icons.addRouter}
                variant="secondary"
              />
            </View>
          </View>
        </View>
        
        {/* Charts Section */}
        <View>
          <Text className="mb-3 text-lg font-medium text-custom-muted-purple">
            Analytics
          </Text>
          
          <ClientStatusPieChart data={clientStatus} />
          <PaymentStatusBarChart data={paymentStatus} />
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
