import React from 'react';
import { TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  error?: string;
  accessibilityLabel?: string;
};

const Input: React.FC<InputProps> = ({ value, onChangeText, placeholder, secureTextEntry, style, textStyle, error, accessibilityLabel }) => (
  <>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={[styles.input, style, textStyle]}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="none"
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 4,
  },
});

export default Input;
