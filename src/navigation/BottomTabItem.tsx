import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface BottomTabItemProps {
  label: string;
  iconName: string;
  isActive: boolean;
  onPress: () => void;
  activeColor?: string;
  inactiveColor?: string;
}

/**
 * BottomTabItem - A reusable tab item component for the custom bottom tab bar
 * 
 * Features:
 * - Dynamically adjusts width based on active state
 * - Shows label only when active
 * - Uses flex properties to expand/collapse appropriately
 * - Smooth transitions with NativeWind classes
 */
const BottomTabItem: React.FC<BottomTabItemProps> = ({
  label,
  iconName,
  isActive,
  onPress,
  activeColor = '#3b82f6', // Default blue color
  inactiveColor = '#6b7280', // Default gray color
}) => {
  return (
    <Pressable 
      className={`
        items-center 
        justify-center 
        ${isActive ? 'flex-grow-5' : 'flex-shrink-5'} 
        py-3
        px-1
        mx-2
      `}
      onPress={onPress}
      style={({ pressed }) => [
        { 
          opacity: pressed ? 0.8 : 1,
        }
      ]}
    >
      {isActive ? (
        // Active tab with background and label
        <View 
          className={`flex-row justify-center items-center px-4 py-2 rounded-full`}
          style={{ backgroundColor: activeColor }}
        >
          <Icon name={iconName} size={25} color="#ffffff" />
          <Text className="ml-2 text-sm font-medium text-white">{label}</Text>
        </View>
      ) : (
        // Inactive tab with icon only
        <Icon name={iconName} size={26} color={inactiveColor} />
      )}
    </Pressable>
  );
};

export default BottomTabItem;
