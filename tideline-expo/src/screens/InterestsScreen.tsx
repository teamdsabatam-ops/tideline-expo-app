import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { INTEREST_OPTIONS, TRAVEL_OPTIONS, EXPLORE_OPTIONS } from '../data';

function toggle(set: Set<string>, value: string, setSet: (s: Set<string>) => void) {
  const next = new Set(set);
  if (next.has(value)) next.delete(value); else next.add(value);
  setSet(next);
}

function Pill({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.pill, selected && styles.pillSelected]}>
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function InterestsScreen({
  myInterests, setMyInterests, travelStyle, setTravelStyle, exploreStyle, setExploreStyle, onCreateProfile,
}: {
  myInterests: Set<string>; setMyInterests: (s: Set<string>) => void;
  travelStyle: Set<string>; setTravelStyle: (s: Set<string>) => void;
  exploreStyle: Set<string>; setExploreStyle: (s: Set<string>) => void;
  onCreateProfile: () => void;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ padding: 20, paddingBottom: 6 }}>
          <Text style={styles.title}>What kind of Batam experience are you looking for?</Text>
          <Text style={styles.sub}>PICK AS MANY AS YOU LIKE</Text>
        </View>
        <View style={styles.grid}>
          {INTEREST_OPTIONS.map((o) => {
            const sel = myInterests.has(o.i);
            return (
              <TouchableOpacity
                key={o.i}
                style={[styles.card, sel && styles.cardSelected]}
                onPress={() => toggle(myInterests, o.i, setMyInterests)}
              >
                <View style={[styles.iconCircle, { backgroundColor: o.bg }]}>
                  <Text style={{ fontSize: 17 }}>{o.em}</Text>
                </View>
                <Text style={[styles.cardLabel, sel && { color: colors.greenDeep }]}>{o.i}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.prefBlock}>
          <Text style={styles.prefLabel}>How do you like to travel?</Text>
          <View style={styles.pillRow}>
            {TRAVEL_OPTIONS.map((t) => (
              <Pill key={t} label={t} selected={travelStyle.has(t)} onPress={() => toggle(travelStyle, t, setTravelStyle)} />
            ))}
          </View>
        </View>
        <View style={styles.prefBlock}>
          <Text style={styles.prefLabel}>How would you like to explore?</Text>
          <View style={styles.pillRow}>
            {EXPLORE_OPTIONS.map((t) => (
              <Pill key={t} label={t} selected={exploreStyle.has(t)} onPress={() => toggle(exploreStyle, t, setExploreStyle)} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.ctaWrap}>
        <TouchableOpacity style={styles.cta} onPress={onCreateProfile} activeOpacity={0.85}>
          <Text style={styles.ctaText}>Create My Explorer Profile →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 19, fontWeight: '700', color: colors.ink, lineHeight: 25 },
  sub: { fontSize: 10.5, color: colors.inkDim, marginTop: 6, letterSpacing: 0.4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, gap: 10 },
  card: {
    width: '46%', margin: 5, backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.line,
    borderRadius: 16, paddingVertical: 14, alignItems: 'center', gap: 8,
  },
  cardSelected: { borderColor: colors.green, backgroundColor: colors.greenTint },
  iconCircle: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  cardLabel: { fontSize: 11.5, fontWeight: '600', color: colors.ink, textAlign: 'center' },
  prefBlock: { paddingHorizontal: 20, paddingTop: 16 },
  prefLabel: { fontSize: 13.5, fontWeight: '700', color: colors.ink, marginBottom: 10 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1.5, borderColor: colors.line, backgroundColor: colors.card },
  pillSelected: { backgroundColor: colors.green, borderColor: colors.green },
  pillText: { fontSize: 12, fontWeight: '600', color: colors.inkSoft },
  pillTextSelected: { color: '#fff' },
  ctaWrap: { padding: 20, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: colors.bg },
  cta: { backgroundColor: colors.green, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14.5 },
});
