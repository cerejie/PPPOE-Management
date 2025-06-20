import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styled } from 'nativewind';

interface ActionButtonProps {
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

/**
 * ActionButton Component
 * 
 * A reusable button component for actions in the dashboard
 * 
 * @param label - Button text
 * @param onPress - Function to execute on button press
 * @param icon - Icon component to display
 * @param variant - Button style variant (primary or secondary)
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onPress,
  icon,
  variant = 'primary',
}) => {
  // Define style classes based on variant
  const containerClasses = variant === 'primary' 
    ? 'bg-custom-deep-burgundy' 
    : 'bg-custom-muted-purple';
  
  const textClasses = 'text-custom-white font-medium';

  return (
    <TouchableOpacity
      className={`${containerClasses} flex-row items-center justify-center px-4 py-3 rounded-lg shadow-md`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {icon && <View className="mr-2">{icon}</View>}
      <Text className={textClasses}>{label}</Text>
    </TouchableOpacity>
  );
};

export default styled(ActionButton);
