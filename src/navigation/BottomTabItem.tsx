import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
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

  // Animation value for scale
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Animation value for active tab transitions
  const activeAnim = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  // Update animation when active state changes
  useEffect(() => {
    Animated.timing(activeAnim, {
      toValue: isActive ? 1 : 0,
      duration: 100,
      useNativeDriver: true, // Using true for better performance
    }).start();
  }, [isActive]);
  
  // Press animations
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 2,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };


  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <AnimatedPressable 
      className={`justify-between items-center pt-2 mx-3 -mb-3`}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{
        transform: [{ scale: scaleAnim }]
      }}
    >
      {isActive ? (
        // Active tab with background and label
        <Animated.View 
          className={`flex-row justify-center items-center px-4 py-2 -mx-4 mb-1 rounded-2xl`}
          style={{ 
            backgroundColor: activeColor,
            transform: [{ scale: activeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1]
            }) }],
            
          }}
        >
          <Icon name={iconName} size={27} color="#ffffff" />
          <Animated.Text 
            className="ml-2 text-sm font-medium text-white"
            style={{
              opacity: activeAnim
            }}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      ) : (
        // Inactive tab with icon only
        <Icon name={iconName} size={32} color={inactiveColor} />
      )}
    </AnimatedPressable>
  );
};

export default BottomTabItem;
