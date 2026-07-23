import { useState } from 'react';
import { Users } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME, EVENT_DATE_LABEL, EVENT_DATE_SHORT, ROLES } from '../data';
import { RoleKey } from '../types';
import { resolveRoleFromSearch } from '../roleFromUrl';
import { resolveNameFromSearch } from '../nameFromUrl';
import { resolveGuestFromSearch } from '../guestFromUrl';
import { findFamilyForGuest, familyMembers } from '../guests';
import DogIllustration from './DogIllustration';
import FamilyPopup from './FamilyPopup';

export default function TicketHero() {
  // Lazy initializers run once on mount, before first paint — no flash of
  // "guest / no name" while a useEffect catches up.
  const [guest] = useState(() => resolveGuestFromSearch(window.location.search));
  const [roleKey] = useState<RoleKey>(() => guest?.role ?? resolveRoleFromSearch(window.location.search));
  const [guestName] = useState<string | null>(() => guest?.name ?? resolveNameFromSearch(window.location.search));
  const [showFamily, setShowFamily] = useState(false);

  const role = ROLES[roleKey];
  const family = guest ? findFamilyForGuest(guest.id) : undefined;

  return (
    <section className="relative pt-14 pb-16 px-6 bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-sky-light)] overflow-hidden">
      <div
        className="pointer-events-none absolute -top-20 -right-16 w-60 h-60 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-sky) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 w-56 h-56 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-blush) 0%, transparent 70%)' }}
      />

      <div className="relative text-center mb-7">
        <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--color-sky-dark)]">
          Посадочный билет · {EVENT_DATE_LABEL}
        </span>
        <h1 className="font-serif text-5xl font-bold tracking-tight text-[var(--color-ink)] mt-3 leading-[1.05]">
          Свадебные посиделки
        </h1>
        <p className="font-serif italic text-lg text-[var(--color-navy)]/80 mt-2">
          {GROOM_NAME} &amp; {BRIDE_NAME}
        </p>
      </div>

      {/* Ticket card — purely decorative, auto-filled from the invite link */}
      <div className="relative ticket-notch rounded-[28px] shadow-xl shadow-[var(--color-navy)]/10 overflow-hidden">
        <div className="grid grid-cols-[1fr_auto] gap-5 p-6 bg-[var(--color-cream)]">
          {/* Left: name + role, read from the URL */}
          <div className="flex flex-col justify-center gap-5 min-w-0">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-sky-dark)]">
                Кому
              </span>
              <p className="font-serif text-xl font-medium text-[var(--color-ink)] mt-1 truncate">
                {guestName ?? 'Дорогой гость'}
              </p>
            </div>
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-sky-dark)]">
                Роль
              </span>
              <p className="font-serif text-xl font-medium text-[var(--color-ink)] mt-1 truncate">
                {role.title}
              </p>
            </div>
          </div>

          {/* Right: mascot + date */}
          <div className="flex flex-col items-center justify-center gap-2 shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-[var(--color-cream)] ring-1 ring-[var(--color-ink)]/10 flex items-center justify-center overflow-hidden">
              <DogIllustration className="w-20 h-20" />
            </div>
            <span className="font-mono text-[11px] tracking-[0.1em] text-[var(--color-navy)]/70 whitespace-nowrap">
              {EVENT_DATE_SHORT}
            </span>
          </div>
        </div>

        {/* Perforated divider */}
        <div className="h-4 relative">
          <div className="absolute inset-0 border-t-2 border-dashed border-[var(--color-navy)]/20" style={{ top: '50%' }} />
        </div>

        {/* Stub */}
        <div className="px-6 pb-6 pt-2 bg-[var(--color-cream)] flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[var(--color-navy)]/60">
          <span>№ 001 · {role.isSpecial ? 'SPECIAL' : 'GUEST'} PASS</span>
          <span>16:00</span>
        </div>
      </div>

      {family && guest && (
        <div className="relative flex justify-center mt-5">
          <button
            onClick={() => setShowFamily(true)}
            className="glass-chip inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-navy)] hover:bg-white/60 transition-colors"
          >
            <Users size={14} /> Кто моя семья?
          </button>
        </div>
      )}

      {family && guest && showFamily && (
        <FamilyPopup
          members={familyMembers(family)}
          currentId={guest.id}
          onClose={() => setShowFamily(false)}
        />
      )}
    </section>
  );
}
