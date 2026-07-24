import { useEffect, useRef, useState } from 'react';
import MusicBar from './components/MusicBar';
import TicketHero from './components/TicketHero';
import ScheduleBlock from './components/ScheduleBlock';
import DressCodeBlock from './components/DressCodeBlock';
import RoleBlock from './components/RoleBlock';
import LocationBlock from './components/LocationBlock';
import QRBlock from './components/QRBlock';
import Preloader from './components/Preloader';
import { YANDEX_DISK_PUBLIC_KEY } from './data';

// Same fetch-as-blob workaround as the sibling `wedding` project: Yandex
// Disk's download endpoint 403s when a browser's default Referer header is
// present on a direct <audio src>, so the file is fetched with
// referrerPolicy: 'no-referrer' and played from a local blob URL instead.
const YANDEX_DOWNLOAD_API = YANDEX_DISK_PUBLIC_KEY
  ? `https://cloud-api.yandex.net/v1/disk/public/resources/download?public_key=${encodeURIComponent(YANDEX_DISK_PUBLIC_KEY)}`
  : null;

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Whether the user has asked to play before the track finished loading —
  // honored the instant it's ready, so a tap always feels instant instead
  // of waiting on Yandex Disk.
  const wantsToPlayRef = useRef(false);
  const [isMusicFailed, setIsMusicFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFontsReady, setIsFontsReady] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Start fetching the background track the moment the app mounts — before
  // the page is even shown — but this no longer gates the preloader (see
  // below): the button is clickable immediately, and playback starts the
  // moment the track is ready rather than making the whole page wait on it.
  useEffect(() => {
    if (!YANDEX_DOWNLOAD_API) {
      setIsMusicFailed(true);
      return;
    }
    let cancelled = false;
    let audio: HTMLAudioElement | null = null;
    let objectUrl: string | null = null;

    fetch(YANDEX_DOWNLOAD_API)
      .then((res) => res.json())
      .then((data: { href?: string }) => {
        if (cancelled || !data.href) return;
        return fetch(data.href, { referrerPolicy: 'no-referrer' });
      })
      .then((res) => (res && res.ok ? res.blob() : Promise.reject(new Error('Bad response fetching song file'))))
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        audio = new Audio(objectUrl);
        audio.loop = true;
        audio.volume = 0.35;
        audioRef.current = audio;
        // Keep the play/pause button in sync with the actual audio element —
        // not just clicks, but also OS/hardware media-key play-pause events,
        // which the browser applies directly to the element.
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));
        if (wantsToPlayRef.current) {
          audio.play().catch((err) => {
            console.warn('Deferred playback blocked by autoplay policy — needs a fresh tap', err);
            setIsPlaying(false);
          });
        }
      })
      .catch((err) => {
        console.warn('Failed to load background track from Yandex Disk', err);
        if (!cancelled) setIsMusicFailed(true);
      });

    return () => {
      cancelled = true;
      if (audio) audio.pause();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setIsFontsReady(true));
    } else {
      setIsFontsReady(true);
    }
  }, []);

  // Fonts should resolve almost immediately; this is just a safety net so a
  // stalled font load can never strand a guest on the loading screen. Music
  // is intentionally not part of this gate — see the effect above.
  useEffect(() => {
    const timeout = setTimeout(() => setIsTimedOut(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  const isAppReady = isFontsReady || isTimedOut;

  useEffect(() => {
    if (!isAppReady) return;
    const timeout = setTimeout(() => setShowPreloader(false), 900);
    return () => clearTimeout(timeout);
  }, [isAppReady]);

  const handleToggleMusic = () => {
    if (isMusicFailed) return;
    if (!audioRef.current) {
      // Still loading — remember the request and reflect it optimistically;
      // the effect above starts playback the instant the track is ready.
      const next = !wantsToPlayRef.current;
      wantsToPlayRef.current = next;
      setIsPlaying(next);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Playback prevented by browser user activation policy', err);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-void)] font-sans antialiased relative overflow-x-hidden">
      {showPreloader && <Preloader ready={isAppReady} />}

      {/* Page-level decoration — soft blue/black blobs, fixed, showing
          through the glass shell above them. */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-[var(--color-void)]">
        <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" />
        <div
          className="absolute -top-28 -left-24 w-80 h-80 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-blue) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -right-32 w-96 h-96 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-blue-deep) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-blue-light) 0%, transparent 70%)' }}
        />
      </div>

      {/* Phone shell — full-bleed on mobile (it IS the screen), a floating
          glass phone-shaped card once there's room to see its edges. */}
      <div className="relative py-0 sm:py-10 px-0 sm:px-4">
        <div className="relative w-full max-w-[480px] mx-auto glass-panel-strong sm:rounded-[36px] shadow-[0_30px_80px_-15px_rgba(4,8,20,0.6)] overflow-hidden">
          <MusicBar hasFailed={isMusicFailed} isPlaying={isPlaying} onToggle={handleToggleMusic} />
          <TicketHero />
          <ScheduleBlock />
          <DressCodeBlock />
          <RoleBlock />
          <LocationBlock />
          <QRBlock />
          <footer className="py-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] border-t border-white/5">
            <span className="text-[var(--color-mist)]">Валерия &amp; Павел · Свадебные посиделки · 2026</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
