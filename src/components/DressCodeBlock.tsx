import { Shirt } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

export default function DressCodeBlock() {
  return (
    <section className="py-9 px-6">
      <ScrollReveal>
        <SectionHeader eyebrow="Не забудьте про" title="Дресс-код" />
        <div className="rounded-[28px] glass-panel px-6 py-8 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-abyss)] flex items-center justify-center mb-5">
            <Shirt size={24} className="text-[var(--color-blue-light)]" strokeWidth={1.75} />
          </div>
          <p className="text-[var(--color-ice)] text-base leading-relaxed">
            Строгого дресс-кода нет — единственное, о чём просим: пусть в твоём образе
            будет хотя бы одна{' '}
            <span className="font-semibold text-[var(--color-ice)]">чёрная</span> или{' '}
            <span className="font-semibold text-[var(--color-blue-light)]">голубая</span>{' '}
            вещь или аксессуар.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-white/10" style={{ background: 'var(--color-void)' }} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-mist)]">Чёрный</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-[var(--color-blue-light)]/30 shadow-[0_0_14px_rgba(62,123,250,0.5)]" style={{ background: 'var(--color-blue)' }} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-mist)]">Голубой</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
