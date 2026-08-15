import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function WelcomeScreen({
  username, setUsername, onStart,
}: { username: string; setUsername: (v: string) => void; onStart: () => void }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.hero}>
        <View style={styles.heroScrim} />
        <View style={styles.heroContent}>
          <View style={styles.brandRow}>
            <Text style={styles.brandWhite}>● Tideline</Text>
            <Text style={styles.locChip}>📍 Batam Centre</Text>
          </View>
          <Text style={styles.heroTitle}>Go beyond{'\n'}the crowd.</Text>
          <Text style={styles.heroSub}>Discover hidden Batam. Find your people. Travel lighter.</Text>
        </View>
      </View>

      <View style={styles.sheet}>
        <Text style={styles.welcomeTitle}>Welcome to Batam! 👋</Text>
        <Text style={styles.welcomeSub}>
          Discover experiences matched to your interests, meet travellers nearby and explore
          beyond the usual tourist trail.
        </Text>
        <Text style={styles.fieldLabel}>Boarding as</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="e.g. WanderingKoala"
          style={styles.input}
        />
        <TouchableOpacity style={styles.cta} onPress={onStart} activeOpacity={0.85}>
          <Text style={styles.ctaText}>Start Exploring →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1.1, backgroundColor: '#cfe9c9' },
  heroScrim: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(10,26,18,0.38)',
  },
  heroContent: { flex: 1, padding: 22, justifyContent: 'space-between' },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandWhite: { color: '#fff', fontSize: 18, fontWeight: '700' },
  locChip: { color: 'rgba(255,255,255,0.9)', fontSize: 11, backgroundColor: 'rgba(10,26,18,0.35)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  heroTitle: { color: '#fff', fontSize: 32, fontWeight: '700', lineHeight: 36, marginTop: 10 },
  heroSub: { color: 'rgba(255,255,255,0.92)', fontSize: 13, lineHeight: 19, maxWidth: 280 },
  sheet: {
    backgroundColor: colors.card, borderTopLeftRadius: 26, borderTopRightRadius: 26,
    marginTop: -22, padding: 22, flex: 1,
  },
  welcomeTitle: { fontSize: 20, fontWeight: '700', color: colors.ink },
  welcomeSub: { fontSize: 12.5, color: colors.inkSoft, lineHeight: 19, marginTop: 8 },
  fieldLabel: { fontSize: 10, color: colors.inkDim, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 16, marginBottom: 6 },
  input: {
    borderWidth: 1.5, borderColor: colors.line, borderRadius: 12, backgroundColor: colors.bgSoft,
    paddingHorizontal: 13, paddingVertical: 11, fontSize: 13.5, fontWeight: '600', color: colors.ink,
  },
  cta: {
    marginTop: 'auto', backgroundColor: colors.green, borderRadius: 14, paddingVertical: 15, alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '700', fontSize: 14.5 },
});
