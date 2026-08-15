import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Group } from '../types';
import { initials, avatarColor } from '../components/chatHelpers';

export default function ThreadScreen({
  group, username, onBack, onSend,
}: { group: Group; username: string; onBack: () => void; onSend: (text: string) => void }) {
  const [text, setText] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [group.messages.length]);

  const submit = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.header}>
        <View style={styles.backRow}>
          <TouchableOpacity onPress={onBack}><Text style={{ fontSize: 18, color: colors.ink }}>←</Text></TouchableOpacity>
          <Text style={styles.headerLabel}>GROUP THREAD</Text>
        </View>
        <View style={styles.ticket}>
          <View style={styles.routeRow}>
            <Text style={styles.routePoint}>{group.from}</Text>
            <Text> ⛴️ </Text>
            <Text style={styles.routePoint}>{group.to}</Text>
          </View>
          <View style={styles.ticketSub}>
            <Text style={styles.progress}>{group.members.length} joined · leaves {group.leaves}</Text>
            <Text style={styles.discount}>
              {group.need > 0 ? `${group.need} more unlocks ${group.discount}` : `${group.discount} unlocked`}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {group.messages.map((m, idx) => {
          if (m.sys) return <Text key={idx} style={styles.sysMsg}>{m.text}</Text>;
          const mine = m.user === username;
          return (
            <View key={idx} style={[styles.msgRow, mine && styles.msgRowMine]}>
              <View style={[styles.avatar, { backgroundColor: avatarColor(m.user) }]}>
                <Text style={styles.avatarText}>{initials(m.user)}</Text>
              </View>
              <View style={[styles.msgBody, mine && { alignItems: 'flex-end' }]}>
                <Text style={styles.msgUser}>{mine ? 'you' : m.user}</Text>
                <View style={[styles.bubble, mine && styles.bubbleMine]}>
                  <Text style={[styles.bubbleText, mine && { color: '#fff' }]}>{m.text}</Text>
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
          placeholder="Coordinate the ride, split a Grab…"
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
  header: { padding: 16, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.line },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  headerLabel: { fontSize: 10, color: colors.inkDim, letterSpacing: 0.6 },
  ticket: { backgroundColor: colors.card, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.line },
  routeRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  routePoint: { fontSize: 10.5, fontWeight: '700', color: colors.ink },
  ticketSub: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 9 },
  progress: { fontSize: 10, color: colors.inkSoft },
  discount: { fontSize: 10.5, fontWeight: '700', color: colors.coralDeep, backgroundColor: colors.coralTint, paddingHorizontal: 9, paddingVertical: 3, borderRadius: 8 },
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
  inputRow: { flexDirection: 'row', gap: 8, padding: 14, borderTopWidth: 1, borderTopColor: colors.line, alignItems: 'center' },
  input: { flex: 1, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, borderRadius: 20, paddingHorizontal: 15, paddingVertical: 11, fontSize: 13, color: colors.ink },
  sendBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
});
