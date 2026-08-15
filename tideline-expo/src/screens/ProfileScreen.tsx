import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { INTEREST_OPTIONS } from '../data';

export default function ProfileScreen({
  username, myInterests, setMyInterests,
}: { username: string; myInterests: Set<string>; setMyInterests: (s: Set<string>) => void }) {
  const toggle = (i: string) => {
    const next = new Set(myInterests);
    if (next.has(i)) next.delete(i); else next.add(i);
    setMyInterests(next);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.head}>
        <View style={styles.avatar}><Text style={{ fontSize: 34 }}>🐨</Text></View>
        <Text style={styles.username}>@{username}</Text>
        <Text style={styles.level}>🌿 Eco Explorer · Level 4</Text>
      </View>

      <View style={styles.statRow}>
        <View style={styles.stat}><Text style={styles.statNum}>380</Text><Text style={styles.statLabel}>🍃 Eco Points</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>📍 Places</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>6</Text><Text style={styles.statLabel}>👥 Trips</Text></View>
      </View>

      <View style={styles.impactCard}>
        <Text style={styles.impactTitle}>Your Impact</Text>
        <Text style={styles.impactRow}>🏪 Supported <Text style={styles.bold}>7</Text> local businesses</Text>
        <Text style={styles.impactRow}>🧑‍🤝‍🧑 Travelled with <Text style={styles.bold}>18</Text> travellers</Text>
        <Text style={styles.impactRow}>💎 Explored <Text style={styles.bold}>5</Text> hidden gems</Text>
        <Text style={styles.impactRow}>✅ Completed <Text style={styles.bold}>4</Text> low-impact trips</Text>
      </View>

      <View style={styles.sectionHead}>
        <Text style={styles.sectionTitle}>Batam Explorer Passport</Text>
        <Text style={styles.sectionSub}>5 / 6 Badges</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
        {[
          { icon: '🌿', label: 'MANGROVE EXPLORER', bg: colors.greenTint },
          { icon: '☕', label: 'CAFÉ EXPLORER', bg: colors.mangoTint },
          { icon: '🎭', label: 'CULTURAL EXPLORER', bg: colors.purpleTint },
          { icon: '🌅', label: 'SUNSET EXPLORER', bg: colors.coralTint },
          { icon: '🏖️', label: 'BEACH EXPLORER', bg: colors.blueTint },
          { icon: '🔒', label: 'NIGHT OWL', bg: colors.bgSoft },
        ].map((b, i) => (
          <View key={i} style={[styles.badge, i === 5 && { opacity: 0.5 }]}>
            <View style={[styles.badgeIcon, { backgroundColor: b.bg }]}><Text style={{ fontSize: 16 }}>{b.icon}</Text></View>
            <Text style={styles.badgeLabel}>{b.label}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Rewards</Text></View>
      <View style={styles.rewardsRow}>
        <View style={styles.rewardCard}>
          <Text style={{ fontSize: 20 }}>🎟️</Text>
          <Text style={styles.rewardLabel}>CURRENT REWARD</Text>
          <Text style={styles.rewardValue}>$5 Local Voucher</Text>
        </View>
        <View style={styles.rewardCard}>
          <Text style={{ fontSize: 20 }}>🎁</Text>
          <Text style={styles.rewardLabel}>NEXT MILESTONE</Text>
          <Text style={styles.rewardValue}>500 pts</Text>
        </View>
      </View>

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Your interests</Text></View>
      <View style={styles.chipGrid}>
        {INTEREST_OPTIONS.map((o) => {
          const sel = myInterests.has(o.i);
          return (
            <TouchableOpacity key={o.i} onPress={() => toggle(o.i)} style={[styles.chip, sel && styles.chipSelected]}>
              <Text style={[styles.chipText, sel && { color: '#fff' }]}>{o.em} {o.i}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.tagline}>"Meet new people. Create new stories."</Text>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  avatar: { width: 78, height: 78, borderRadius: 39, backgroundColor: colors.greenTint, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  username: { fontSize: 19, fontWeight: '700', color: colors.ink },
  level: { fontSize: 11, color: colors.greenDeep, marginTop: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-around', margin: 16, padding: 16, backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.line },
  stat: { alignItems: 'center' },
  statNum: { fontSize: 19, fontWeight: '700', color: colors.ink },
  statLabel: { fontSize: 8.5, color: colors.inkDim, marginTop: 3, textTransform: 'uppercase' },
  impactCard: { margin: 16, marginTop: 4, backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.line, padding: 16 },
  impactTitle: { fontWeight: '700', fontSize: 14.5, color: colors.ink, marginBottom: 10 },
  impactRow: { fontSize: 12.5, color: colors.inkSoft, paddingVertical: 6 },
  bold: { color: colors.ink, fontWeight: '700' },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 6, paddingBottom: 10 },
  sectionTitle: { fontWeight: '600', fontSize: 15, color: colors.ink },
  sectionSub: { fontSize: 10, color: colors.greenDeep, fontWeight: '600' },
  badge: { width: 80, alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 6 },
  badgeIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  badgeLabel: { fontSize: 8, color: colors.inkSoft, marginTop: 8, textAlign: 'center' },
  rewardsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20 },
  rewardCard: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 16, padding: 14 },
  rewardLabel: { fontSize: 8.5, color: colors.inkDim, marginTop: 8 },
  rewardValue: { fontWeight: '600', fontSize: 13, color: colors.ink, marginTop: 4 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20 },
  chip: { paddingHorizontal: 13, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.card },
  chipSelected: { backgroundColor: colors.green, borderColor: colors.green },
  chipText: { fontSize: 12, fontWeight: '600', color: colors.inkSoft },
  tagline: { textAlign: 'center', fontStyle: 'italic', fontSize: 13, color: colors.inkSoft, marginTop: 16 },
});
