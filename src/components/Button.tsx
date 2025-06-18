import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { clsx } from 'clsx';
import { useThemeStore } from '../store';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  className, 
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
  ...props 
}) => {
  const { secondaryColor } = useThemeStore();
  
  // Determine background color based on variant
  let backgroundColor = '#643843';
  let textColor = '#FFFFFF';
  let borderColor = 'transparent';
  
  if (variant === 'secondary') {
    backgroundColor = '#FFFFFF';
    textColor = secondaryColor;
    borderColor = secondaryColor;
  } else if (variant === 'outline') {
    backgroundColor = 'transparent';
    textColor = secondaryColor;
    borderColor = secondaryColor;
  } else {
    // Use the secondary color from our theme for the primary variant
    backgroundColor = secondaryColor;
  }
  
  // Determine padding based on size
  let paddingVertical = 10;
  let paddingHorizontal = 20;
  let fontSize = 16;
  
  if (size === 'small') {
    paddingVertical = 6;
    paddingHorizontal = 12;
    fontSize = 14;
  } else if (size === 'large') {
    paddingVertical = 14;
    paddingHorizontal = 28;
    fontSize = 18;
  }
  
  return (
    <TouchableOpacity 
      {...props} 
      className={clsx('rounded-md', className)}
      style={[
        {
          backgroundColor,
          borderColor,
          borderWidth: variant !== 'primary' ? 1 : 0,
          paddingVertical,
          paddingHorizontal,
          borderRadius: 6,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style
      ]}
    >
      <Text 
        style={[
          { color: textColor, fontSize, fontWeight: 'bold', textAlign: 'center' },
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
