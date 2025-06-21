import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useClientStore } from '../store/useClientStore';
import { mockRouters } from '../constants/mockClients';

// Components
import SearchBar from '../components/ui/SearchBar';
import DropdownSelect from '../components/ui/DropdownSelect';
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
    <View className="px-4 pt-2 pb-4 mt-2">
      {/* Search bar */}
      <SearchBar
        value={filters.searchTerm}
        onChangeText={handleSearch}
        onClear={clearSearch}
        placeholder="Search by name or ID..."
      />
      
      {/* Filter section title */}
      <View className="flex flex-row justify-between items-center mt-4 mb-4">
        <Text className="font-medium text-gray-700">Filters</Text>
        {(filters.routerFilter || filters.statusFilter !== 'all' || filters.expirationFilter !== 'all') && (
          <TouchableOpacity onPress={resetFilters}>
            <Text className="font-medium text-custom-muted-purple">Reset</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Filter Dropdowns */}
      <View className="mb-4">
        {/* Category labels */}
        <View className="flex-row justify-between mb-2">
          <Text className="text-xs font-medium text-gray-500 ml-1 w-[31%]">Router</Text>
          <Text className="text-xs font-medium text-gray-500 ml-1 w-[31%]">Status</Text>
          <Text className="text-xs font-medium text-gray-500 ml-1 w-[31%]">Expiration</Text>
        </View>
        
        {/* Dropdowns row */}
        <View className="flex-row justify-between">
          {/* Router Dropdown */}
          <DropdownSelect
            label="Router"
            width="w-[31%]"
            selectedValue={filters.routerFilter}
            onSelect={(value) => setRouterFilter(value)}
            options={[
              { label: 'All Routers', value: null },
              ...mockRouters.map(router => ({
                label: router.name,
                value: router.id
              }))
            ]}
          />
          
          {/* Status Dropdown */}
          <DropdownSelect
            label="Status"
            width="w-[31%]"
            selectedValue={filters.statusFilter}
            onSelect={(value) => setStatusFilter(value as 'all' | 'connected' | 'disconnected')}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Connected', value: 'connected', color: '#99627A' },
              { label: 'Disconnected', value: 'disconnected', color: '#C88EA7' }
            ]}
          />
          
          {/* Expiration Dropdown */}
          <DropdownSelect
            label="Expiration"
            width="w-[31%]"
            selectedValue={filters.expirationFilter}
            onSelect={(value) => setExpirationFilter(value as 'all' | 'expiring-soon' | 'expired')}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Expiring Soon', value: 'expiring-soon', color: '#F59E0B' },
              { label: 'Expired', value: 'expired', color: '#EF4444' }
            ]}
          />
        </View>
      </View>
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
