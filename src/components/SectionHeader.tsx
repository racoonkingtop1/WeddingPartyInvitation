export default function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-9">
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--color-sky-dark)]">
        {eyebrow}
      </span>
      <h2 className="font-serif text-3xl font-bold text-[var(--color-ink)] mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--color-navy)]/70 mt-2 text-sm">{subtitle}</p>
      )}
    </div>
  );
}
