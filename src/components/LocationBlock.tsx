import { useEffect, useRef } from 'react';
import { MapPin, Navigation, Plus, Minus } from 'lucide-react';
import { EVENT_ADDRESS, EVENT_ADDRESS_QUERY } from '../data';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

// Coordinates for СНТ «Ясная Поляна №94», дом 194 (Верхняя Пышма), read off
// the venue's own Yandex Maps pin so the marker centers on the exact house
// rather than a fuzzy text-search match.
const VENUE_LAT = 56.943285;
const VENUE_LON = 60.522115;

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_ADDRESS_QUERY)}`;
const YANDEX_MAPS_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(EVENT_ADDRESS_QUERY)}`;

// A heart-shaped pin (Material "favorite" silhouette + a small tail dot,
// same anchoring trick as a classic map pin) rendered once as an SVG data
// URI and handed to ymaps as a real Placemark icon — unlike a CSS overlay,
// this lives in the map's own geo-space, so it stays exactly on the address
// through any pan or zoom instead of just sitting at a fixed screen spot.
// Styled to match the site's own glass-panel language: a translucent dark
// "glass" body with a soft highlight, outlined in the brand blue rather
// than filled solid.
const HEART_PATH =
  'M17 21.35l-1.45-1.32C10.4 15.36 7 12.28 7 8.5 7 5.42 9.42 3 12.5 3c1.74 0 3.41.81 4.5 2.09C18.09 3.81 19.76 3 21.5 3 24.58 3 27 5.42 27 8.5c0 3.78-3.4 6.86-8.55 11.54L17 21.35z';
const HEART_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
  <defs>
    <filter id="ds" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000814" flood-opacity="0.45" />
    </filter>
    <clipPath id="heartClip">
      <path d="${HEART_PATH}" />
    </clipPath>
  </defs>
  <g filter="url(#ds)">
    <g clip-path="url(#heartClip)">
      <rect x="7" y="3" width="20" height="19" fill="rgba(10,15,26,0.55)" />
      <ellipse cx="13" cy="9" rx="6" ry="4.5" fill="rgba(234,241,255,0.28)" />
    </g>
    <path d="${HEART_PATH}" fill="none" stroke="#8FB8FF" stroke-width="1.6" stroke-linejoin="round" />
    <circle cx="17" cy="25.5" r="1.8" fill="#05070C" stroke="#8FB8FF" stroke-width="1" />
  </g>
</svg>`.trim();
const HEART_ICON_HREF = `data:image/svg+xml;base64,${btoa(HEART_ICON_SVG)}`;

declare global {
  interface Window {
    ymaps: any;
  }
}

export default function LocationBlock() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInitStarted = useRef(false);
  const mapRef = useRef<any>(null);

  // Loads the keyless Yandex Maps JS API and renders a real interactive map
  // with our own heart Placemark, instead of the simple iframe embed — only
  // the JS API lets a custom-shaped marker live in the map's coordinate
  // system so it tracks the address through drag/zoom. Guarded with a ref
  // flag so StrictMode's double-invoked effect in dev doesn't create two map
  // instances against the same container.
  useEffect(() => {
    if (mapInitStarted.current) return;
    mapInitStarted.current = true;

    const createMap = () => {
      window.ymaps.ready(() => {
        if (!mapContainerRef.current) return;
        // controls: [] drops every stock Yandex control (zoom, type
        // selector, fullscreen, geolocation, traffic...) — the only zoom
        // affordance guests get is our own themed +/- pair below, wired
        // straight to the map instance.
        const map = new window.ymaps.Map(mapContainerRef.current, {
          center: [VENUE_LAT, VENUE_LON],
          zoom: 16,
          controls: [],
        });
        map.behaviors.disable('scrollZoom');
        mapRef.current = map;

        const heart = new window.ymaps.Placemark(
          [VENUE_LAT, VENUE_LON],
          {},
          {
            iconLayout: 'default#image',
            iconImageHref: HEART_ICON_HREF,
            iconImageSize: [34, 34],
            iconImageOffset: [-17, -25.5],
          }
        );
        map.geoObjects.add(heart);
      });
    };

    if (window.ymaps && window.ymaps.Map) {
      createMap();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      tag.onload = createMap;
      document.head.appendChild(tag);
    }
  }, []);

  const handleZoom = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.setZoom(map.getZoom() + delta, { checkZoomRange: true, duration: 200 });
  };

  return (
    <section className="py-9 px-6">
      <ScrollReveal>
        <SectionHeader eyebrow="Взгляните на" title="Место проведения" />

        <div className="flex items-start gap-3 justify-center text-center mb-6 px-2">
          <MapPin size={20} className="text-[var(--color-blue-light)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="font-serif text-lg text-[var(--color-ice)] text-left">
            {EVENT_ADDRESS}
          </p>
        </div>

        <div className="relative rounded-[28px] overflow-hidden border border-[var(--color-blue-light)]/20 shadow-lg shadow-black/30">
          {/* yandex-map-neon scopes the dark/blue filter to the map's own
              raster tile pane only (see index.css) — applying it to the
              whole container would also invert our heart icon's colors.
              Same rule hides every stock Yandex overlay (copyright badge,
              leftover control panes) except the tiles themselves. */}
          <div ref={mapContainerRef} className="yandex-map-neon" style={{ width: '100%', height: 300 }} />

          {/* Our own +/- zoom controls, styled like the rest of the site,
              replacing Yandex's default zoom control entirely. */}
          <div className="absolute right-3 bottom-3 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => handleZoom(1)}
              aria-label="Приблизить карту"
              className="glass-chip w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-ice)] hover:bg-[var(--color-blue)]/20 transition-colors"
            >
              <Plus size={15} strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={() => handleZoom(-1)}
              aria-label="Отдалить карту"
              className="glass-chip w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-ice)] hover:bg-[var(--color-blue)]/20 transition-colors"
            >
              <Minus size={15} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={YANDEX_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="glass-chip inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ice)] hover:bg-[var(--color-blue)]/15 transition-colors"
          >
            <Navigation size={14} /> Яндекс Карты
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-blue)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-void)] hover:bg-[var(--color-blue-light)] transition-colors"
          >
            <Navigation size={14} /> Google Maps
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
