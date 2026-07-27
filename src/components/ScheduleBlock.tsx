import {
  ClipboardList,
  Home,
  Mic2,
  UtensilsCrossed,
  PartyPopper,
  Flame,
  CakeSlice,
  Moon,
  LucideIcon,
} from 'lucide-react';
import { SCHEDULE } from '../data';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

const ICONS: Record<string, LucideIcon> = {
  ClipboardList,
  Home,
  Mic2,
  UtensilsCrossed,
  PartyPopper,
  Flame,
  CakeSlice,
  Moon,
};

export default function ScheduleBlock() {
  return (
    <section className="py-9 px-6">
      <ScrollReveal>
        <SectionHeader eyebrow="Изучите наше" title="Расписание" subtitle="Чтобы ничего не пропустить" />
      </ScrollReveal>

      <div className="relative">
        <ol className="space-y-5">
          {SCHEDULE.map((item, idx) => {
            const Icon = ICONS[item.icon];
            return (
            <ScrollReveal key={item.id} delay={idx * 80}>
              <li className="relative flex gap-5 items-start">
                {/* Connector to the NEXT dot only, sized off this li's own
                    (variable) height + the fixed space-y-5 gap — so it
                    always lands exactly on the next dot's center and simply
                    doesn't exist after the last item, instead of one shared
                    line guessed to roughly fit the whole list. */}
                {idx < SCHEDULE.length - 1 && (
                  <div
                    className="absolute left-[19px] top-5 w-px bg-[var(--color-blue-light)]/20"
                    style={{ height: 'calc(100% + 20px)' }}
                    aria-hidden
                  />
                )}
                <div className="relative z-10 w-10 h-10 rounded-full bg-[var(--color-abyss)] border-2 border-[var(--color-blue-light)]/35 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-[var(--color-blue-light)]" strokeWidth={2} />
                </div>
                <div className="flex-1 glass-panel rounded-2xl px-5 py-4">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-sm font-bold text-[var(--color-blue-light)] tracking-wide">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-[var(--color-ice)]">
                      {item.title}
                    </h3>
                  </div>
                  {item.description && (
                    <p className="text-sm text-[var(--color-mist)] mt-1">{item.description}</p>
                  )}
                </div>
              </li>
            </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
