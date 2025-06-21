import React from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { styled } from 'nativewind';

interface FABProps {
  onPress: () => void;
  icon: React.ReactNode;
  position?: 'bottomRight' | 'bottomLeft';
}

/**
 * Floating Action Button Component
 * 
 * A floating action button positioned at the bottom corner of the screen
 * 
 * @param onPress - Function to execute when pressed
 * @param icon - Icon component to display
 * @param position - Position of the button (bottomRight or bottomLeft)
 */
const FAB: React.FC<FABProps> = ({
  onPress,
  icon,
  position = 'bottomRight',
}) => {
  // Animation for scale effect on press
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Position styles
  const positionClass = position === 'bottomRight' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const StyledAnimatedTouchable = styled(AnimatedTouchable);

  return (
    <StyledAnimatedTouchable
      className={`absolute z-10 justify-center items-center w-14 h-14 rounded-full shadow-lg ${positionClass} bg-custom-deep-burgundy`}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <View>
        {icon}
      </View>
    </StyledAnimatedTouchable>
  );
};

export default styled(FAB);
