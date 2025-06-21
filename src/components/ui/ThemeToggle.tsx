import React from 'react';
import { View, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore, ThemeType } from '../../store/useUserStore';

interface ThemeToggleProps {
  /**
   * Size of the toggle: 'sm' (small), 'md' (medium), 'lg' (large)
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Optional callback when theme is changed
   */
  onToggle?: (theme: ThemeType) => void;
}

/**
 * A reusable theme toggle component that switches between light and dark mode
 * 
 * Features:
 * - Animated transition between light and dark mode
 * - Customizable size
 * - Icons to represent each mode
 * - Updates the theme in the userStore
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md',
  onToggle
}) => {
  // Get theme from user store
  const { theme, toggleTheme } = useUserStore();
  const isDark = theme === 'dark';
  
  // Animation value for smooth transitions
  const [animation] = React.useState(new Animated.Value(isDark ? 1 : 0));
  
  // Size mapping based on the size prop
  const sizeMap = {
    sm: {
      container: 'w-14 h-7',
      circle: 'w-5 h-5',
      iconSize: 12,
      translateRange: [2, 30]
    },
    md: {
      container: 'w-16 h-8',
      circle: 'w-6 h-6',
      iconSize: 14,
      translateRange: [2, 36]
    },
    lg: {
      container: 'w-20 h-10',
      circle: 'w-8 h-8',
      iconSize: 16,
      translateRange: [2, 48]
    }
  };
  
  // Get dimensions based on size
  const { container, circle, iconSize, translateRange } = sizeMap[size];
  
  // Handle toggle
  const handleToggle = () => {
    const newTheme = isDark ? 'light' : 'dark';
    
    // Animate the toggle
    Animated.timing(animation, {
      toValue: isDark ? 0 : 1,
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      useNativeDriver: false
    }).start();
    
    // Update the theme in store
    toggleTheme();
    
    // Call onToggle callback if provided
    if (onToggle) {
      onToggle(newTheme);
    }
  };
  
  // Interpolate values for animations
  const backgroundColorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E7CBCB', '#643843']
  });
  
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: translateRange
  });

  return (
    <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
      <Animated.View
        className={`relative rounded-full ${container}`}
        style={{ backgroundColor: backgroundColorInterpolation }}
      >
        {/* Sun icon on the left */}
        <View className="absolute left-1.5 top-0 bottom-0 justify-center flex">
          <Ionicons 
            name="sunny" 
            size={iconSize} 
            color="#FFFFFF" 
            style={{ opacity: isDark ? 0.4 : 0.9 }}
          />
        </View>
        
        {/* Moon icon on the right */}
        <View className="absolute right-1.5 top-0 bottom-0 justify-center flex">
          <Ionicons 
            name="moon" 
            size={iconSize} 
            color="#FFFFFF" 
            style={{ opacity: isDark ? 0.9 : 0.4 }}
          />
        </View>
        
        {/* Sliding indicator */}
        <Animated.View 
          className={`absolute bg-white rounded-full shadow ${circle}`}
          style={{
            transform: [{ translateX }],
            top: '50%',
            marginTop: size === 'lg' ? -16 : size === 'md' ? -12 : -10 // Half of the height to center it
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ThemeToggle;
