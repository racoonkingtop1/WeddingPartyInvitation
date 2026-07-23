import { useEffect, useState } from 'react';
import {
  Ticket,
  Disc3,
  Mic2,
  Camera,
  ClipboardList,
  MessageSquareText,
  Sparkles,
  Users,
  LucideIcon,
} from 'lucide-react';
import { ROLES } from '../data';
import { RoleKey } from '../types';
import { resolveRoleFromSearch } from '../roleFromUrl';
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
  const [roleKey, setRoleKey] = useState<RoleKey>('guest');

  useEffect(() => {
    setRoleKey(resolveRoleFromSearch(window.location.search));
  }, []);

  const role = ROLES[roleKey];
  const Icon = ICONS[role.icon] ?? Ticket;
  const styles = ACCENT_STYLES[role.accent];
  const isDark = DARK_ACCENTS.has(role.accent);

  return (
    <section className="py-16 md:py-24 px-4 bg-[var(--color-sky-light)]">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <SectionHeader eyebrow="Кто ты сегодня" title="Твоя роль" />
          <div
            key={roleKey}
            className={`rounded-[28px] border px-6 py-8 md:px-10 md:py-10 text-center transition-colors duration-500 ${styles.card}`}
          >
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 ${styles.iconWrap}`}>
              <Icon size={26} strokeWidth={1.75} />
            </div>

            <span
              className={`inline-block font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full ${styles.badge}`}
            >
              {role.isSpecial ? 'Особая роль' : 'Роль'}
            </span>

            <h3
              className={`font-serif text-2xl md:text-3xl font-semibold mt-4 ${isDark ? 'text-white' : 'text-[var(--color-ink)]'}`}
            >
              {role.title}
            </h3>

            <p className={`mt-3 leading-relaxed text-sm md:text-base ${isDark ? 'text-white/80' : 'text-[var(--color-navy)]/80'}`}>
              {role.blurb}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
