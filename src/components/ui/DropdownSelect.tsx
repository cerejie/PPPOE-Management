import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';

interface DropdownOption {
  label: string;
  value: string | null;
  color?: string;
}

interface DropdownSelectProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string | null;
  onSelect: (value: string | null) => void;
  width?: string;
}

/**
 * Modern minimal dropdown select component
 */
const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  width = 'w-full'
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Find the selected option for display
  const selectedOption = options.find(option => option.value === selectedValue);
  
  return (
    <View className={`${width}`}>
      {/* Dropdown Button */}
      <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        className="flex-row justify-between items-center px-3 py-2 bg-white rounded-md border border-gray-200"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 1,
          elevation: 1,
        }}
      >
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-700" numberOfLines={1}>
            {selectedOption ? selectedOption.label : 'Select...'}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#99627A" />
      </TouchableOpacity>
      
      {/* Dropdown Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          className="bg-black/30"
        >
          <View className="flex-1 justify-center items-center px-4">
            <View className="w-full bg-white rounded-lg overflow-hidden" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 8,
              maxWidth: 320,
            }}>
              {/* Header */}
              <View className="px-4 py-3 border-b border-gray-100">
                <Text className="text-base font-medium text-gray-800">{label}</Text>
              </View>
              
              {/* Options List */}
              <FlatList
                data={options}
                keyExtractor={(item) => `${item.value}`}
                style={{ maxHeight: 300 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`px-4 py-3 flex-row justify-between items-center border-b border-gray-50 ${
                      item.value === selectedValue ? 'bg-gray-50' : ''
                    }`}
                    onPress={() => {
                      onSelect(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-gray-800">{item.label}</Text>
                    {item.value === selectedValue && (
                      <Ionicons name="checkmark" size={18} color="#99627A" />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default styled(DropdownSelect);
