export type EventKind = 'gem' | 'local' | 'event' | 'group' | 'crowded';
export type Screen =
  | 'welcome' | 'interests' | 'discover' | 'nearby' | 'groups' | 'thread' | 'profile';

export interface EventItem {
  id: number;
  name: string;
  cat: string;
  tag: 'popular' | 'gem';
  kind: EventKind;
  icon: string;
  going: number;
  need: number;
  discount: string;
  area: string;
  eta: string;
  pos: { top: number; left: number }; // percentage position on the map
  desc: string;
}

export interface GroupMessage {
  user: string;
  text: string;
  time: string;
  sys?: boolean;
}

export interface Group {
  id: number;
  eventId: number;
  from: string;
  to: string;
  members: string[];
  need: number;
  discount: string;
  leaves: string;
  messages: GroupMessage[];
}

export interface NearbyMessage {
  user?: string;
  text: string;
  time?: string;
  mine?: boolean;
  system?: boolean;
  eventId?: number;
}

export interface InterestOption {
  i: string;
  em: string;
  bg: string;
}
