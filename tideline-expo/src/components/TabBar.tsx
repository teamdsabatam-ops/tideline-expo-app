import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Screen } from '../types';

const TABS: { key: Screen; label: string; icon: string }[] = [
  { key: 'discover', label: 'Discover', icon: '🧭' },
  { key: 'nearby', label: 'Nearby', icon: '💬' },
  { key: 'groups', label: 'Groups', icon: '👥' },
  { key: 'profile', label: 'Profile', icon: '🙂' },
];

export default function TabBar({ active, onChange }: { active: Screen; onChange: (s: Screen) => void }) {
  return (
    <View style={styles.bar}>
      {TABS.map((t) => (
        <TouchableOpacity key={t.key} style={styles.tab} onPress={() => onChange(t.key)}>
          <Text style={{ fontSize: 18, opacity: active === t.key ? 1 : 0.4 }}>{t.icon}</Text>
          <Text style={[styles.label, active === t.key && { color: colors.green }]}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: 'rgba(255,255,255,0.96)', paddingTop: 8, paddingBottom: 10 },
  tab: { flex: 1, alignItems: 'center', gap: 4 },
  label: { fontSize: 8.5, textTransform: 'uppercase', color: colors.inkDim },
});
