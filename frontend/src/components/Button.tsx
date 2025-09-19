import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, style, textStyle, accessibilityLabel }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[styles.button, style, disabled && styles.disabled]}
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabled: {
    backgroundColor: '#a5b4fc',
  },
});

export default Button;
