import React, { useEffect, useRef } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import { styled } from 'nativewind';

// Add type declaration for react-native-svg to fix TypeScript error
// @ts-ignore - Using directly for Expo compatibility
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';

interface DataItem {
  label: string;
  value: number;
  color?: string;
}

interface ClientStatusPieChartProps {
  data: DataItem[];
  title?: string;
}

/**
 * ClientStatusPieChart Component
 * 
 * Displays a pie chart showing the distribution of client status
 * 
 * @param data - Array of data items with label, value, and optional color
 * @param title - Optional title for the chart
 */
const ClientStatusPieChart: React.FC<ClientStatusPieChartProps> = ({ 
  data, 
  title = "Client Status" 
}) => {
  // Animation for fade-in effect
  const opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Define colors for each slice if not provided
  const defaultColors = ['#643843', '#99627A', '#C88EA7', '#E7CBCB'];
  
  // Prepare data for the pie chart
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let startAngle = 0;
  
  // Width and height
  const width = Dimensions.get('window').width - 48; // Accounting for padding
  const height = 200;
  const radius = Math.min(width, height) / 2.5;
  const centerX = width / 2;
  const centerY = height / 2;

  // Generate pie slices
  const slices = data.map((item, index) => {
    const percentage = item.value / total;
    const endAngle = startAngle + percentage * 2 * Math.PI;
    
    // Calculate path for the slice
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    // Create path
    const largeArcFlag = percentage > 0.5 ? 1 : 0;
    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    // Calculate position for label
    const labelAngle = startAngle + (endAngle - startAngle) / 2;
    const labelRadius = radius * 0.7;
    const labelX = centerX + labelRadius * Math.cos(labelAngle);
    const labelY = centerY + labelRadius * Math.sin(labelAngle);
    
    const color = item.color || defaultColors[index % defaultColors.length];
    
    // Update start angle for next slice
    startAngle = endAngle;
    
    return {
      path,
      color,
      percentage: Math.round(percentage * 100),
      labelX,
      labelY,
      label: item.label,
    };
  });

  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const StyledAnimatedSvg = styled(AnimatedSvg);

  // Generate legend
  const Legend = () => (
    <View className="flex-row flex-wrap justify-center mt-4">
      {data.map((item, index) => {
        const color = item.color || defaultColors[index % defaultColors.length];
        return (
          <View key={index} className="flex-row items-center mx-2 my-1">
            <View 
              style={{ backgroundColor: color }} 
              className="w-3 h-3 rounded-full mr-1" 
            />
            <Text className="text-xs text-custom-deep-burgundy">
              {item.label} ({Math.round((item.value / total) * 100)}%)
            </Text>
          </View>
        );
      })}
    </View>
  );

  return (
    <Animated.View 
      className="bg-white p-4 rounded-lg shadow-sm mb-4"
      style={{ opacity }}
    >
      <Text className="text-lg font-medium text-custom-deep-burgundy mb-2 text-center">
        {title}
      </Text>
      
      <StyledAnimatedSvg height={height} width={width} style={{ opacity }}>
        <G>
          {slices.map((slice, index) => (
            <Path
              key={index}
              d={slice.path}
              fill={slice.color}
              stroke="white"
              strokeWidth="1"
            />
          ))}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius / 3.5}
            fill="white"
          />
        </G>
      </StyledAnimatedSvg>
      
      <Legend />
    </Animated.View>
  );
};

export default styled(ClientStatusPieChart);
