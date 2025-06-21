import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useClientStore } from '../store/useClientStore';
import { mockRouters } from '../constants/mockClients';

// Components
import SearchBar from '../components/ui/SearchBar';
import FilterChip from '../components/ui/FilterChip';
import ClientCard from '../components/ui/ClientCard';
import EditClientModal from '../components/modals/EditClientModal';

/**
 * ClientsScreen Component
 * 
 * Main screen for viewing and managing PPPoE clients
 * Includes search, filtering, and client card interactions
 */
export default function ClientsScreen() {
  // State for selected client and modal visibility
  const [selectedClient, setSelectedClient] = useState<null | any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Access client store
  const {
    clients,
    filters,
    isLoading,
    setSearchTerm,
    setRouterFilter,
    setStatusFilter,
    setExpirationFilter,
    resetFilters,
    getFilteredClients,
    updateClient,
    setClientConnection,
  } = useClientStore();
  
  // Get filtered clients based on current filters
  const filteredClients = getFilteredClients();
  
  // Handle search input
  const handleSearch = useCallback((text: string) => {
    setSearchTerm(text);
  }, [setSearchTerm]);
  
  // Clear search field
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, [setSearchTerm]);
  
  // Handle client card press (open edit modal)
  const handleClientPress = useCallback((client: any) => {
    setSelectedClient(client);
    setModalVisible(true);
  }, []);
  
  // Handle client disable via swipe action
  const handleDisableClient = useCallback((client: any) => {
    setClientConnection(client.id, client.routerId, false);
  }, [setClientConnection]);
  
  // Handle saving client changes
  const handleSaveClient = useCallback((updatedClient: any) => {
    updateClient(updatedClient.id, updatedClient);
    setModalVisible(false);
  }, [updateClient]);
  
  // Handle modal close
  const handleModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  // Render header with search and filters
  const renderHeader = () => (
    <View className="px-4 pt-2 pb-4 mt-4">
      {/* Search bar */}
      <SearchBar
        value={filters.searchTerm}
        onChangeText={handleSearch}
        onClear={clearSearch}
        placeholder="Search by name or ID..."
      />
      
      {/* Filter section title */}
      <View className="flex flex-row justify-between items-center mt-4 mb-2">
        <Text className="font-medium text-gray-700">Filters</Text>
        {(filters.routerFilter || filters.statusFilter !== 'all' || filters.expirationFilter !== 'all') && (
          <TouchableOpacity onPress={resetFilters}>
            <Text className="font-medium text-custom-muted-purple">Reset</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Router filters */}
      <Text className="mb-1 text-xs text-gray-500">Router</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
        <FilterChip
          label="All Routers"
          isSelected={filters.routerFilter === null}
          onPress={() => setRouterFilter(null)}
        />
        {mockRouters.map(router => (
          <FilterChip
            key={router.id}
            label={router.name}
            isSelected={filters.routerFilter === router.id}
            onPress={() => setRouterFilter(router.id)}
          />
        ))}
      </ScrollView>
      
      {/* Status filters */}
      <Text className="mb-1 text-xs text-gray-500">Status</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
        <FilterChip
          label="All Status"
          isSelected={filters.statusFilter === 'all'}
          onPress={() => setStatusFilter('all')}
        />
        <FilterChip
          label="Connected"
          isSelected={filters.statusFilter === 'connected'}
          onPress={() => setStatusFilter('connected')}
          customActiveColor="bg-custom-muted-purple"
        />
        <FilterChip
          label="Disconnected"
          isSelected={filters.statusFilter === 'disconnected'}
          onPress={() => setStatusFilter('disconnected')}
          customActiveColor="bg-custom-dusty-rose"
        />
      </ScrollView>
      
      {/* Expiration filters */}
      <Text className="mb-1 text-xs text-gray-500">Expiration</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
        <FilterChip
          label="All"
          isSelected={filters.expirationFilter === 'all'}
          onPress={() => setExpirationFilter('all')}
        />
        <FilterChip
          label="Expiring Soon"
          isSelected={filters.expirationFilter === 'expiring-soon'}
          onPress={() => setExpirationFilter('expiring-soon')}
          customActiveColor="bg-yellow-500"
        />
        <FilterChip
          label="Expired"
          isSelected={filters.expirationFilter === 'expired'}
          onPress={() => setExpirationFilter('expired')}
          customActiveColor="bg-red-500"
        />
      </ScrollView>
    </View>
  );

  // Render empty state when no clients are found
  const renderEmptyState = () => (
    <View className="flex flex-1 justify-center items-center p-4">
      <Ionicons name="people-outline" size={48} color="#99627A" />
      <Text className="mt-2 text-base font-medium text-gray-800">No clients found</Text>
      <Text className="mt-1 text-sm text-center text-gray-500">
        Try adjusting your filters or search term
      </Text>
      <TouchableOpacity 
        className="px-4 py-2 mt-4 rounded-full bg-custom-muted-purple"
        onPress={resetFilters}
      >
        <Text className="font-medium text-white">Reset Filters</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          {/* Screen Header */}
          <View className="px-4 py-6 bg-white" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3
          }}>
            <Text className="text-2xl font-bold text-custom-deep-burgundy">Clients</Text>
            <Text className="text-gray-500">Manage your PPPoE clients</Text>
          </View>
          
          {isLoading ? (
            <View className="flex flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#99627A" />
              <Text className="mt-2 text-gray-600">Loading clients...</Text>
            </View>
          ) : (
            <FlatList
              data={filteredClients}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="px-4">
                  <ClientCard 
                    client={item} 
                    onPress={handleClientPress}
                    onDisable={handleDisableClient}
                  />
                </View>
              )}
              ListHeaderComponent={renderHeader}
              ListEmptyComponent={renderEmptyState}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          )}
        </View>
        
        {/* Edit Client Modal */}
        <EditClientModal
          visible={modalVisible}
          client={selectedClient}
          onClose={handleModalClose}
          onSave={handleSaveClient}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
