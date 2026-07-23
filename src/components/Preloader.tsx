import { Heart } from 'lucide-react';

interface PreloaderProps {
  ready: boolean;
}

// Full-page loading screen: a spinning ring around an outlined heart while
// assets are loading, which collapses away and lets the heart pop solid once
// everything (music track, fonts) is ready — the ring "becomes" the heart.
export default function Preloader({ ready }: PreloaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[var(--color-void)] transition-opacity duration-500 ${
        ready ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative w-16 h-16 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full border-2 border-[var(--color-blue-light)]/15 transition-all duration-500 ${
            ready ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-blue)] transition-opacity duration-500 ${
            ready ? 'opacity-0' : 'opacity-100 animate-spin'
          }`}
        />

        <Heart
          size={22}
          strokeWidth={1.75}
          className={`relative transition-colors duration-300 ${
            ready
              ? 'text-[var(--color-blue)] fill-[var(--color-blue)] animate-heart-pop drop-shadow-[0_0_14px_rgba(62,123,250,0.65)]'
              : 'text-[var(--color-blue-light)] fill-transparent animate-heartbeat'
          }`}
        />
      </div>

      <span className="relative font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-mist)]">
        Загружаем приглашение
      </span>
    </div>
  );
}
