import { RoleKey } from './types';
import { ROLE_ORDER } from './data';

// Aliases so links can use either English keys or a couple of common
// shorthands. The canonical, documented way is `?role=<key>`, e.g.
// `?role=dj`, `?role=photographer`. A bare flag like `?dj` also works.
const ALIASES: Record<string, RoleKey> = {
  guest: 'guest',
  dj: 'dj',
  deejay: 'dj',
  host: 'host',
  mc: 'host',
  emcee: 'host',
  photographer: 'photographer',
  photo: 'photographer',
  coordinator: 'coordinator',
  planner: 'coordinator',
  speaker: 'speaker',
  toast: 'speaker',
  bridesmaid: 'bridesmaid',
  groomsman: 'groomsman',
  bestman: 'groomsman',
};

export function resolveRoleFromSearch(search: string): RoleKey {
  const params = new URLSearchParams(search);

  const explicit = params.get('role')?.trim().toLowerCase();
  if (explicit && ALIASES[explicit]) return ALIASES[explicit];

  for (const key of params.keys()) {
    const normalized = key.trim().toLowerCase();
    if (ALIASES[normalized]) return ALIASES[normalized];
  }

  return 'guest';
}

export function isKnownRole(value: string): value is RoleKey {
  return ROLE_ORDER.includes(value as RoleKey);
}
