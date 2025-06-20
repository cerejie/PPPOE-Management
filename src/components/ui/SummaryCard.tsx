import React from 'react';
import { View, Text, Animated } from 'react-native';
import { styled } from 'nativewind';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

/**
 * SummaryCard Component
 * 
 * A reusable card component to display summary metrics in the dashboard
 * 
 * @param title - The title of the metric
 * @param value - The value of the metric (number or string)
 * @param icon - Icon component to display
 * @param bgColor - Optional background color class (defaults to bg-custom-dusty-rose)
 * @param textColor - Optional text color class (defaults to text-custom-deep-burgundy)
 */
const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon,
  bgColor = 'bg-custom-dusty-rose',
  textColor = 'text-custom-deep-burgundy',
}) => {
  // Animation for fade-in effect
  const opacity = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const AnimatedView = Animated.createAnimatedComponent(View);
  const StyledAnimatedView = styled(AnimatedView);

  return (
    <StyledAnimatedView 
      className={`p-4 rounded-lg shadow-md ${bgColor}`}
      style={{ opacity }}
    >
      <View className="flex flex-row justify-between items-center mb-2">
        <Text className={`text-sm font-medium ${textColor}`}>{title}</Text>
      </View>
      <View className="flex flex-row items-center">
      {icon}
      <Text className={`ml-2 text-2xl font-bold ${textColor}`}>{value}</Text>
      </View>
    </StyledAnimatedView>
  );
};

export default styled(SummaryCard);
