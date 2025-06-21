import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Props for the SettingItem component
 */
interface SettingItemProps {
  /**
   * Title of the setting
   */
  title: string;

  /**
   * Optional description or value display
   */
  subtitle?: string;

  /**
   * Icon name from Ionicons
   */
  iconName: keyof typeof Ionicons.glyphMap;

  /**
   * Icon color (uses text-gray-700 if not specified)
   */
  iconColor?: string;

  /**
   * Background color for the icon container
   */
  iconBgColor?: string;

  /**
   * Whether the setting item has a toggle switch
   */
  hasToggle?: boolean;

  /**
   * Whether the setting is toggled on (if hasToggle is true)
   */
  isToggled?: boolean;

  /**
   * Whether the setting item has a chevron icon indicating it can be pressed
   */
  hasChevron?: boolean;

  /**
   * Function to call when the setting item is pressed
   */
  onPress?: () => void;

  /**
   * Function to call when the toggle is switched
   */
  onToggle?: (value: boolean) => void;
}

/**
 * A reusable setting item component for displaying settings options
 * 
 * Can be used for navigation items, toggles, or informational items
 * Supports icons, descriptions, and right-side controls (toggle or chevron)
 */
const SettingItem: React.FC<SettingItemProps> = ({
  title,
  subtitle,
  iconName,
  iconColor = '#374151',
  iconBgColor = '#F3F4F6',
  hasToggle = false,
  isToggled = false,
  hasChevron = true,
  onPress,
  onToggle
}) => {
  const handlePress = () => {
    if (hasToggle && onToggle) {
      onToggle(!isToggled);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      className="flex-row items-center py-4 px-2"
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Left icon */}
      <View 
        className={`w-10 h-10 rounded-full items-center justify-center mr-4`}
        style={{ backgroundColor: iconBgColor }}
      >
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>
      
      {/* Content */}
      <View className="flex-1">
        <Text className="text-gray-800 font-medium text-base">{title}</Text>
        {subtitle && (
          <Text className="text-gray-500 text-sm mt-0.5">{subtitle}</Text>
        )}
      </View>
      
      {/* Right control (toggle or chevron) */}
      {hasToggle ? (
        <View 
          className={`w-12 h-6 rounded-full justify-center px-1 ${
            isToggled ? 'bg-custom-muted-purple' : 'bg-gray-300'
          }`}
        >
          <View 
            className={`w-4 h-4 rounded-full bg-white ${
              isToggled ? 'ml-6' : 'ml-0'
            }`}
          />
        </View>
      ) : hasChevron ? (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      ) : null}
    </TouchableOpacity>
  );
};

export default SettingItem;
