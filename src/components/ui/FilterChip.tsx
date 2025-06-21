import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  customActiveColor?: string;
}

/**
 * FilterChip Component
 * 
 * A reusable filter button/chip that toggles between selected and unselected states
 * 
 * @param label - Text to display on the chip
 * @param isSelected - Whether the chip is currently selected
 * @param onPress - Function called when the chip is pressed
 * @param customActiveColor - Optional custom background color for selected state
 */
const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isSelected,
  onPress,
  customActiveColor = 'bg-custom-muted-purple'
}) => {
  return (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full mr-2 border ${
        isSelected ? `${customActiveColor} border-transparent` : 'bg-white border-gray-300'
      }`}
      onPress={onPress}
    >
      <Text
        className={`text-sm font-medium ${
          isSelected ? 'text-white' : 'text-gray-700'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default styled(FilterChip);
