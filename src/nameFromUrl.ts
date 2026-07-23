// Reads the guest's name from the invite link, e.g. `?name=Иван`. Mirrors
// roleFromUrl.ts — the two params are meant to be combined on a shared link,
// e.g. `?role=dj&name=Иван`.
export function resolveNameFromSearch(search: string): string | null {
  const params = new URLSearchParams(search);
  const raw = params.get('name')?.trim();
  if (!raw) return null;

  // Collapse stray whitespace and cap length so an unexpected query string
  // can't stretch the ticket card or role card layout.
  const normalized = raw.replace(/\s+/g, ' ').slice(0, 40);
  return normalized || null;
}
