import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styled } from 'nativewind';


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
    style={[{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: '#2563eb', opacity: disabled ? 0.5 : 1 }, style]}
  >
    <Text style={[{ color: '#fff', textAlign: 'center', fontWeight: '600' }, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

export default Button;
