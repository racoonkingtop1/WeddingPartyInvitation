import { findGuestById, Guest } from './guests';

export function resolveGuestFromSearch(search: string): Guest | null {
  const params = new URLSearchParams(search);
  const id = params.get('guest')?.trim().toLowerCase();
  if (!id) return null;
  return findGuestById(id) ?? null;
}
