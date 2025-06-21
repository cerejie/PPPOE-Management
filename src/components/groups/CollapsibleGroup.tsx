import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

interface CollapsibleGroupProps {
  title: string;
  children: React.ReactNode;
  count?: number;
  initiallyExpanded?: boolean;
}

/**
 * CollapsibleGroup Component
 * 
 * A group header with collapsible content for organizing items
 * 
 * @param title - Title of the group
 * @param children - Content to render inside the group
 * @param count - Optional count of items in the group
 * @param initiallyExpanded - Whether the group should be expanded initially
 */
const CollapsibleGroup: React.FC<CollapsibleGroupProps> = ({
  title,
  children,
  count,
  initiallyExpanded = true
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const animatedHeight = useRef(new Animated.Value(initiallyExpanded ? 1 : 0)).current;
  const animatedRotation = useRef(new Animated.Value(initiallyExpanded ? 0 : 1)).current;

  const toggleExpanded = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    
    // Animate height and rotation
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: newExpandedState ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedRotation, {
        toValue: newExpandedState ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Calculate rotation for the arrow icon
  const spin = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View className="mb-3">
      <TouchableOpacity 
        onPress={toggleExpanded}
        className="flex-row justify-between items-center border-b border-custom-light-pink p-2"
      >
        <View className="flex-row items-center">
          <Text className="text-base font-bold text-gray-800">{title}</Text>
          {count !== undefined && (
            <Text className="ml-2 text-sm text-gray-500">({count})</Text>
          )}
        </View>
        
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Ionicons 
            name="chevron-down" 
            size={20} 
            color="#99627A"
          />
        </Animated.View>
      </TouchableOpacity>
      
      <Animated.View 
        style={{ 
          opacity: animatedHeight,
          maxHeight: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1000], // Using a large value for max height
          }),
          overflow: 'hidden'
        }}
      >
        <View className="mt-2">
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default styled(CollapsibleGroup);
