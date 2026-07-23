import { RoleKey } from './types';
import { transliterate } from './transliterate';

export interface Guest {
  id: string;
  name: string;
  role: RoleKey;
}

// Personal invite links: https://<домен>/?guest=<id> fills in both name and
// role at once (see guestFromUrl.ts). Ids are transliterated from the
// Cyrillic name; when two guests share a first name, a short suffix
// disambiguates them (see comments below).
export const GUESTS: Guest[] = [
  { id: transliterate('Андрей'), name: 'Андрей', role: 'groom-father' },
  { id: transliterate('Сусанна'), name: 'Сусанна', role: 'groom-mother' },
  { id: `${transliterate('Анастасия')}-guest`, name: 'Анастасия', role: 'guest' },
  { id: transliterate('Диана'), name: 'Диана', role: 'photographer' },
  { id: transliterate('Милена'), name: 'Милена', role: 'guest' },
  { id: transliterate('Дмитрий'), name: 'Дмитрий', role: 'speaker' },
  { id: transliterate('Татьяна'), name: 'Татьяна', role: 'bride-mother' },
  { id: transliterate('Галина'), name: 'Галина', role: 'guest' },
  { id: transliterate('Ольга'), name: 'Ольга', role: 'guest' },
  { id: `${transliterate('Кирилл')}-guest`, name: 'Кирилл', role: 'guest' },
  { id: `${transliterate('Елизавета')}-bridesmaid`, name: 'Елизавета', role: 'bridesmaid' },
  { id: transliterate('Жулдузай'), name: 'Жулдузай', role: 'bridesmaid' },
  { id: transliterate('Надежда'), name: 'Надежда', role: 'bridesmaid' },
  { id: transliterate('Алёна'), name: 'Алёна', role: 'bridesmaid' },
  { id: `${transliterate('Анастасия')}-bridesmaid`, name: 'Анастасия', role: 'bridesmaid' },
  { id: transliterate('Алексей'), name: 'Алексей', role: 'groomsman' },
  { id: `${transliterate('Елизавета')}-family`, name: 'Елизавета', role: 'family-friend' },
  { id: transliterate('Даниал'), name: 'Даниал', role: 'style-icon' },
  { id: transliterate('Степан'), name: 'Степан', role: 'hype-creator' },
  { id: transliterate('Станислав'), name: 'Станислав', role: 'host' },
  { id: `${transliterate('Кирилл')}-nazar`, name: 'Кирилл', role: 'friend-of-nazar' },
  { id: transliterate('Назар'), name: 'Назар', role: 'friend-of-kirill' },
  { id: transliterate('Зарина'), name: 'Зарина', role: 'financial-director' },
  { id: transliterate('Айрат'), name: 'Айрат', role: 'sports-star' },
];

export interface Family {
  id: string;
  memberIds: string[];
}

// Small guest groupings — used to power the "who's my family here" popup.
// Order of memberIds controls display order in the popup.
export const FAMILIES: Family[] = [
  { id: 'family-aleksey-elizaveta', memberIds: [`${transliterate('Алексей')}`, `${transliterate('Елизавета')}-family`] },
  { id: 'family-andrey-susanna', memberIds: [transliterate('Андрей'), transliterate('Сусанна')] },
  {
    id: 'family-anastasiya-ayrat',
    memberIds: [`${transliterate('Анастасия')}-guest`, transliterate('Айрат'), transliterate('Зарина')],
  },
  { id: 'family-milena-dmitriy', memberIds: [transliterate('Милена'), transliterate('Дмитрий')] },
];

export function findGuestById(id: string): Guest | undefined {
  return GUESTS.find((g) => g.id === id);
}

export function findFamilyForGuest(guestId: string): Family | undefined {
  return FAMILIES.find((f) => f.memberIds.includes(guestId));
}

export function familyMembers(family: Family): Guest[] {
  return family.memberIds
    .map((id) => findGuestById(id))
    .filter((g): g is Guest => Boolean(g));
}
