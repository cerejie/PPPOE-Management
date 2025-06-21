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
        ${isActive ? 'flex-grow' : 'flex-shrink'} 
        py-2
      `}
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.8 : 1 }
      ]}
    >
      {isActive ? (
        // Active tab with background and label
        <View 
          className={`
            flex-row 
            items-center 
            justify-center 
            rounded-full 
            px-4 
            py-2
          `}
          style={{ backgroundColor: activeColor }}
        >
          <Icon name={iconName} size={22} color="#ffffff" />
          <Text className="text-white font-medium text-sm ml-2">{label}</Text>
        </View>
      ) : (
        // Inactive tab with icon only
        <Icon name={iconName} size={24} color={inactiveColor} />
      )}
    </Pressable>
  );
};

export default BottomTabItem;
