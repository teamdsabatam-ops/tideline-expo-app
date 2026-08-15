import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Group } from '../types';
import { initials, avatarColor } from '../components/chatHelpers';

export default function GroupsScreen({
  groups, onOpenThread,
}: { groups: Group[]; onOpenThread: (groupId: number) => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.topbar}>
        <Text style={styles.brand}>Your groups</Text>
        <Text style={styles.loc}>Point A → Point B, planned together</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        {groups.length === 0 && (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 10 }}>🧭</Text>
            <Text style={{ fontWeight: '600', fontSize: 15, color: colors.ink }}>No groups yet</Text>
            <Text style={{ fontSize: 13, color: colors.inkSoft, textAlign: 'center', marginTop: 6, lineHeight: 19 }}>
              Join an event from Discover, or say you're in on Nearby chat — a travel group opens
              automatically once someone bites.
            </Text>
          </View>
        )}
        {groups.map((g) => {
          const pct = Math.min(100, Math.round((g.members.length / (g.members.length + Math.max(0, g.need))) * 100));
          return (
            <TouchableOpacity key={g.id} style={styles.card} onPress={() => onOpenThread(g.id)}>
              <View style={styles.routeRow}>
                <Text style={styles.routePoint}>{g.from}</Text>
                <Text style={styles.routeIcon}> ⛴️ </Text>
                <Text style={styles.routePoint}>{g.to}</Text>
              </View>
              <View style={styles.barBg}><View style={[styles.barFill, { width: `${pct}%` }]} /></View>
              <View style={styles.foot}>
                <View style={{ flexDirection: 'row' }}>
                  {g.members.slice(0, 4).map((m, i) => (
                    <View key={m + i} style={[styles.mAvatar, { backgroundColor: avatarColor(m), marginLeft: i === 0 ? 0 : -7 }]}>
                      <Text style={styles.mAvatarText}>{initials(m)}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.leavesChip}>{g.members.length} joined · leaves {g.leaves}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: { padding: 18, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
  brand: { fontWeight: '600', fontSize: 17, color: colors.ink },
  loc: { fontSize: 10.5, color: colors.inkSoft, marginTop: 3 },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 14 },
  routeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 9, flexWrap: 'wrap' },
  routePoint: { fontSize: 10.5, color: colors.ink, fontWeight: '600' },
  routeIcon: { fontSize: 13 },
  barBg: { height: 5, borderRadius: 3, backgroundColor: colors.bgSoft, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.green },
  foot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  mAvatar: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.card, alignItems: 'center', justifyContent: 'center' },
  mAvatarText: { fontSize: 9, fontWeight: '700', color: '#0b1f27' },
  leavesChip: { fontSize: 10, color: colors.mangoDeep, backgroundColor: colors.mangoTint, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
});
