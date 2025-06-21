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
      <View className="px-4 py-6 bg-white" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
      }}>
        <Text className="text-2xl font-bold text-custom-deep-burgundy">Routers</Text>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-gray-500">Manage your network equipment</Text>
          <View className="flex flex-row items-center"> 
            <Text className="mr-1 text-xs text-black">Last sync: {getFormattedLastSyncTime()}</Text>
          </View>
        </View>
      </View>
      
      {/* Statistics Cards - 2x2 Grid */}
      <View className="px-4 mt-4">
        {/* First Row */}
        <View className="flex flex-row justify-between mb-3">
          {/* Routers Card */}
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-muted-purple" 
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 4
            }}
          >
            <View className="flex flex-row items-center mb-2">
              <Ionicons name="hardware-chip-outline" size={20} color="#99627A" />
              <Text className="ml-2 font-medium text-gray-700">Routers</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">{routers.length}</Text>
          </TouchableOpacity>
          
          {/* Clients Card */}
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-dusty-rose" 
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 4
            }}
          >
            <View className="flex flex-row items-center mb-2">
              <Ionicons name="people-outline" size={20} color="#C88EA7" />
              <Text className="ml-2 font-medium text-gray-700">Clients</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800">{stats.totalClients}</Text>
          </TouchableOpacity>
        </View>
          
        {/* Second Row */}
        <View className="flex flex-row justify-between">
          {/* Connected Card */}
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-muted-purple border-solid" 
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 4
            }}
          >
            <View className="flex flex-row items-center mb-2">
              <Ionicons name="checkmark-circle-outline" size={20} color="#643843" />
              <Text className="ml-2 font-medium text-gray-700">Connected</Text>
            </View>
            <Text className="text-2xl font-bold text-custom-muted-purple">{stats.connectedClients}</Text>
          </TouchableOpacity>
          
          {/* Issues Card */}
          <TouchableOpacity 
            activeOpacity={0.7}
            className="w-[48%] p-4 rounded-xl bg-white border-l-4 border-custom-deep-burgundy" 
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 4
            }}
          >
            <View className="flex flex-row items-center mb-2">
              <Ionicons name="warning-outline" size={20} color="#643843" />
              <Text className="ml-2 font-medium text-gray-700">Issues</Text>
            </View>
            <Text className={`text-2xl font-bold ${stats.routersWithIssues > 0 ? 'text-custom-deep-burgundy' : 'text-gray-800'}`}>
              {stats.routersWithIssues}
            </Text>
          </TouchableOpacity>
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
          <View className="flex justify-center items-center py-4">
            <ActivityIndicator color="#99627A" size="large" />
            <Text className="mt-2 text-gray-500">Syncing router data...</Text>
          </View>
        )}
        
        {/* Show error message if any */}
        {error && (
          <View className="p-3 mb-4 bg-red-50 rounded-lg border border-red-200">
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
              initiallyExpanded={expandedGroups[location] ?? false}
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
          <View className="flex justify-center items-center py-12">
            <Text className="text-gray-500">No routers found</Text>
          </View>
        )}
      </ScrollView>
      
      {/* Sync button */}
      <View className="p-4">
        <TouchableOpacity 
          className="flex flex-row justify-center items-center py-3 rounded-lg bg-custom-muted-purple"
          onPress={() => syncRouters()}
          disabled={isLoading}
        >
          <Ionicons name="sync" size={18} color="white" />
          <Text className="ml-2 font-medium text-white">
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
