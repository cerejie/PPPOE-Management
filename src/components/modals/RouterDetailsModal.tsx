import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ClientMiniCard from '../ui/ClientMiniCard';
import { RouterWithHealth } from '../../constants/mockRouters';
import { useClientStore, Client } from '../../store/useClientStore';

interface RouterDetailsModalProps {
  visible: boolean;
  router: RouterWithHealth | null;
  onClose: () => void;
  onSaveSettings: (routerId: string, settings: Partial<RouterWithHealth>) => void;
}

/**
 * RouterDetailsModal Component
 * 
 * Modal for viewing and editing router details
 * Shows router settings, health metrics, and connected clients
 * 
 * @param visible - Whether the modal is visible
 * @param router - Router data to display
 * @param onClose - Function called when modal is closed
 * @param onSaveSettings - Function called when settings are saved
 */
const RouterDetailsModal: React.FC<RouterDetailsModalProps> = ({
  visible,
  router,
  onClose,
  onSaveSettings
}) => {
  const navigation = useNavigation();
  const clientStore = useClientStore();
  
  // Function to get clients for a specific router
  const getClientsByRouterId = (routerId: string) => {
    return clientStore.allClients.filter(client => client.routerId === routerId);
  };
  
  // Skip rendering if no router is selected
  if (!router) return null;
  
  // Get clients for this router
  const routerClients = getClientsByRouterId(router.id);
  
  // Create local state for editable fields
  const [routerSettings, setRouterSettings] = useState({
    name: router.name,
    ipAddress: router.ipAddress,
    username: router.username,
    password: router.password,
    port: router.port.toString(),
  });

  // Handle text changes
  const handleChange = (field: string, value: string) => {
    setRouterSettings(prev => ({ ...prev, [field]: value }));
  };

  // Navigate to client details
  const handleClientPress = (clientId: string) => {
    // Close modal first
    onClose();
    // Navigate to client screen with the selected client
    setTimeout(() => {
      // @ts-ignore - Navigation typing is complex and we're focusing on UI
      navigation.navigate('Clients', { selectedClientId: clientId });
    }, 300);
  };

  // Calculate health status
  const hasCriticalIssues = 
    router.health.cpuUsage > 90 || 
    router.health.memoryUsage > 90 || 
    router.health.temperature > 70;

  const hasWarningIssues = 
    (router.health.cpuUsage > 70 && router.health.cpuUsage <= 90) || 
    (router.health.memoryUsage > 70 && router.health.memoryUsage <= 90) || 
    (router.health.temperature > 60 && router.health.temperature <= 70);

  const getHealthStatus = () => {
    if (hasCriticalIssues) return { status: 'Critical', color: 'text-red-600' };
    if (hasWarningIssues) return { status: 'Warning', color: 'text-custom-deep-burgundy' };
    return { status: 'Good', color: 'text-custom-muted-purple' };
  };

  const healthStatus = getHealthStatus();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black bg-opacity-50 justify-end">
        <View className="bg-white rounded-t-3xl max-h-[85%]">
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-800">{router.name}</Text>
              <Text className="text-sm text-gray-500">{router.model}</Text>
            </View>
            <TouchableOpacity 
              className="p-2"
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            {/* Router Health */}
            <View className="p-4 border-b border-gray-100">
              <Text className="text-base font-bold mb-3">Router Health</Text>
              
              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text className="text-xs text-gray-500">CPU</Text>
                  <Text className={`text-lg font-medium ${
                    router.health.cpuUsage > 70 ? 'text-custom-deep-burgundy' : 'text-custom-muted-purple'
                  }`}>
                    {router.health.cpuUsage}%
                  </Text>
                </View>
                
                <View className="items-center">
                  <Text className="text-xs text-gray-500">Memory</Text>
                  <Text className={`text-lg font-medium ${
                    router.health.memoryUsage > 70 ? 'text-custom-deep-burgundy' : 'text-custom-muted-purple'
                  }`}>
                    {router.health.memoryUsage}%
                  </Text>
                </View>
                
                <View className="items-center">
                  <Text className="text-xs text-gray-500">Temperature</Text>
                  <Text className={`text-lg font-medium ${
                    router.health.temperature > 60 ? 'text-custom-deep-burgundy' : 'text-custom-muted-purple'
                  }`}>
                    {router.health.temperature}°C
                  </Text>
                </View>
                
                <View className="items-center">
                  <Text className="text-xs text-gray-500">Status</Text>
                  <Text className={`text-lg font-medium ${healthStatus.color}`}>
                    {healthStatus.status}
                  </Text>
                </View>
              </View>
              
              <Text className="text-sm text-gray-500">
                Uptime: {router.health.uptime} • Last seen: {new Date(router.health.lastSeen).toLocaleTimeString()}
              </Text>
            </View>
            
            {/* Router Settings */}
            <View className="p-4 border-b border-gray-100">
              <Text className="text-base font-bold mb-3">Router Settings</Text>
              
              <View className="mb-3">
                <Text className="text-sm text-gray-500 mb-1">Router Name</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 text-gray-800"
                  value={routerSettings.name}
                  onChangeText={(text) => handleChange('name', text)}
                />
              </View>
              
              <View className="mb-3">
                <Text className="text-sm text-gray-500 mb-1">IP Address</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 text-gray-800"
                  value={routerSettings.ipAddress}
                  onChangeText={(text) => handleChange('ipAddress', text)}
                  keyboardType="numeric"
                />
              </View>
              
              <View className="flex-row mb-3">
                <View className="flex-1 mr-2">
                  <Text className="text-sm text-gray-500 mb-1">Username</Text>
                  <TextInput
                    className="border border-gray-300 rounded-md p-2 text-gray-800"
                    value={routerSettings.username}
                    onChangeText={(text) => handleChange('username', text)}
                  />
                </View>
                
                <View className="flex-1">
                  <Text className="text-sm text-gray-500 mb-1">Password</Text>
                  <TextInput
                    className="border border-gray-300 rounded-md p-2 text-gray-800"
                    value={routerSettings.password}
                    onChangeText={(text) => handleChange('password', text)}
                    secureTextEntry
                  />
                </View>
              </View>
              
              <View className="mb-3">
                <Text className="text-sm text-gray-500 mb-1">Port</Text>
                <TextInput
                  className="border border-gray-300 rounded-md p-2 text-gray-800"
                  value={routerSettings.port}
                  onChangeText={(text) => handleChange('port', text)}
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                className="bg-custom-muted-purple py-2 px-4 rounded-md items-center"
                onPress={() => onSaveSettings(router.id, {
                  ...routerSettings,
                  port: parseInt(routerSettings.port)
                })}
              >
                <Text className="text-white font-medium">Save Settings</Text>
              </TouchableOpacity>
            </View>
            
            {/* Connected Clients */}
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-base font-bold">Connected Clients</Text>
                <Text className="text-sm text-gray-500">
                  {router.connectedClients} of {router.totalClients} clients
                </Text>
              </View>
              
              {routerClients.length > 0 ? (
                routerClients
                  .filter((client: Client) => client.isConnected)
                  .map((client: Client) => (
                    <ClientMiniCard
                      key={client.id}
                      client={client}
                      onPress={handleClientPress}
                    />
                  ))
              ) : (
                <Text className="text-sm text-gray-500 italic">No clients connected to this router</Text>
              )}
              
              <View className="mt-3">
                <Text className="text-base font-bold mb-3">Disconnected Clients</Text>
                {routerClients
                  .filter((client: Client) => !client.isConnected)
                  .map((client: Client) => (
                    <ClientMiniCard
                      key={client.id}
                      client={client}
                      onPress={handleClientPress}
                    />
                  ))
                }
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default styled(RouterDetailsModal);
