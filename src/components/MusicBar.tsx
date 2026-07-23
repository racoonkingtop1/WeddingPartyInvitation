import { Music2, Play, Pause } from 'lucide-react';
import { SONG_ARTIST, SONG_TITLE } from '../data';

interface MusicBarProps {
  isReady: boolean;
  isPlaying: boolean;
  onToggle: () => void;
}

// Audio loading lives in App.tsx (the preloader waits on it); this component
// just reflects that state and forwards the toggle.
export default function MusicBar({ isReady, isPlaying, onToggle }: MusicBarProps) {
  return (
    <div className="flex items-center justify-center px-4 py-3 border-b border-white/5">
      <div className="flex items-center gap-2 w-full max-w-[260px] min-w-0">
        <Music2 size={14} className="text-[var(--color-blue-light)] shrink-0" strokeWidth={1.75} />
        <span className="flex-1 min-w-0 truncate text-center font-sans text-[11px] text-[var(--color-mist)]">
          {SONG_ARTIST} — {SONG_TITLE}
        </span>
        <button
          onClick={onToggle}
          disabled={!isReady}
          aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
          title={isReady ? undefined : 'Трек скоро добавим'}
          className="glass-chip w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[var(--color-ice)] transition-colors enabled:hover:bg-[var(--color-blue)]/15 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
