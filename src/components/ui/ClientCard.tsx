import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '../../store/useClientStore';

interface ClientCardProps {
  client: Client;
  onPress: (client: Client) => void;
  onDisable?: (client: Client) => void;
}

/**
 * ClientCard Component
 * 
 * Displays a client's information in a card format with swipe actions
 * 
 * @param client - Client object containing all client information
 * @param onPress - Function called when the card is pressed
 * @param onDisable - Optional function called when the client is disabled via swipe
 */
const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onPress,
  onDisable,
}) => {
  // Function to format date string to more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Check if client is expiring soon (within 7 days)
  const isExpiringSoon = () => {
    const expirationDate = new Date(client.expirationDate);
    const today = new Date();
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  // Render right swipe action (disable client)
  const renderRightActions = () => {
    return (
      <TouchableOpacity 
        className="bg-custom-deep-burgundy flex justify-center items-center px-4"
        onPress={() => onDisable && onDisable(client)}
      >
        <Text className="text-custom-white font-medium">Disable</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={2}
      rightThreshold={40}
    >
      <TouchableOpacity 
        className="bg-white p-4 mb-2 rounded-lg shadow-sm"
        onPress={() => onPress(client)}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-800">{client.name}</Text>
            <Text className="text-sm text-gray-500">{client.location}</Text>
          </View>
          
          <View className="items-end">
            {/* Connection status indicator */}
            <View className="flex-row items-center">
              <View className={`h-2 w-2 rounded-full mr-1 ${
                client.isConnected ? 'bg-custom-muted-purple' : 'bg-custom-dusty-rose'
              }`} />
              <Text className={`text-sm font-medium ${
                client.isConnected 
                  ? 'text-custom-muted-purple' 
                  : 'text-custom-dusty-rose'
              }`}>
                {client.isConnected ? 'Active' : 'Disconnected'}
              </Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row justify-between mt-2 items-center">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text className="text-sm text-gray-600 ml-1">
              Expires: {formatDate(client.expirationDate)}
            </Text>
          </View>
          
          {isExpiringSoon() && (
            <View className="bg-yellow-100 px-2 py-1 rounded">
              <Text className="text-xs text-yellow-600 font-medium">Expiring Soon</Text>
            </View>
          )}
        </View>
        
        <View className="flex-row items-center mt-1">
          <Ionicons name="card-outline" size={14} color="#666" />
          <Text className="text-sm text-gray-600 ml-1">
            Last Payment: {formatDate(client.paymentDate)}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default styled(ClientCard);
