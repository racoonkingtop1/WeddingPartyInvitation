import { Flag, MapPin, Navigation } from 'lucide-react';
import { EVENT_ADDRESS, EVENT_ADDRESS_QUERY } from '../data';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(EVENT_ADDRESS_QUERY)}&output=embed`;
const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_ADDRESS_QUERY)}`;
const YANDEX_MAPS_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(EVENT_ADDRESS_QUERY)}`;

export default function LocationBlock() {
  return (
    <section className="py-14 px-6 bg-[var(--color-cream)]">
      <ScrollReveal>
        <SectionHeader eyebrow="Куда приехать" title="Место проведения" />

        <div className="flex items-start gap-3 justify-center text-center mb-6 px-2">
          <MapPin size={20} className="text-[var(--color-sky-dark)] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="font-serif text-lg text-[var(--color-ink)] text-left">
            {EVENT_ADDRESS}
          </p>
        </div>

        <div className="relative rounded-[28px] overflow-hidden border border-[var(--color-sky-dark)]/20 shadow-lg shadow-[var(--color-navy)]/10">
          <iframe
            title="Карта места проведения"
            src={MAP_EMBED_SRC}
            width="100%"
            height="300"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-cartoon-filter"
          />
          {/* Decorative flag pin marking the address, overlaid on the centered map point */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(100%+2px)] flex flex-col items-center drop-shadow-lg">
            <Flag size={30} className="text-[var(--color-gold)] fill-[var(--color-gold)]" strokeWidth={2} />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)] -mt-0.5" />
          </div>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--color-navy)]/10 rounded-[28px]" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={YANDEX_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[var(--color-ink)]/80 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-sky-light)] transition-colors"
          >
            <Navigation size={14} /> Яндекс Карты
          </a>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sky)] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-[var(--color-sky-dark)] hover:text-white transition-colors"
          >
            <Navigation size={14} /> Google Maps
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
