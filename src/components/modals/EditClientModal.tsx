import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '../../store/useClientStore';

interface EditClientModalProps {
  visible: boolean;
  client: Client | null;
  onClose: () => void;
  onSave: (updatedClient: Partial<Client>) => void;
}

/**
 * EditClientModal Component
 * 
 * Modal for editing client information with form fields for all client properties
 * 
 * @param visible - Whether the modal is visible
 * @param client - The client object to edit
 * @param onClose - Function called when the modal is closed
 * @param onSave - Function called with updated client data when saved
 */
const EditClientModal: React.FC<EditClientModalProps> = ({
  visible,
  client,
  onClose,
  onSave,
}) => {
  // Form state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [plan, setPlan] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  // Initialize form with client data when modal opens
  useEffect(() => {
    if (client) {
      setName(client.name);
      setLocation(client.location);
      setPlan(client.plan);
      setExpirationDate(client.expirationDate);
      setIsConnected(client.isConnected);
    }
  }, [client]);
  
  const handleSave = () => {
    if (client) {
      onSave({
        id: client.id,
        routerId: client.routerId,
        name,
        location,
        plan,
        expirationDate,
        isConnected
      });
    }
    onClose();
  };

  // Mock usage analytics data
  const usageData = {
    currentMonth: '125.7 GB',
    lastMonth: '98.2 GB',
    average: '112.4 GB'
  };

  if (!client) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-custom-white rounded-t-lg p-4 max-h-[80%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-custom-muted-purple">Edit Client</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#99627A" />
            </TouchableOpacity>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Form Fields */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-600 mb-1">Name</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-gray-800"
                value={name}
                onChangeText={setName}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-600 mb-1">Location</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-gray-800"
                value={location}
                onChangeText={setLocation}
                placeholder="Room number or location"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-600 mb-1">Subscription Plan</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-gray-800"
                value={plan}
                onChangeText={setPlan}
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-600 mb-1">Expiration Date</Text>
              <TextInput
                className="bg-gray-100 p-3 rounded-lg text-gray-800"
                value={expirationDate}
                onChangeText={setExpirationDate}
                placeholder="YYYY-MM-DD"
              />
            </View>
            
            <View className="mb-6 flex-row justify-between items-center">
              <Text className="text-sm font-medium text-gray-600">Connection Status</Text>
              <Switch
                value={isConnected}
                onValueChange={setIsConnected}
                trackColor={{ false: "#C88EA7", true: "#99627A" }}
                thumbColor={"#FFFFFF"}
              />
            </View>
            
            {/* Usage Analytics Section */}
            <View className="bg-gray-50 p-4 rounded-lg mb-4">
              <Text className="text-base font-bold text-custom-muted-purple mb-3">Usage Analytics</Text>
              
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Current Month:</Text>
                <Text className="font-medium">{usageData.currentMonth}</Text>
              </View>
              
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-600">Last Month:</Text>
                <Text className="font-medium">{usageData.lastMonth}</Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-gray-600">Monthly Average:</Text>
                <Text className="font-medium">{usageData.average}</Text>
              </View>
            </View>
            
            {/* Client ID and Router Information (not editable) */}
            <View className="mb-4">
              <Text className="text-xs text-gray-500">Client ID: {client.id}</Text>
              <Text className="text-xs text-gray-500">Router: {client.routerId}</Text>
            </View>
          </ScrollView>
          
          {/* Action Buttons */}
          <View className="flex-row justify-end mt-4 pt-2 border-t border-gray-200">
            <TouchableOpacity 
              className="mr-2 px-4 py-2 rounded-lg bg-gray-200"
              onPress={onClose}
            >
              <Text className="font-medium text-gray-800">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-custom-muted-purple"
              onPress={handleSave}
            >
              <Text className="font-medium text-white">Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default styled(EditClientModal);
