import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { EventItem, Group } from '../types';
import { KIND_COLOR, MAP_LEGEND } from '../data';

export default function DiscoverScreen({
  events, groups, onOpenSheet,
}: { events: EventItem[]; groups: Group[]; onOpenSheet: (id: number) => void }) {
  const escape = [...events].filter((e) => e.kind === 'gem' || e.kind === 'local').sort((a, b) => a.going - b.going)[0];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.topbar}>
        <View>
          <Text style={styles.brand}>● Tideline</Text>
          <Text style={styles.loc}>📍 Batam Centre Ferry Terminal</Text>
        </View>
        <View style={styles.pts}><Text style={styles.ptsText}>✦ 380 pts</Text></View>
      </View>

      <View style={styles.mapWrap}>
        <View style={styles.mapYou}><View style={styles.mapYouDot} /></View>
        <Text style={styles.mapYouLabel}>You are here</Text>
        {events.map((ev) => (
          <TouchableOpacity
            key={ev.id}
            onPress={() => onOpenSheet(ev.id)}
            style={[styles.pinWrap, { top: `${ev.pos.top}%`, left: `${ev.pos.left}%` }]}
          >
            <View style={[styles.pin, { backgroundColor: KIND_COLOR[ev.kind] }]}>
              <Text style={{ fontSize: 12 }}>{ev.icon}</Text>
            </View>
            <View style={styles.pinLabel}><Text style={styles.pinLabelText}>{ev.name}</Text></View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.legend}>
        {MAP_LEGEND.map((l) => (
          <View key={l.kind} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: KIND_COLOR[l.kind] }]} />
            <Text style={styles.legendText}>{l.label}</Text>
          </View>
        ))}
      </View>

      {escape && (
        <View style={styles.escapeCard}>
          <View style={styles.escapeHead}>
            <View style={styles.escapeIcon}><Text style={{ fontSize: 17 }}>🌿</Text></View>
            <View>
              <Text style={styles.escapeTitle}>Escape the Crowd</Text>
              <Text style={styles.escapeSub}>This area is busy right now.</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.escapeExp} onPress={() => onOpenSheet(escape.id)}>
            <View style={styles.escapeMedia}><Text style={{ fontSize: 24 }}>{escape.icon}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.escapeName}>{escape.name}</Text>
              <Text style={styles.escapeMeta}>{escape.going} people going · {escape.eta.split('·')[0].trim()}</Text>
              <Text style={styles.escapeBanner}>{escape.discount} group benefit at {escape.going + escape.need} people</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.escapeBtn} onPress={() => onOpenSheet(escape.id)}>
            <Text style={styles.escapeBtnText}>View Experience →</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Near you now</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
        {events.map((ev) => {
          const pct = Math.min(100, Math.round((ev.going / (ev.going + ev.need)) * 100));
          const hasGroup = groups.some((g) => g.eventId === ev.id);
          return (
            <TouchableOpacity key={ev.id} style={styles.card} onPress={() => onOpenSheet(ev.id)}>
              <View style={styles.cardMedia}>
                <Text style={{ fontSize: 28 }}>{ev.icon}</Text>
                {hasGroup && (
                  <View style={styles.formingBadge}><Text style={styles.formingBadgeText}>Group forming</Text></View>
                )}
              </View>
              <View style={{ padding: 10 }}>
                <Text style={styles.cardName}>{ev.name}</Text>
                <Text style={styles.cardMeta}>{ev.area} · {ev.eta}</Text>
                <View style={styles.barBg}><View style={[styles.barFill, { width: `${pct}%` }]} /></View>
                <Text style={styles.cardNote}>{ev.going} going · {ev.need} more unlocks {ev.discount}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
  brand: { fontWeight: '700', fontSize: 18, color: colors.ink },
  loc: { fontSize: 10.5, color: colors.inkSoft, marginTop: 3 },
  pts: { backgroundColor: colors.mangoTint, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 6 },
  ptsText: { color: colors.mangoDeep, fontWeight: '700', fontSize: 11 },
  mapWrap: { margin: 16, height: 190, borderRadius: 20, backgroundColor: '#d9ecc9', overflow: 'hidden', borderWidth: 1, borderColor: colors.line },
  mapYou: { position: 'absolute', top: '40%', left: '22%' },
  mapYouDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#3f8fd9', borderWidth: 3, borderColor: 'rgba(63,143,217,0.35)' },
  mapYouLabel: { position: 'absolute', top: '42%', left: '26%', fontSize: 9, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, color: colors.ink },
  pinWrap: { position: 'absolute', alignItems: 'center' },
  pin: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  pinLabel: { marginTop: 3, backgroundColor: 'rgba(255,255,255,0.95)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 7 },
  pinLabelText: { fontSize: 8, fontWeight: '600', color: colors.ink },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, paddingHorizontal: 20, paddingBottom: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 9, height: 9, borderRadius: 5 },
  legendText: { fontSize: 9.5, color: colors.inkSoft },
  escapeCard: { margin: 16, marginTop: 12, backgroundColor: colors.card, borderRadius: 18, borderWidth: 1, borderColor: colors.line, padding: 16 },
  escapeHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  escapeIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.greenTint, alignItems: 'center', justifyContent: 'center' },
  escapeTitle: { fontWeight: '700', fontSize: 14.5, color: colors.ink },
  escapeSub: { fontSize: 11, color: colors.inkSoft, marginTop: 2 },
  escapeExp: { flexDirection: 'row', gap: 12, marginTop: 14 },
  escapeMedia: { width: 60, height: 60, borderRadius: 12, backgroundColor: colors.greenTint, alignItems: 'center', justifyContent: 'center' },
  escapeName: { fontWeight: '600', fontSize: 13.5, color: colors.ink },
  escapeMeta: { fontSize: 10, color: colors.inkDim, marginTop: 5 },
  escapeBanner: { fontSize: 10, color: colors.mangoDeep, backgroundColor: colors.mangoTint, padding: 6, borderRadius: 9, marginTop: 8 },
  escapeBtn: { marginTop: 14, backgroundColor: colors.green, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  escapeBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  sectionHead: { paddingHorizontal: 20, paddingTop: 6, paddingBottom: 10 },
  sectionTitle: { fontWeight: '600', fontSize: 15, color: colors.ink },
  card: { width: 170, backgroundColor: colors.card, borderRadius: 16, borderWidth: 1, borderColor: colors.line, overflow: 'hidden' },
  cardMedia: { height: 80, backgroundColor: colors.greenTint, alignItems: 'center', justifyContent: 'center' },
  formingBadge: { position: 'absolute', top: 7, left: 7, backgroundColor: 'rgba(31,157,85,0.92)', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  formingBadgeText: { fontSize: 8.5, color: '#fff', fontWeight: '700', textTransform: 'uppercase' },
  cardName: { fontWeight: '600', fontSize: 13.5, color: colors.ink },
  cardMeta: { fontSize: 9.5, color: colors.inkDim, marginTop: 4 },
  barBg: { height: 5, borderRadius: 3, backgroundColor: colors.bgSoft, marginTop: 9, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: colors.green },
  cardNote: { fontSize: 10, color: colors.inkSoft, marginTop: 5 },
});
