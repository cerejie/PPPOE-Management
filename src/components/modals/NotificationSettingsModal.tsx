import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NotificationPreferences } from '../../store/useNotificationStore';

/**
 * NotificationSettingsModal Component
 * 
 * Modal that allows users to configure notification preferences.
 * Includes toggles for different notification types and timing settings.
 * 
 * @param visible - Whether the modal is visible
 * @param preferences - Current notification preferences
 * @param onClose - Callback when modal is closed
 * @param onSave - Callback when preferences are saved with updated values
 */
interface NotificationSettingsModalProps {
  visible: boolean;
  preferences: NotificationPreferences;
  onClose: () => void;
  onSave: (preferences: NotificationPreferences) => void;
}

// Options for dropdown selectors
const daysOptions = [1, 2, 3, 5, 7, 14, 30];
const thresholdOptions = [60, 70, 80, 90];

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  visible,
  preferences,
  onClose,
  onSave
}) => {
  // Local state for preference changes
  const [localPreferences, setLocalPreferences] = useState<NotificationPreferences>({...preferences});
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Toggle a specific setting
  const toggleSetting = (key: keyof NotificationPreferences) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };
  
  // Update a numeric setting
  const updateNumericSetting = (key: keyof NotificationPreferences, value: number) => {
    setLocalPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Toggle visibility of a settings section
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Handle save and close
  const handleSave = () => {
    onSave(localPreferences);
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-lg p-4 h-3/4">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Notification Settings</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {/* Master toggle */}
          <View className="flex-row justify-between items-center p-3 bg-gray-50 rounded-lg mb-4">
            <View className="flex-row items-center">
              <Ionicons name="notifications" size={24} color="#99627A" className="mr-2" />
              <Text className="text-base font-medium text-custom-muted-purple ml-2">All Notifications</Text>
            </View>
            <Switch
              value={localPreferences.enabled}
              onValueChange={() => toggleSetting('enabled')}
              trackColor={{ false: '#E7CBCB', true: '#99627A' }}
              thumbColor={'white'}
            />
          </View>
          
          <ScrollView className="flex-1">
            {/* Only show detailed settings if master toggle is on */}
            {localPreferences.enabled && (
              <View>
                {/* Subscription Expirations Section */}
                <View className="mb-4 border border-gray-100 rounded-lg overflow-hidden">
                  <TouchableOpacity 
                    onPress={() => toggleSection('expiration')}
                    className="flex-row justify-between items-center p-3 bg-white"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="calendar" size={20} color="#99627A" />
                      <Text className="text-base font-medium ml-2">Subscription Expirations</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Switch
                        value={localPreferences.expirationEnabled}
                        onValueChange={() => toggleSetting('expirationEnabled')}
                        trackColor={{ false: '#E7CBCB', true: '#99627A' }}
                        thumbColor={'white'}
                      />
                      <Ionicons 
                        name={expandedSection === 'expiration' ? 'chevron-up' : 'chevron-down'} 
                        size={16} 
                        color="#666" 
                        style={{ marginLeft: 8 }}
                      />
                    </View>
                  </TouchableOpacity>
                  
                  {expandedSection === 'expiration' && localPreferences.expirationEnabled && (
                    <View className="p-3 bg-gray-50">
                      <Text className="text-sm text-gray-600 mb-2">
                        Notify me before subscriptions expire:
                      </Text>
                      <View className="flex-row flex-wrap">
                        {daysOptions.map(days => (
                          <TouchableOpacity
                            key={`exp-${days}`}
                            onPress={() => updateNumericSetting('expirationDays', days)}
                            className={`m-1 py-1 px-3 rounded-full ${
                              localPreferences.expirationDays === days 
                                ? 'bg-custom-muted-purple' 
                                : 'bg-gray-200'
                            }`}
                          >
                            <Text 
                              className={`text-sm ${
                                localPreferences.expirationDays === days 
                                  ? 'text-white' 
                                  : 'text-gray-700'
                              }`}
                            >
                              {days} {days === 1 ? 'day' : 'days'}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
                
                {/* Payment Reminders Section */}
                <View className="mb-4 border border-gray-100 rounded-lg overflow-hidden">
                  <TouchableOpacity 
                    onPress={() => toggleSection('payment')}
                    className="flex-row justify-between items-center p-3 bg-white"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="cash" size={20} color="#99627A" />
                      <Text className="text-base font-medium ml-2">Payment Reminders</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Switch
                        value={localPreferences.paymentEnabled}
                        onValueChange={() => toggleSetting('paymentEnabled')}
                        trackColor={{ false: '#E7CBCB', true: '#99627A' }}
                        thumbColor={'white'}
                      />
                      <Ionicons 
                        name={expandedSection === 'payment' ? 'chevron-up' : 'chevron-down'} 
                        size={16} 
                        color="#666" 
                        style={{ marginLeft: 8 }}
                      />
                    </View>
                  </TouchableOpacity>
                  
                  {expandedSection === 'payment' && localPreferences.paymentEnabled && (
                    <View className="p-3 bg-gray-50">
                      <Text className="text-sm text-gray-600 mb-2">
                        Notify me before payments are due:
                      </Text>
                      <View className="flex-row flex-wrap">
                        {daysOptions.slice(0, 5).map(days => (
                          <TouchableOpacity
                            key={`pay-${days}`}
                            onPress={() => updateNumericSetting('paymentDays', days)}
                            className={`m-1 py-1 px-3 rounded-full ${
                              localPreferences.paymentDays === days 
                                ? 'bg-custom-muted-purple' 
                                : 'bg-gray-200'
                            }`}
                          >
                            <Text 
                              className={`text-sm ${
                                localPreferences.paymentDays === days 
                                  ? 'text-white' 
                                  : 'text-gray-700'
                              }`}
                            >
                              {days} {days === 1 ? 'day' : 'days'}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
                
                {/* Router Health Alerts Section */}
                <View className="mb-4 border border-gray-100 rounded-lg overflow-hidden">
                  <TouchableOpacity 
                    onPress={() => toggleSection('router')}
                    className="flex-row justify-between items-center p-3 bg-white"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="hardware-chip" size={20} color="#99627A" />
                      <Text className="text-base font-medium ml-2">Router Health Alerts</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Switch
                        value={localPreferences.routerEnabled}
                        onValueChange={() => toggleSetting('routerEnabled')}
                        trackColor={{ false: '#E7CBCB', true: '#99627A' }}
                        thumbColor={'white'}
                      />
                      <Ionicons 
                        name={expandedSection === 'router' ? 'chevron-up' : 'chevron-down'} 
                        size={16} 
                        color="#666" 
                        style={{ marginLeft: 8 }}
                      />
                    </View>
                  </TouchableOpacity>
                  
                  {expandedSection === 'router' && localPreferences.routerEnabled && (
                    <View className="p-3 bg-gray-50">
                      <View className="mb-3">
                        <Text className="text-sm text-gray-600 mb-2">
                          Notify me when CPU usage exceeds:
                        </Text>
                        <View className="flex-row flex-wrap">
                          {thresholdOptions.map(percent => (
                            <TouchableOpacity
                              key={`cpu-${percent}`}
                              onPress={() => updateNumericSetting('routerHighCpuThreshold', percent)}
                              className={`m-1 py-1 px-3 rounded-full ${
                                localPreferences.routerHighCpuThreshold === percent 
                                  ? 'bg-custom-muted-purple' 
                                  : 'bg-gray-200'
                              }`}
                            >
                              <Text 
                                className={`text-sm ${
                                  localPreferences.routerHighCpuThreshold === percent 
                                    ? 'text-white' 
                                    : 'text-gray-700'
                                }`}
                              >
                                {percent}%
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                      
                      <View>
                        <Text className="text-sm text-gray-600 mb-2">
                          Notify me when temperature exceeds:
                        </Text>
                        <View className="flex-row flex-wrap">
                          {[50, 55, 60, 65, 70].map(temp => (
                            <TouchableOpacity
                              key={`temp-${temp}`}
                              onPress={() => updateNumericSetting('routerHighTempThreshold', temp)}
                              className={`m-1 py-1 px-3 rounded-full ${
                                localPreferences.routerHighTempThreshold === temp 
                                  ? 'bg-custom-muted-purple' 
                                  : 'bg-gray-200'
                              }`}
                            >
                              <Text 
                                className={`text-sm ${
                                  localPreferences.routerHighTempThreshold === temp 
                                    ? 'text-white' 
                                    : 'text-gray-700'
                                }`}
                              >
                                {temp}°C
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
                
                {/* Other Notifications Section */}
                <View className="mb-4 border border-gray-100 rounded-lg overflow-hidden">
                  <TouchableOpacity 
                    onPress={() => toggleSection('other')}
                    className="flex-row justify-between items-center p-3 bg-white"
                  >
                    <View className="flex-row items-center">
                      <Ionicons name="information-circle" size={20} color="#99627A" />
                      <Text className="text-base font-medium ml-2">Other Notifications</Text>
                    </View>
                    <Ionicons 
                      name={expandedSection === 'other' ? 'chevron-up' : 'chevron-down'} 
                      size={16} 
                      color="#666" 
                    />
                  </TouchableOpacity>
                  
                  {expandedSection === 'other' && (
                    <View className="p-3 bg-gray-50">
                      <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-sm text-gray-600">System Updates</Text>
                        <Switch
                          value={localPreferences.systemEnabled}
                          onValueChange={() => toggleSetting('systemEnabled')}
                          trackColor={{ false: '#E7CBCB', true: '#99627A' }}
                          thumbColor={'white'}
                        />
                      </View>
                      
                      <View className="flex-row justify-between items-center">
                        <Text className="text-sm text-gray-600">Connection Status Changes</Text>
                        <Switch
                          value={localPreferences.connectionEnabled}
                          onValueChange={() => toggleSetting('connectionEnabled')}
                          trackColor={{ false: '#E7CBCB', true: '#99627A' }}
                          thumbColor={'white'}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
          
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              onPress={onClose}
              className="py-2 px-4 rounded-md border border-gray-300"
            >
              <Text className="text-gray-700">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleSave}
              className="py-2 px-4 rounded-md bg-custom-muted-purple"
            >
              <Text className="text-white font-medium">Save Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationSettingsModal;
