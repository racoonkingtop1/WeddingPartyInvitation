import { useEffect, useRef, useState } from 'react';
import MusicBar from './components/MusicBar';
import TicketHero from './components/TicketHero';
import ScheduleBlock from './components/ScheduleBlock';
import DressCodeBlock from './components/DressCodeBlock';
import RoleBlock from './components/RoleBlock';
import LocationBlock from './components/LocationBlock';
import QRBlock from './components/QRBlock';
import Preloader from './components/Preloader';

// Metronomy — The Look (Official Audio), played via the YouTube IFrame API —
// streams from YouTube's licensed player instead of hosting the track
// ourselves, and (unlike a direct file fetch) starts buffering the instant
// the API script loads rather than waiting on a full download.
const WEDDING_SONG_YOUTUBE_ID = 'w-zgXwT8Yyo';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function App() {
  const playerRef = useRef<any>(null);
  // Whether the user has asked to play before the player finished
  // initializing — honored the instant it's ready, so a tap always feels
  // instant instead of waiting on YouTube.
  const wantsToPlayRef = useRef(false);
  const playerInitStarted = useRef(false);
  // Flips once the silent warm-up play below actually starts streaming —
  // a ref (not state) because it's read inside the onStateChange closure
  // captured once at player creation, which would otherwise only ever see
  // the state's initial value.
  const isMusicReadyRef = useRef(false);
  const [isMusicFailed, setIsMusicFailed] = useState(false);
  const [isMusicReady, setIsMusicReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFontsReady, setIsFontsReady] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Load the YouTube IFrame API and mount a hidden player the moment the app
  // mounts — before the preloader even resolves. Unless the user already
  // tapped play, the track is started muted the instant the player is
  // ready: that's the only way to make YouTube actually buffer ahead rather
  // than just cue metadata, so by the time the preloader hands off,
  // playback is already flowing and a real tap resumes instantly with no
  // rebuffer. Guarded with a ref flag so StrictMode's double-invoked effect
  // in dev doesn't create a second player against the same target node.
  useEffect(() => {
    if (playerInitStarted.current) return;
    playerInitStarted.current = true;

    const createPlayer = () => {
      playerRef.current = new window.YT.Player('youtube-audio-player', {
        videoId: WEDDING_SONG_YOUTUBE_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          playlist: WEDDING_SONG_YOUTUBE_ID, // required by YT for looping a single video
          loop: 1,
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(35);
            if (!wantsToPlayRef.current) {
              event.target.mute();
            }
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              if (!isMusicReadyRef.current) {
                isMusicReadyRef.current = true;
                setIsMusicReady(true);
                if (!wantsToPlayRef.current) {
                  // That was the silent warm-up buffer, not a real play —
                  // stop it and hand control back to the toggle button.
                  event.target.pauseVideo();
                  event.target.unMute();
                  return;
                }
              }
              setIsPlaying(true);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
          onError: () => setIsMusicFailed(true),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = () => setIsMusicFailed(true);
      document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    }
  }, []);

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => setIsFontsReady(true));
    } else {
      setIsFontsReady(true);
    }
  }, []);

  // Safety net so a stalled font load or a slow/blocked YouTube connection
  // can never strand a guest on the loading screen forever — it just gives
  // up on the instant-playback guarantee past this point.
  useEffect(() => {
    const timeout = setTimeout(() => setIsTimedOut(true), 6000);
    return () => clearTimeout(timeout);
  }, []);

  // The preloader now waits on the music warm-up too (ready or definitively
  // failed), not just fonts — see the effect above for why.
  const isAppReady = (isFontsReady && (isMusicReady || isMusicFailed)) || isTimedOut;

  useEffect(() => {
    if (!isAppReady) return;
    const timeout = setTimeout(() => setShowPreloader(false), 900);
    return () => clearTimeout(timeout);
  }, [isAppReady]);

  const handleToggleMusic = () => {
    if (isMusicFailed) return;
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') {
      // Still initializing — remember the request and reflect it
      // optimistically; onReady above starts playback the instant it's set up.
      const next = !wantsToPlayRef.current;
      wantsToPlayRef.current = next;
      setIsPlaying(next);
      return;
    }
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-void)] font-sans antialiased relative overflow-x-hidden">
      {showPreloader && <Preloader ready={isAppReady} />}

      {/* Hidden YouTube player powering the background wedding song */}
      <div id="youtube-audio-player" className="absolute w-px h-px -left-full overflow-hidden opacity-0 pointer-events-none" aria-hidden="true" />

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
