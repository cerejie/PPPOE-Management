import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '../../store/useClientStore';

interface ClientMiniCardProps {
  client: Client;
  onPress: (clientId: string) => void;
}

/**
 * ClientMiniCard Component
 * 
 * A compact version of client card for displaying in router details
 * Shows essential information about clients connected to a router
 * 
 * @param client - Client data to display
 * @param onPress - Function called when card is pressed
 */
const ClientMiniCard: React.FC<ClientMiniCardProps> = ({ client, onPress }) => {
  // Determine if the client is close to expiry (within 7 days)
  const today = new Date();
  const expiryDate = new Date(client.expirationDate);
  const daysToExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const isExpiringSoon = daysToExpiry > 0 && daysToExpiry <= 7;
  const isExpired = daysToExpiry <= 0;
  
  // Status styling based on connection and expiry
  const getStatusColor = () => {
    if (!client.isConnected) return 'text-custom-dusty-rose';
    if (isExpired) return 'text-custom-deep-burgundy';
    if (isExpiringSoon) return 'text-amber-500';
    return 'text-custom-muted-purple';
  };

  const getStatusIcon = () => {
    if (!client.isConnected) return 'close-circle';
    if (isExpired) return 'alert-circle';
    if (isExpiringSoon) return 'time';
    return 'checkmark-circle';
  };

  const getStatusText = () => {
    if (!client.isConnected) return 'Disconnected';
    if (isExpired) return 'Expired';
    if (isExpiringSoon) return `${daysToExpiry}d left`;
    return 'Active';
  };

  return (
    <TouchableOpacity 
      className="flex-row items-center bg-white p-3 rounded-md border border-gray-100 mb-2"
      onPress={() => onPress(client.id)}
    >
      <View className="flex-1">
        <Text className="font-medium text-gray-800">{client.name}</Text>
        <Text className="text-xs text-gray-500">{client.location}</Text>
      </View>
      
      <View className="flex-row items-center">
        <View className={`px-2 py-1 rounded-full bg-opacity-10 mr-1 flex-row items-center ${
          client.isConnected ? 'bg-custom-muted-purple' : 'bg-custom-dusty-rose'
        }`}>
          <Ionicons 
            name={getStatusIcon()} 
            size={12} 
            color={client.isConnected ? '#99627A' : '#C88EA7'} 
          />
          <Text className={`text-xs ml-1 ${getStatusColor()}`}>
            {getStatusText()}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#99627A" />
      </View>
    </TouchableOpacity>
  );
};

export default styled(ClientMiniCard);
