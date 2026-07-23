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

const ACCENT_STYLES: Record<string, { card: string; badge: string; iconWrap: string; text: string }> = {
  sky: {
    card: 'bg-[var(--color-sky-light)] border-[var(--color-sky-dark)]/20',
    badge: 'bg-[var(--color-sky)] text-[var(--color-ink)]',
    iconWrap: 'bg-[var(--color-sky)] text-[var(--color-ink)]',
    text: 'text-[var(--color-sky-dark)]',
  },
  gold: {
    card: 'bg-[#FBF1DE] border-[var(--color-gold)]/30',
    badge: 'bg-[var(--color-gold)] text-[var(--color-ink)]',
    iconWrap: 'bg-[var(--color-gold)] text-[var(--color-ink)]',
    text: 'text-[var(--color-gold)]',
  },
  navy: {
    card: 'bg-[var(--color-navy)] border-[var(--color-navy)]',
    badge: 'bg-[var(--color-sky)] text-[var(--color-ink)]',
    iconWrap: 'bg-white/10 text-white',
    text: 'text-[var(--color-sky)]',
  },
  ink: {
    card: 'bg-[var(--color-ink)] border-[var(--color-ink)]',
    badge: 'bg-[var(--color-gold)] text-[var(--color-ink)]',
    iconWrap: 'bg-white/10 text-white',
    text: 'text-[var(--color-gold)]',
  },
};

const DARK_ACCENTS = new Set(['navy', 'ink']);

export default function RoleBlock() {
  const [guest] = useState(() => resolveGuestFromSearch(window.location.search));
  const [roleKey] = useState<RoleKey>(() => guest?.role ?? resolveRoleFromSearch(window.location.search));
  const [name] = useState<string | null>(() => guest?.name ?? resolveNameFromSearch(window.location.search));

  const role = ROLES[roleKey];
  const Icon = ICONS[role.icon] ?? Ticket;
  const styles = ACCENT_STYLES[role.accent];
  const isDark = DARK_ACCENTS.has(role.accent);

  // Blurbs may embed a {name} token to be filled in later — see data.ts.
  const blurb = role.blurb.includes('{name}')
    ? role.blurb.replaceAll('{name}', name ?? 'дорогой гость')
    : role.blurb;

  return (
    <section className="py-14 px-6 bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-sky-light)] to-[#EAF4FA]">
      <ScrollReveal>
        {name && (
          <p className="text-center font-script text-3xl text-[var(--color-gold)] mb-2">
            Привет, {name}!
          </p>
        )}
        <SectionHeader eyebrow="Кто ты сегодня" title="Твоя роль" />
        <div
          key={roleKey}
          className={`rounded-[28px] border px-6 py-8 text-center transition-colors duration-500 ${styles.card}`}
        >
          <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 ${styles.iconWrap}`}>
            <Icon size={26} strokeWidth={1.75} />
          </div>

          <span
            className={`inline-block font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full ${styles.badge}`}
          >
            {role.isSpecial ? 'Особая роль' : 'Роль'}
          </span>

          <h3 className={`font-serif text-2xl font-bold mt-4 ${isDark ? 'text-white' : 'text-[var(--color-ink)]'}`}>
            {role.title}
          </h3>

          <p className={`mt-3 leading-relaxed text-sm ${isDark ? 'text-white/80' : 'text-[var(--color-navy)]/80'}`}>
            {blurb}
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
