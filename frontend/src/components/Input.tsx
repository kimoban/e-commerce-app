import React from 'react';
import { TextInput, TextInputProps } from 'react-native';


interface InputProps extends TextInputProps {
  style?: any;
}

const Input: React.FC<InputProps> = ({ style, ...props }) => (
  <TextInput
    style={[{ borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8 }, style]}
    {...props}
  />
);

export default Input;
