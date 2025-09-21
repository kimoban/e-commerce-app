import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ visible, onClose, children, title }) => (
  <RNModal visible={visible} transparent animationType="fade">
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '80%' }}>
        {title && <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>{title}</Text>}
        {children}
        <TouchableOpacity onPress={onClose} style={{ marginTop: 16, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#2563eb', borderRadius: 8 }}>
          <Text style={{ color: '#fff', textAlign: 'center' }}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </RNModal>
);

export default Modal;
