// Decorative cartoon dog-in-glasses mascot for the ticket hero. Pure inline
// SVG (no external asset) so it themes with the palette via CSS vars.
export default function DogIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Милый пёс в очках"
    >
      <path
        d="M27 45c-15-6-24 9-20 28 3 14 15 21 26 17-10-13-13-30-6-45Z"
        fill="var(--color-gold)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M93 45c15-6 24 9 20 28-3 14-15 21-26 17 10-13 13-30 6-45Z"
        fill="var(--color-gold)"
        stroke="var(--color-ink)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <circle cx="60" cy="62" r="38" fill="#FBF6EC" stroke="var(--color-ink)" strokeWidth="2.5" />

      <circle cx="37" cy="77" r="6.5" fill="var(--color-blush)" opacity="0.75" />
      <circle cx="83" cy="77" r="6.5" fill="var(--color-blush)" opacity="0.75" />

      <ellipse cx="60" cy="81" rx="16" ry="12" fill="#FFFDF8" stroke="var(--color-ink)" strokeWidth="2" />
      <ellipse cx="60" cy="75.5" rx="5.5" ry="4.5" fill="var(--color-ink)" />
      <path
        d="M60 80v3.5M53 89c3 3 11 3 14 0"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="45" cy="58" r="12.5" fill="var(--color-sky-light)" fillOpacity="0.85" stroke="var(--color-ink)" strokeWidth="3" />
      <circle cx="75" cy="58" r="12.5" fill="var(--color-sky-light)" fillOpacity="0.85" stroke="var(--color-ink)" strokeWidth="3" />
      <path
        d="M57.5 58h5M29 55.5l-6-2M91 55.5l6-2"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path d="M51 99l9-5.5 9 5.5-9 4-9-4Z" fill="var(--color-navy)" />
      <circle cx="60" cy="99" r="2.5" fill="var(--color-gold)" />
    </svg>
  );
}
