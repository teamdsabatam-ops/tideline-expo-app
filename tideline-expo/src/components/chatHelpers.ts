import { HUES } from '../data';

const avatarColors: Record<string, number> = {};

export function initials(name: string): string {
  return name.replace(/[._]/g, ' ').split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}

export function avatarColor(name: string): string {
  if (avatarColors[name] === undefined) {
    avatarColors[name] = HUES[Object.keys(avatarColors).length % HUES.length];
  }
  return `hsl(${avatarColors[name]}, 50%, 62%)`;
}
