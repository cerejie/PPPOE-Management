import React from 'react';
import { View, Text } from 'react-native';

/**
 * TabBadge Component
 * 
 * A reusable badge component that can be placed on tabs to indicate unread items or counts
 * 
 * @param count - The number to display in the badge
 * @param small - Whether to render a smaller version of the badge
 * @param position - Where to position the badge (relative to parent)
 */
interface TabBadgeProps {
  count: number;
  small?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const TabBadge: React.FC<TabBadgeProps> = ({ 
  count, 
  small = false, 
  position = 'top-right' 
}) => {
  // Don't render if count is 0
  if (count === 0) return null;
  
  // Generate position classes
  let positionClasses = '';
  
  switch (position) {
    case 'top-right':
      positionClasses = 'top-0 right-0 -translate-y-1/2 translate-x-1/2';
      break;
    case 'top-left':
      positionClasses = 'top-0 left-0 -translate-y-1/2 -translate-x-1/2';
      break;
    case 'bottom-right':
      positionClasses = 'bottom-0 right-0 translate-y-1/2 translate-x-1/2';
      break;
    case 'bottom-left':
      positionClasses = 'bottom-0 left-0 translate-y-1/2 -translate-x-1/2';
      break;
  }
  
  return (
    <View 
      className={`absolute ${positionClasses} ${small ? 'min-w-4 h-4' : 'min-w-5 h-5'} 
        bg-custom-deep-burgundy rounded-full justify-center items-center px-1 z-10`}
    >
      <Text 
        className={`text-white font-medium text-center ${small ? 'text-xs' : 'text-xs'}`}
        numberOfLines={1}
      >
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

export default TabBadge;
