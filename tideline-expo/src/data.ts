import { EventItem, Group, InterestOption, NearbyMessage } from './types';

export const KIND_COLOR: Record<string, string> = {
  gem: '#1f9d55',
  local: '#f4a93e',
  event: '#4a90d9',
  group: '#9b6bd6',
  crowded: '#e8563e',
};
export const KIND_TINT: Record<string, string> = {
  gem: '#eef8f1',
  local: '#fdf1dd',
  event: '#e4eefb',
  group: '#f0e7fa',
  crowded: '#fbe6e1',
};

export const EVENTS_SEED: EventItem[] = [
  { id: 1, name: 'Vovo Beach Club', cat: 'Beach Club', tag: 'popular', kind: 'crowded', icon: '🏖️', going: 4, need: 4, discount: '10%', area: 'Nongsa', eta: '25 min · ferry + car', pos: { top: 26, left: 58 }, desc: 'Sunset DJ set right on the water. Beachfront loungers, cocktails, and a crowd that only gets bigger after dark.' },
  { id: 2, name: 'Kampung Tua Nongsa', cat: 'Village walk', tag: 'gem', kind: 'gem', icon: '🌿', going: 2, need: 2, discount: '15%', area: 'Nongsa Village', eta: '15 min · grab', pos: { top: 20, left: 78 }, desc: 'A stilted fishing village barely on the tourist map. Locals will show you the mangrove boardwalk if you ask nicely.' },
  { id: 3, name: 'Kedai Kopi Playground', cat: 'Cafe', tag: 'gem', kind: 'local', icon: '☕', going: 1, need: 3, discount: '20%', area: 'Batam Centre', eta: '8 min walk', pos: { top: 55, left: 70 }, desc: 'Third-wave coffee in a converted shophouse. The owner roasts small batches from Sumatra.' },
  { id: 4, name: 'Barelang Bridge Sunset Point', cat: 'Viewpoint', tag: 'gem', kind: 'event', icon: '🌉', going: 3, need: 1, discount: 'free entry pass', area: 'Barelang', eta: '35 min · grab', pos: { top: 48, left: 15 }, desc: 'Six bridges strung across the islands. Locals gather here at golden hour — bring a jacket.' },
  { id: 5, name: 'Tanjung Pinggir Sunset Beach', cat: 'Beach Club', tag: 'popular', kind: 'group', icon: '🌊', going: 6, need: 2, discount: '12%', area: 'Tanjung Pinggir', eta: '20 min · car', pos: { top: 65, left: 40 }, desc: 'Watch container ships glide past Singapore\u2019s skyline while the sun goes down.' },
];

export const MAP_LEGEND: { label: string; kind: string }[] = [
  { label: 'Hidden Gem', kind: 'gem' },
  { label: 'Local Business', kind: 'local' },
  { label: 'Event', kind: 'event' },
  { label: 'Group Going', kind: 'group' },
  { label: 'Crowded Area', kind: 'crowded' },
];

export const INTEREST_OPTIONS: InterestOption[] = [
  { i: 'Nature & Wildlife', em: '🌿', bg: '#eef8f1' },
  { i: 'Hiking & Adventure', em: '🥾', bg: '#fdf1dd' },
  { i: 'Beaches', em: '🌊', bg: '#e4eefb' },
  { i: 'Cafes & Food', em: '☕', bg: '#fdf1dd' },
  { i: 'Photography', em: '📷', bg: '#f0e7fa' },
  { i: 'Arts & Culture', em: '🎭', bg: '#fbe6e1' },
  { i: 'Shopping', em: '🛍️', bg: '#eef8f1' },
  { i: 'Nightlife', em: '🌙', bg: '#f0e7fa' },
  { i: 'Wellness', em: '🧘', bg: '#eef8f1' },
  { i: 'Water Activities', em: '🤿', bg: '#e4eefb' },
  { i: 'Meet New People', em: '🤝', bg: '#fbe6e1' },
];
export const TRAVEL_OPTIONS = ['Solo', 'Small groups', 'Quiet experiences', 'Local experiences', 'Popular attractions'];
export const EXPLORE_OPTIONS = ['Eco Explorer', 'Walk More', 'Share Transport', 'Support Local'];

export const NAME_POOL = ['ren.tan', 'noor_travels', 'backpack_eli', 'hana.k', 'dev_wanders', 'zoe_local', 'milo.exists', 'yui_solo'];
export const REPLY_POS = ["yes let's go!! 🙌", "I'm in, count me!", 'sounds fun, I\u2019m down', 'yes please, needed an excuse to get out'];
export const REPLY_NEU = ['how far is it from the terminal?', 'how many are going so far?'];
export const THREAD_POS = ['sounds good to me!', "I'll grab a Grab, can fit a few more", 'works for me', "let's meet at Gate 2 near the terminal", 'perfect, see you all there'];
export const HUES = [152, 32, 40, 205, 280, 90];

export const NEARBY_MSGS_SEED: NearbyMessage[] = [
  { user: 'mira_88', text: 'anyone up for Vovo Beach Club tonight? just landed 20 min ago', eventId: 1, time: '4:12 PM' },
  { user: 'kai.wanders', text: 'in! solo traveller from SG, first time in Batam', time: '4:13 PM' },
  { system: true, text: 'mira_88 started a group · Ferry Terminal → Vovo Beach Club · 2 joined' },
  { user: 'theo_r', text: 'is the hidden gem cafe near the terminal any good? saw it on the map', eventId: 3, time: '4:20 PM' },
];

// Seeded so the demo already has one live group, with "you" as a placeholder
// member — App.tsx normalizes this to the real username once one is chosen,
// which is exactly the mismatch that used to make "Join Group" look like it
// spun up a brand-new single-member group.
export const GROUPS_SEED: Group[] = [
  {
    id: 101, eventId: 1, from: 'Batam Centre Ferry Terminal', to: 'Vovo Beach Club',
    members: ['mira_88', 'kai.wanders', 'theo_r', 'you'], need: 4, discount: '10%', leaves: 'in 40 min',
    messages: [
      { user: 'mira_88', text: 'welcome aboard! 4 of us now, one more locks the discount', time: '4:14 PM' },
      { user: 'kai.wanders', text: 'I can grab a Grab XL, fits 6 comfortably', time: '4:16 PM' },
      { user: 'theo_r', text: 'count me in for the ride, splitting cost 4 ways?', time: '4:18 PM' },
    ],
  },
];
