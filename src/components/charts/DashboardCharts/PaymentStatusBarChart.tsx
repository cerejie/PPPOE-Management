import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { styled } from 'nativewind';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface PaymentStatusBarChartProps {
  data: BarData[];
  title?: string;
}

/**
 * PaymentStatusBarChart Component
 * 
 * Displays a bar chart showing payment status statistics
 * 
 * @param data - Array of data items with label, value, and optional color
 * @param title - Optional title for the chart
 */
const PaymentStatusBarChart: React.FC<PaymentStatusBarChartProps> = ({ 
  data, 
  title = "Payment Status" 
}) => {
  // Animation values for each bar
  const barAnimations = useRef(data.map(() => new Animated.Value(0))).current;
  
  useEffect(() => {
    // Animate each bar with a slight delay between them
    const animations = barAnimations.map((anim, i) => {
      return Animated.timing(anim, {
        toValue: 1,
        duration: 800,
        delay: i * 100,
        useNativeDriver: true,
      });
    });
    
    Animated.parallel(animations).start();
  }, []);
  
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Default colors if not provided
  const defaultColors = ['#643843', '#99627A'];
  
  // Screen width minus padding
  const width = Dimensions.get('window').width - 48;
  
  // Bar dimensions
  const barWidth = (width - (data.length - 1) * 20) / data.length;
  const maxBarHeight = 150;

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <Text className="text-lg font-medium text-custom-deep-burgundy mb-6 text-center">
        {title}
      </Text>
      
      <View className="flex-row justify-around items-end mb-4">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * maxBarHeight;
          const color = item.color || defaultColors[index % defaultColors.length];
          
          return (
            <View key={index} className="items-center">
              <Animated.View 
                style={{
                  width: barWidth,
                  height: barHeight,
                  backgroundColor: color,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  transform: [
                    { scaleY: barAnimations[index] }
                  ],
                  opacity: barAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1]
                  })
                }}
              />
              <View className="mt-2 items-center">
                <Text className="text-xs font-bold text-custom-deep-burgundy">
                  {item.value}
                </Text>
                <Text className="text-xs text-custom-muted-purple">
                  {item.label}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      
      {/* X-axis line */}
      <View className="h-px bg-custom-light-pink w-full mb-2" />
    </View>
  );
};

export default styled(PaymentStatusBarChart);
