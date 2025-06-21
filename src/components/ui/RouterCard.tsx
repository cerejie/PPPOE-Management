import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { RouterWithHealth } from '../../constants/mockRouters';

interface RouterCardProps {
  router: RouterWithHealth;
  onPress: (router: RouterWithHealth) => void;
}

/**
 * RouterCard Component
 * 
 * Displays a router's information in card format
 * 
 * @param router - Router data to display
 * @param onPress - Function called when card is pressed
 */
const RouterCard: React.FC<RouterCardProps> = ({ router, onPress }) => {
  // Determine health status based on CPU, memory usage, and temperature
  const isHealthy = 
    router.health.cpuUsage < 70 && 
    router.health.memoryUsage < 70 && 
    router.health.temperature < 60;
  
  const healthColor = isHealthy ? 'text-custom-muted-purple' : 'text-custom-deep-burgundy';
  const healthIcon = isHealthy ? 'checkmark-circle' : 'warning';

  // Calculate percentage of connected clients
  const connectedPercentage = 
    router.totalClients > 0 
      ? Math.round((router.connectedClients || 0) / router.totalClients * 100) 
      : 0;

  return (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-sm p-4 mb-3"
      onPress={() => onPress(router)}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-800">{router.name}</Text>
          <Text className="text-sm text-gray-500 mb-1">{router.model}</Text>
          <Text className="text-sm text-gray-500">{router.ipAddress}</Text>
        </View>
        
        <View className="items-end">
          <View className="flex-row items-center">
            <Ionicons name={healthIcon} size={16} color={isHealthy ? '#99627A' : '#643843'} />
            <Text className={`ml-1 text-sm font-medium ${healthColor}`}>
              {isHealthy ? 'Healthy' : 'Issues'}
            </Text>
          </View>
          
          <Text className="text-xs text-gray-500 mt-1">
            Uptime: {router.health.uptime}
          </Text>
        </View>
      </View>
      
      <View className="mt-3 pt-3 border-t border-gray-100">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="people" size={16} color="#666" />
            <Text className="text-sm font-medium text-gray-700 ml-1">
              {router.totalClients} Clients
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="h-2 w-2 rounded-full bg-custom-muted-purple mr-1" />
            <Text className="text-sm text-gray-700">
              {router.connectedClients} Connected ({connectedPercentage}%)
            </Text>
          </View>
        </View>
        
        {/* Simple progress bar showing percentage of connected clients */}
        <View className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full bg-custom-muted-purple rounded-full" 
            style={{ width: `${connectedPercentage}%` }} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default styled(RouterCard);
