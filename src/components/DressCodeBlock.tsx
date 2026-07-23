import { Shirt } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

export default function DressCodeBlock() {
  return (
    <section className="py-14 px-6 bg-gradient-to-b from-[var(--color-cream)] via-[#F7EFDA] to-[var(--color-cream)]">
      <ScrollReveal>
        <SectionHeader eyebrow="Как одеться" title="Дресс-код" />
        <div className="rounded-[28px] border border-[var(--color-sky-dark)]/15 bg-gradient-to-br from-[var(--color-sky-light)] to-[var(--color-gold-light)]/40 px-6 py-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-cream)] flex items-center justify-center mb-5">
            <Shirt size={24} className="text-[var(--color-sky-dark)]" strokeWidth={1.75} />
          </div>
          <p className="text-[var(--color-ink)] text-base leading-relaxed">
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
    </section>
  );
}
