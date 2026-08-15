import React, { useState, useRef, useCallback } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import { colors } from './src/theme';
import {
  EVENTS_SEED, GROUPS_SEED, NEARBY_MSGS_SEED, NAME_POOL, REPLY_POS, REPLY_NEU, THREAD_POS,
} from './src/data';
import { EventItem, Group, NearbyMessage, Screen } from './src/types';

import WelcomeScreen from './src/screens/WelcomeScreen';
import InterestsScreen from './src/screens/InterestsScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import NearbyScreen from './src/screens/NearbyScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import ThreadScreen from './src/screens/ThreadScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EventSheet from './src/components/EventSheet';
import TabBar from './src/components/TabBar';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [username, setUsername] = useState('WanderingKoala');
  const [myInterests, setMyInterests] = useState<Set<string>>(
    new Set(['Nature & Wildlife', 'Cafes & Food', 'Beaches']),
  );
  const [travelStyle, setTravelStyle] = useState<Set<string>>(new Set(['Quiet experiences']));
  const [exploreStyle, setExploreStyle] = useState<Set<string>>(new Set(['Eco Explorer']));

  const [events, setEvents] = useState<EventItem[]>(EVENTS_SEED.map((e) => ({ ...e })));
  const [groups, setGroups] = useState<Group[]>(GROUPS_SEED.map((g) => ({ ...g, members: [...g.members], messages: [...g.messages] })));
  const [nearbyMsgs, setNearbyMsgs] = useState<NearbyMessage[]>([...NEARBY_MSGS_SEED]);
  const [sheetEventId, setSheetEventId] = useState<number | null>(null);
  const [threadGroupId, setThreadGroupId] = useState<number | null>(null);
  const [tabbarVisible, setTabbarVisible] = useState(false);

  // groups/events/nearbyMsgs are read inside timers and inside processJoin below;
  // refs keep those callbacks seeing current state without re-subscribing on
  // every keystroke/render, and let processJoin resolve synchronously.
  const groupsRef = useRef(groups); groupsRef.current = groups;
  const eventsRef = useRef(events); eventsRef.current = events;
  const nearbyMsgsRef = useRef(nearbyMsgs); nearbyMsgsRef.current = nearbyMsgs;

  /* ---------------- onboarding ---------------- */
  const goToInterests = useCallback(() => setScreen('interests'), []);
  const enterApp = useCallback(() => {
    // Normalize the seeded "you" placeholder to the real chosen username —
    // this exact mismatch is what used to make "Join Group" look like it
    // opened a brand-new single-member group instead of the existing one.
    setGroups((gs) => gs.map((g) => ({ ...g, members: g.members.map((m) => (m === 'you' ? username : m)) })));
    setTabbarVisible(true);
    setScreen('discover');
  }, [username]);

  /* ---------------- join / redirect (the part that was buggy before) ---------------- */
  // Always resolves to the ONE existing group for an event (keyed by eventId).
  // Computed once from the latest known state (via refs) rather than nested
  // setState updaters, so there's a single source of truth for "does a group
  // already exist" and no risk of a duplicate single-member group being created.
  // Returns the group's id synchronously so the caller can navigate immediately.
  const processJoin = useCallback((eventId: number, name: string): number => {
    const ev = eventsRef.current.find((e) => e.id === eventId);
    if (!ev) return 0;

    const list = groupsRef.current.map((g) => ({ ...g, members: [...g.members], messages: [...g.messages] }));
    let g = list.find((x) => x.eventId === eventId);
    if (!g) {
      g = { id: Date.now() + Math.random(), eventId, from: 'Batam Centre Ferry Terminal', to: ev.name, members: [], need: ev.need, discount: ev.discount, leaves: 'in 45 min', messages: [] };
      list.push(g);
    }

    if (!g.members.includes(name)) {
      g.members.push(name);
      let newNeed = ev.need;
      let newGoing = ev.going;
      if (ev.need > 0) { newNeed -= 1; newGoing += 1; }
      g.need = newNeed;
      const sysText = g.members.length === 1 ? `${name} started this group. Say hi and plan the ride!` : `${name} joined the group`;
      g.messages.push({ user: 'system-note', text: sysText, time: 'now', sys: true });
      if (g.need === 0 && g.members.length > 1) {
        g.messages.push({ user: 'system-note', text: `🎉 Group of ${g.members.length} unlocked ${g.discount} off!`, time: 'now', sys: true });
      }
      setEvents((evs) => evs.map((e) => (e.id === eventId ? { ...e, need: newNeed, going: newGoing } : e)));
    }

    setGroups(list);
    groupsRef.current = list; // so an immediate follow-up call sees the fresh group too
    return g.id;
  }, []);

  const openThread = useCallback((groupId: number) => {
    setThreadGroupId(groupId);
    setScreen('thread');
  }, []);

  const joinGroup = useCallback((eventId: number) => {
    const groupId = processJoin(eventId, username);
    setSheetEventId(null);
    if (groupId) openThread(groupId);
  }, [processJoin, username, openThread]);

  const shareEvent = useCallback((eventId: number) => {
    const ev = events.find((e) => e.id === eventId);
    if (!ev) return;
    setNearbyMsgs((ms) => [...ms, { user: username, text: `shared an event — who's in for ${ev.name}?`, eventId, time: 'now', mine: true }]);
    setSheetEventId(null);
    setScreen('nearby');
  }, [events, username]);

  /* ---------------- nearby chat ---------------- */
  const sendNearby = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setNearbyMsgs((ms) => [...ms, { user: username, text: trimmed, time: 'now', mine: true }]);
    setTimeout(() => {
      const used = new Set(nearbyMsgsRef.current.filter((m) => m.user).map((m) => m.user));
      const pool = NAME_POOL.filter((n) => !used.has(n));
      const name = pool[Math.floor(Math.random() * pool.length)] || 'ren.tan';
      const reply = Math.random() < 0.7 ? REPLY_POS[Math.floor(Math.random() * REPLY_POS.length)] : REPLY_NEU[Math.floor(Math.random() * REPLY_NEU.length)];
      setNearbyMsgs((ms) => [...ms, { user: name, text: reply, time: 'now' }]);
    }, 1200);
  }, [username]);

  /* ---------------- group thread chat ---------------- */
  const sendThread = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || threadGroupId == null) return;
    setGroups((gs) => gs.map((g) => (g.id === threadGroupId ? { ...g, messages: [...g.messages, { user: username, text: trimmed, time: 'now' }] } : g)));
    setTimeout(() => {
      const g = groupsRef.current.find((x) => x.id === threadGroupId);
      const others = g ? g.members.filter((m) => m !== username) : [];
      if (others.length === 0) return;
      const name = others[Math.floor(Math.random() * others.length)];
      const reply = THREAD_POS[Math.floor(Math.random() * THREAD_POS.length)];
      setGroups((gs) => gs.map((gr) => (gr.id === threadGroupId ? { ...gr, messages: [...gr.messages, { user: name, text: reply, time: 'now' }] } : gr)));
    }, 1100);
  }, [threadGroupId, username]);

  const sheetEvent = sheetEventId != null ? events.find((e) => e.id === sheetEventId) || null : null;
  const currentGroup = threadGroupId != null ? groups.find((g) => g.id === threadGroupId) || null : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        {screen === 'welcome' && (
          <WelcomeScreen username={username} setUsername={setUsername} onStart={goToInterests} />
        )}
        {screen === 'interests' && (
          <InterestsScreen
            myInterests={myInterests} setMyInterests={setMyInterests}
            travelStyle={travelStyle} setTravelStyle={setTravelStyle}
            exploreStyle={exploreStyle} setExploreStyle={setExploreStyle}
            onCreateProfile={enterApp}
          />
        )}
        {screen === 'discover' && (
          <DiscoverScreen events={events} groups={groups} onOpenSheet={(id) => setSheetEventId(id)} />
        )}
        {screen === 'nearby' && (
          <NearbyScreen
            msgs={nearbyMsgs} events={events} groups={groups}
            onSend={sendNearby} onOpenSheet={(id) => setSheetEventId(id)}
          />
        )}
        {screen === 'groups' && (
          <GroupsScreen groups={groups} onOpenThread={openThread} />
        )}
        {screen === 'thread' && currentGroup && (
          <ThreadScreen group={currentGroup} username={username} onBack={() => setScreen('groups')} onSend={sendThread} />
        )}
        {screen === 'profile' && (
          <ProfileScreen username={username} myInterests={myInterests} setMyInterests={setMyInterests} />
        )}
      </View>

      {sheetEvent && (
        <EventSheet
          event={sheetEvent}
          alreadyJoined={!!groups.find((g) => g.eventId === sheetEvent.id)}
          onClose={() => setSheetEventId(null)}
          onShare={() => shareEvent(sheetEvent.id)}
          onJoin={() => joinGroup(sheetEvent.id)}
        />
      )}

      {tabbarVisible && screen !== 'thread' && screen !== 'welcome' && screen !== 'interests' && (
        <TabBar active={screen} onChange={setScreen} />
      )}
    </SafeAreaView>
  );
}
