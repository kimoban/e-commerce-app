import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';


interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
}



const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, disabled = false }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={title}
    accessibilityState={{ disabled }}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    className={`px-4 py-3 rounded-lg ${disabled ? 'opacity-50' : ''}`}
    style={[{ backgroundColor: '#2563eb', minHeight: 44, justifyContent: 'center' }, style]}
  >
    <Text className="text-white text-center font-semibold" style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
