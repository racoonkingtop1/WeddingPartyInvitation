import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Music2, Play, Pause } from 'lucide-react';
import { SONG_ARTIST, SONG_TITLE } from '../data';

interface MusicBarProps {
  hasFailed: boolean;
  isPlaying: boolean;
  onToggle: () => void;
}

// The floating pill should only appear once the inline bar has fully
// scrolled out of view, plus this extra buffer — and disappear at the same
// distance scrolling back up, since both are driven by one threshold.
const APPEAR_BUFFER_PX = 12;

// Audio loading lives in App.tsx; this component just reflects playback
// state and forwards the toggle (which itself queues a "play once ready"
// request rather than requiring the track to already be loaded).
export default function MusicBar({ hasFailed, isPlaying, onToggle }: MusicBarProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  // A zero-height marker right at the bottom edge of the inline bar — the
  // last part of it to leave the viewport while scrolling down. Once this
  // point is APPEAR_BUFFER_PX above the top edge, the whole bar is
  // confirmed gone (not just starting to clip).
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { rootMargin: `${APPEAR_BUFFER_PX}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const renderContent = (focusable: boolean) => (
    <>
      <Music2 size={14} className="text-[var(--color-blue-light)] shrink-0" strokeWidth={1.75} />
      <span className="flex-1 min-w-0 truncate text-center font-sans text-[11px] text-[var(--color-mist)]">
        {SONG_ARTIST} — {SONG_TITLE}
      </span>
      <button
        onClick={onToggle}
        disabled={hasFailed}
        tabIndex={focusable ? undefined : -1}
        aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
        title={hasFailed ? 'Не удалось загрузить трек' : undefined}
        className="glass-chip w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[var(--color-ice)] transition-colors enabled:hover:bg-[var(--color-blue)]/15 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
      </button>
    </>
  );

  return (
    <>
      <div className="flex items-center justify-center px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2 w-full max-w-[260px] min-w-0">{renderContent(true)}</div>
      </div>
      <div ref={sentinelRef} aria-hidden="true" />

      {/* Floating pill: fades/slides in once the bar above has fully
          scrolled out of view, pinned a little below the top of the screen,
          matching the inline bar's own content width. Portaled to <body> —
          the phone-shell ancestor uses backdrop-filter, which creates a new
          containing block for position: fixed descendants, so without the
          portal this would scroll away with the page instead of actually
          staying pinned to the viewport. */}
      {createPortal(
        <div
          aria-hidden={!isStuck}
          className={`fixed left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ease-out ${
            isStuck ? 'top-3 opacity-100 translate-y-0' : 'top-3 opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="glass-chip flex items-center gap-2 rounded-full px-4 py-2 w-[260px] shadow-[0_8px_30px_rgba(4,8,20,0.45)]">
            {renderContent(isStuck)}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
