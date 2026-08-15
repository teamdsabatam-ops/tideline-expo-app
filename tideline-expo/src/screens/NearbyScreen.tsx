import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { NearbyMessage, EventItem, Group } from '../types';
import { initials, avatarColor } from '../components/chatHelpers';

export default function NearbyScreen({
  msgs, events, groups, onSend, onOpenSheet,
}: {
  msgs: NearbyMessage[]; events: EventItem[]; groups: Group[];
  onSend: (text: string) => void; onOpenSheet: (id: number) => void;
}) {
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  // Scroll to the newest message whenever the list changes — without this the
  // feed can fill the screen and a sent/incoming message lands below the fold,
  // which looks exactly like sending silently failed.
  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [msgs.length]);

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.topbar}>
        <View>
          <Text style={styles.brand}>Nearby</Text>
          <Text style={styles.loc}>📍 Batam Centre Ferry Terminal</Text>
        </View>
        <Text style={styles.count}>● 23 nearby</Text>
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {msgs.map((m, idx) => {
          if (m.system) {
            return <Text key={idx} style={styles.sysMsg}>{m.text}</Text>;
          }
          const ev = m.eventId ? events.find((e) => e.id === m.eventId) : null;
          const evGroup = m.eventId ? groups.find((g) => g.eventId === m.eventId) : null;
          return (
            <View key={idx} style={[styles.msgRow, m.mine && styles.msgRowMine]}>
              <View style={[styles.avatar, { backgroundColor: avatarColor(m.user || '?') }]}>
                <Text style={styles.avatarText}>{initials(m.user || '?')}</Text>
              </View>
              <View style={[styles.msgBody, m.mine && { alignItems: 'flex-end' }]}>
                <Text style={styles.msgUser}>{m.mine ? 'you' : m.user}</Text>
                <View style={[styles.bubble, m.mine && styles.bubbleMine]}>
                  <Text style={[styles.bubbleText, m.mine && { color: '#fff' }]}>{m.text}</Text>
                  {ev && (
                    <TouchableOpacity style={styles.eventChip} onPress={() => onOpenSheet(ev.id)}>
                      <Text style={{ fontSize: 16 }}>{ev.icon}</Text>
                      <View>
                        <Text style={styles.eventChipName}>{ev.name}</Text>
                        <Text style={styles.eventChipSub}>
                          {evGroup ? `${evGroup.members.length} joined · tap to join` : `${ev.going} going · tap to start`}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={submit}
          placeholder="Ask who's up for something…"
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={submit}>
          <Text style={{ color: '#fff', fontSize: 15 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.line },
  brand: { fontWeight: '600', fontSize: 17, color: colors.ink },
  loc: { fontSize: 10.5, color: colors.inkSoft, marginTop: 3 },
  count: { fontSize: 10, color: colors.greenDeep },
  sysMsg: { alignSelf: 'center', fontSize: 10, color: colors.inkDim, textAlign: 'center', paddingVertical: 6 },
  msgRow: { flexDirection: 'row', gap: 9, maxWidth: '88%' },
  msgRowMine: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  avatar: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 11, fontWeight: '700', color: '#0b1f27' },
  msgBody: { gap: 4 },
  msgUser: { fontSize: 10.5, color: colors.mangoDeep },
  bubble: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 14, borderTopLeftRadius: 4, padding: 10 },
  bubbleMine: { backgroundColor: colors.green, borderColor: colors.green },
  bubbleText: { fontSize: 13, color: colors.ink, lineHeight: 18 },
  eventChip: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.mangoTint, borderWidth: 1, borderColor: 'rgba(244,169,62,0.5)', borderRadius: 10, padding: 9, marginTop: 6 },
  eventChipName: { fontSize: 11.5, fontWeight: '600', color: colors.ink },
  eventChipSub: { fontSize: 9.5, color: colors.mangoDeep },
  inputRow: { flexDirection: 'row', gap: 8, padding: 14, borderTopWidth: 1, borderTopColor: colors.line, alignItems: 'center' },
  input: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 11, fontSize: 13, color: colors.ink },
  sendBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
});
