import { Clock } from 'lucide-react';
import { SCHEDULE } from '../data';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

export default function ScheduleBlock() {
  return (
    <section className="py-16 md:py-24 px-4 bg-[var(--color-sky-light)]">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <SectionHeader eyebrow="Программа дня" title="Расписание" subtitle="Чтобы ничего не пропустить" />
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-[var(--color-sky-dark)]/25" aria-hidden />
          <ol className="space-y-6">
            {SCHEDULE.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 80}>
                <li className="relative flex gap-5 items-start">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[var(--color-cream)] border-2 border-[var(--color-sky-dark)]/40 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-[var(--color-sky-dark)]" strokeWidth={2} />
                  </div>
                  <div className="flex-1 bg-[var(--color-cream)] rounded-2xl border border-[var(--color-sky-dark)]/15 px-5 py-4">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-mono text-sm font-bold text-[var(--color-sky-dark)] tracking-wide">
                        {item.time}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--color-navy)]/75 mt-1">{item.description}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
