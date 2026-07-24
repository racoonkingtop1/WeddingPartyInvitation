import { useState } from 'react';
import {
  Ticket,
  Disc3,
  Mic2,
  Camera,
  ClipboardList,
  MessageSquareText,
  Sparkles,
  Users,
  Home,
  Heart,
  Flower2,
  Wand2,
  PartyPopper,
  Handshake,
  Briefcase,
  Trophy,
  LucideIcon,
} from 'lucide-react';
import { ROLES } from '../data';
import { RoleKey } from '../types';
import { resolveRoleFromSearch } from '../roleFromUrl';
import { resolveNameFromSearch } from '../nameFromUrl';
import { resolveGuestFromSearch } from '../guestFromUrl';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

const ICONS: Record<string, LucideIcon> = {
  Ticket,
  Disc3,
  Mic2,
  Camera,
  ClipboardList,
  MessageSquareText,
  Sparkles,
  Users,
  Home,
  Heart,
  Flower2,
  Wand2,
  PartyPopper,
  Handshake,
  Briefcase,
  Trophy,
};

// Four accent keys carried over from data.ts, recolored to the blue/black
// pair only — 'sky' and 'gold' both read as "blue" (light glass vs. a
// glowing highlight), 'navy' and 'ink' both read as "black" (two depths).
const ACCENT_STYLES: Record<string, { card: string; iconWrap: string }> = {
  sky: {
    card: 'glass-panel border-[var(--color-blue-light)]/15',
    iconWrap: 'bg-[var(--color-blue)] text-[var(--color-void)]',
  },
  gold: {
    card: 'glass-panel border-[var(--color-blue-light)]/30 glow-blue',
    iconWrap: 'bg-[var(--color-blue-light)] text-[var(--color-void)]',
  },
  navy: {
    card: 'bg-[var(--color-abyss-2)] border border-white/10',
    iconWrap: 'bg-white/10 text-[var(--color-ice)]',
  },
  ink: {
    card: 'bg-[var(--color-void)] border border-white/10',
    iconWrap: 'bg-white/10 text-[var(--color-ice)]',
  },
};

export default function RoleBlock() {
  const [guest] = useState(() => resolveGuestFromSearch(window.location.search));
  const [roleKey] = useState<RoleKey>(() => guest?.role ?? resolveRoleFromSearch(window.location.search));
  const [name] = useState<string | null>(() => guest?.name ?? resolveNameFromSearch(window.location.search));

  const role = ROLES[roleKey];
  const Icon = ICONS[role.icon] ?? Ticket;
  const styles = ACCENT_STYLES[role.accent];

  // A guest's personal title/blurb (set in guests.ts) overrides the shared
  // ROLES[role] text; only accent/icon still come from the role itself.
  const displayTitle = guest?.title ?? role.title;
  const rawBlurb = guest?.blurb ?? role.blurb;
  // Blurbs may embed a {name} token to be filled in later — see data.ts.
  const blurb = rawBlurb.includes('{name}')
    ? rawBlurb.replaceAll('{name}', name ?? 'дорогой гость')
    : rawBlurb;

  return (
    <section id="role" className="py-9 px-6 scroll-mt-20">
      <ScrollReveal>
        {name && (
          <p className="text-center font-script text-3xl text-[var(--color-blue-light)] mb-2">
            Привет, {name}!
          </p>
        )}
        <SectionHeader eyebrow="узнай какова" title="Твоя роль" />
        <div
          key={roleKey}
          className={`rounded-[28px] px-6 py-8 text-center transition-colors duration-500 ${styles.card}`}
        >
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 ${styles.iconWrap}`}>
            <Icon size={26} strokeWidth={1.75} />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[var(--color-ice)]">
            {displayTitle}
          </h3>

          <p className="mt-3 leading-relaxed text-sm text-[var(--color-mist)]">
            {blurb}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
