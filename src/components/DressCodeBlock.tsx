import { Shirt } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

export default function DressCodeBlock() {
  return (
    <section className="py-16 md:py-24 px-4 bg-[var(--color-cream)]">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <SectionHeader eyebrow="Как одеться" title="Дресс-код" />
          <div className="rounded-[28px] border border-[var(--color-sky-dark)]/15 bg-[var(--color-sky-light)] px-6 py-8 md:px-10 md:py-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-cream)] flex items-center justify-center mb-5">
              <Shirt size={24} className="text-[var(--color-sky-dark)]" strokeWidth={1.75} />
            </div>
            <p className="text-[var(--color-ink)] text-base md:text-lg leading-relaxed">
              Строгого дресс-кода нет — единственное, о чём просим: пусть в твоём образе
              будет хотя бы одна{' '}
              <span className="font-semibold text-[var(--color-ink)]">чёрная</span> или{' '}
              <span className="font-semibold text-[var(--color-sky-dark)]">голубая</span>{' '}
              вещь или аксессуар.
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-[var(--color-ink)]/20" style={{ background: 'var(--color-ink)' }} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-navy)]/70">Чёрный</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-[var(--color-sky-dark)]/20" style={{ background: 'var(--color-sky)' }} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-navy)]/70">Голубой</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
