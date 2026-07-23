// Decorative cartoon dog-in-glasses mascot for the ticket hero. Pure inline
// SVG (no external asset), strictly two-tone (gold fur + ink linework) so it
// reads as a bold sticker-style mascot rather than a soft illustration.
export default function DogIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Мультяшный пёс в очках"
    >
      {/* Floppy ears */}
      <path
        d="M24 50c-17-4-27 12-21 32 4 13 17 19 28 14-11-14-14-32-7-46Z"
        fill="var(--color-gold)"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M96 50c17-4 27 12 21 32-4 13-17 19-28 14 11-14 14-32 7-46Z"
        fill="var(--color-gold)"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Big round head */}
      <circle cx="60" cy="63" r="36" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="3.5" />

      {/* Muzzle outline (no fill — head color shows through) */}
      <path
        d="M43 74c4 9 12 14 17 14s13-5 17-14c-6 5-28 5-34 0Z"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Nose + happy open smile */}
      <ellipse cx="60" cy="77" rx="6" ry="4.5" fill="var(--color-ink)" />
      <path
        d="M60 81.5v3M48 89c4 5 20 5 24 0"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Big round glasses, filled lenses with a small punched-out shine */}
      <circle cx="43" cy="59" r="14" fill="var(--color-ink)" />
      <circle cx="77" cy="59" r="14" fill="var(--color-ink)" />
      <circle cx="43" cy="59" r="14" fill="none" stroke="var(--color-ink)" strokeWidth="3.5" />
      <circle cx="77" cy="59" r="14" fill="none" stroke="var(--color-ink)" strokeWidth="3.5" />
      <circle cx="38" cy="54" r="2.6" fill="var(--color-cream)" />
      <circle cx="72" cy="54" r="2.6" fill="var(--color-cream)" />
      <path
        d="M57 59h6M25 55l-8-3M95 55l8-3"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
