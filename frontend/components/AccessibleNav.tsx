import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface NavItem {
  label: string;
  onPress: () => void;
  active?: boolean;
}

interface AccessibleNavProps {
  items: NavItem[];
}

const AccessibleNav: React.FC<AccessibleNavProps> = ({ items }) => (
  <View style={styles.nav} accessibilityRole="none">
    {items.map((item, idx) => (
      <TouchableOpacity
        key={item.label}
        onPress={item.onPress}
        style={[styles.item, item.active && styles.active]}
        accessibilityLabel={item.label}
        accessibilityRole="link"
        accessibilityState={{ selected: !!item.active }}
      >
        <Text style={styles.text}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f3f4f6',
    paddingVertical: 12,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  active: {
    backgroundColor: '#2563eb',
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
});

export default AccessibleNav;
