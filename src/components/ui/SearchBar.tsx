import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

/**
 * SearchBar Component
 * 
 * A reusable search input field with clear button
 * 
 * @param value - Current search text value
 * @param onChangeText - Function called when search text changes
 * @param onClear - Optional function to clear the search input
 * @param placeholder - Optional placeholder text
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search clients...'
}) => {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
      <Ionicons name="search-outline" size={20} color="#666" />
      <TextInput
        className="flex-1 ml-2 text-base text-gray-800"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default styled(SearchBar);
