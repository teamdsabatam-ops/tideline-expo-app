import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native';
import { colors } from '../theme';
import { EventItem } from '../types';

export default function EventSheet({
  event, alreadyJoined, onClose, onShare, onJoin,
}: { event: EventItem; alreadyJoined: boolean; onClose: () => void; onShare: () => void; onJoin: () => void }) {
  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={{ fontSize: 34 }}>{event.icon}</Text>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.meta}>{event.area} · {event.eta} · {event.cat}</Text>
          <Text style={styles.desc}>{event.desc}</Text>

          <Text style={styles.tiersLabel}>GROUP DISCOUNT TIERS</Text>
          <View style={styles.tierRow}>
            <Text style={styles.tierText}>{event.going} going now</Text>
            <View style={styles.tierBadge}><Text style={styles.tierBadgeText}>current</Text></View>
          </View>
          <View style={styles.tierRow}>
            <Text style={styles.tierText}>Group of {event.going + event.need}</Text>
            <View style={styles.tierBadge}><Text style={styles.tierBadgeText}>{event.discount} off</Text></View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.outlineBtn} onPress={onShare}>
              <Text style={styles.outlineBtnText}>Share event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fillBtn} onPress={onJoin}>
              <Text style={styles.fillBtnText}>{alreadyJoined ? 'Join Group' : 'Start Group'}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(20,36,27,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.card, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 30 },
  handle: { width: 36, height: 4, backgroundColor: colors.line, borderRadius: 2, alignSelf: 'center', marginBottom: 14 },
  title: { fontWeight: '700', fontSize: 21, color: colors.ink, marginTop: 6 },
  meta: { fontSize: 11, color: colors.inkSoft, marginTop: 4 },
  desc: { fontSize: 13, lineHeight: 19, color: colors.inkSoft, marginTop: 12 },
  tiersLabel: { fontSize: 9.5, color: colors.inkDim, letterSpacing: 0.6, marginTop: 18, marginBottom: 6 },
  tierRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.line },
  tierText: { fontSize: 12.5, color: colors.ink },
  tierBadge: { backgroundColor: colors.greenTint, borderRadius: 8, paddingHorizontal: 9, paddingVertical: 3 },
  tierBadgeText: { fontSize: 10.5, fontWeight: '600', color: colors.greenDeep },
  actions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  outlineBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center' },
  outlineBtnText: { color: colors.ink, fontWeight: '700', fontSize: 13 },
  fillBtn: { flex: 1.4, paddingVertical: 13, borderRadius: 12, backgroundColor: colors.green, alignItems: 'center' },
  fillBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
});
