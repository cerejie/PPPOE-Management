import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { clsx } from 'clsx';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ title, className, ...props }) => (
  <TouchableOpacity {...props} style={props.style} className={clsx('bg-blue-500 py-2 px-4 rounded', className)}>
    <Text className="text-white text-center font-bold">{title}</Text>
  </TouchableOpacity>
);

export default Button;
