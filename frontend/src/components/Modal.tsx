import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children }) => (
  <RNModal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View>{children}</View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close modal" accessibilityRole="button">
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </RNModal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Modal;
