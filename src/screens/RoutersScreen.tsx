import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Store
import { useRouterStore } from '../store/useRouterStore';

// Components
import RouterCard from '../components/ui/RouterCard';
import CollapsibleGroup from '../components/groups/CollapsibleGroup';
import RouterDetailsModal from '../components/modals/RouterDetailsModal';
import { RouterWithHealth } from '../constants/mockRouters';

/**
 * RoutersScreen Component
 * 
 * Main screen for router management
 * Shows routers grouped by location with expandable sections
 * Provides sync functionality to refresh router status
 * Modal for detailed router view and settings
 */
export default function RoutersScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Router store state and actions
  const { 
    routers, 
    routerGroups,
    expandedGroups,
    selectedRouter,
    isLoading,
    lastSyncTime,
    error,
    syncRouters,
    selectRouter,
    groupRoutersByLocation,
    toggleRouterGroup,
    updateRouterSettings
  } = useRouterStore();
  
  // Local state
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Initialize groups on mount
  useEffect(() => {
    groupRoutersByLocation();
  }, [groupRoutersByLocation]);

  // Handle router selection
  const handleRouterPress = (router: RouterWithHealth) => {
    selectRouter(router.id);
    setModalVisible(true);
  };
  
  // Handle manual refresh (pull to refresh)
  const onRefresh = () => {
    setRefreshing(true);
    syncRouters();
    setTimeout(() => setRefreshing(false), 1500); // Match the mock delay
  };

  // Format last sync time
  const getFormattedLastSyncTime = () => {
    if (!lastSyncTime) return 'Never';
    
    try {
      const date = new Date(lastSyncTime);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return 'Unknown';
    }
  };

  // Get total statistics
  const getRouterStats = () => {
    let totalClients = 0;
    let connectedClients = 0;
    let disconnectedClients = 0;
    let routersWithIssues = 0;
    
    routers.forEach(router => {
      totalClients += router.totalClients || 0;
      connectedClients += router.connectedClients || 0;
      disconnectedClients += router.disconnectedClients || 0;
      
      // Check for health issues
      if (
        router.health.cpuUsage > 70 || 
        router.health.memoryUsage > 70 || 
        router.health.temperature > 60
      ) {
        routersWithIssues++;
      }
    });
    
    return { totalClients, connectedClients, disconnectedClients, routersWithIssues };
  };
  
  // Get all statistics
  const stats = getRouterStats();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-2xl font-bold text-gray-800">Routers</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500">Manage your network equipment</Text>
          <View className="flex-row items-center">
            <Text className="text-xs text-gray-400 mr-1">Last sync: {getFormattedLastSyncTime()}</Text>
          </View>
        </View>
      </View>
      
      {/* Statistics Row */}
      <View className="flex-row justify-between px-4 py-3 bg-gray-50 border-y border-gray-200">
        <View className="items-center">
          <Text className="text-sm text-gray-500">Routers</Text>
          <Text className="text-lg font-medium text-gray-800">{routers.length}</Text>
        </View>
        
        <View className="items-center">
          <Text className="text-sm text-gray-500">Clients</Text>
          <Text className="text-lg font-medium text-gray-800">{stats.totalClients}</Text>
        </View>
        
        <View className="items-center">
          <Text className="text-sm text-gray-500">Connected</Text>
          <Text className="text-lg font-medium text-custom-muted-purple">{stats.connectedClients}</Text>
        </View>
        
        <View className="items-center">
          <Text className="text-sm text-gray-500">With Issues</Text>
          <Text className={`text-lg font-medium ${stats.routersWithIssues > 0 ? 'text-custom-deep-burgundy' : 'text-gray-800'}`}>
            {stats.routersWithIssues}
          </Text>
        </View>
      </View>

      {/* Main content */}
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Show loading spinner when syncing */}
        {(isLoading && !refreshing) && (
          <View className="items-center justify-center py-4">
            <ActivityIndicator color="#99627A" size="large" />
            <Text className="text-gray-500 mt-2">Syncing router data...</Text>
          </View>
        )}
        
        {/* Show error message if any */}
        {error && (
          <View className="bg-red-50 p-3 rounded-lg mb-4 border border-red-200">
            <Text className="text-custom-deep-burgundy">
              <Ionicons name="alert-circle" size={16} /> {error}
            </Text>
          </View>
        )}
        
        {/* Group view */}
        {Object.keys(routerGroups).length > 0 ? (
          Object.entries(routerGroups).map(([location, locationRouters]) => (
            <CollapsibleGroup 
              key={location}
              title={location}
              count={locationRouters.length}
              initiallyExpanded={expandedGroups[location] ?? true}
            >
              {locationRouters.map(router => (
                <RouterCard
                  key={router.id}
                  router={router}
                  onPress={handleRouterPress}
                />
              ))}
            </CollapsibleGroup>
          ))
        ) : (
          <View className="items-center justify-center py-12">
            <Text className="text-gray-500">No routers found</Text>
          </View>
        )}
      </ScrollView>
      
      {/* Sync button */}
      <View className="p-4">
        <TouchableOpacity 
          className="bg-custom-muted-purple py-3 rounded-lg flex-row justify-center items-center"
          onPress={() => syncRouters()}
          disabled={isLoading}
        >
          <Ionicons name="sync" size={18} color="white" />
          <Text className="text-white font-medium ml-2">
            {isLoading ? 'Syncing...' : 'Refresh Routers'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Router details modal */}
      <RouterDetailsModal 
        visible={modalVisible}
        router={selectedRouter}
        onClose={() => setModalVisible(false)}
        onSaveSettings={updateRouterSettings}
      />
    </SafeAreaView>
  );
}
