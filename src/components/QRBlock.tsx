import { QrCode, MessageCircle } from 'lucide-react';
import { EVENT_CHAT_URL } from '../data';
import ScrollReveal from './ScrollReveal';
import SectionHeader from './SectionHeader';

export default function QRBlock() {
  return (
    <section className="py-16 md:py-24 px-4 bg-[var(--color-navy)]">
      <div className="max-w-md mx-auto text-center">
        <ScrollReveal>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--color-sky)]">
            Оставайся на связи
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mt-2 mb-8">
            Чат мероприятия
          </h2>

          <div className="w-40 h-40 md:w-44 md:h-44 mx-auto rounded-2xl border-2 border-dashed border-white/25 bg-white/5 flex flex-col items-center justify-center gap-2">
            <QrCode size={40} className="text-white/60" strokeWidth={1.25} />
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 px-4 text-center">
              QR-код появится здесь
            </span>
          </div>

          <p className="text-white/60 text-sm mt-6 max-w-xs mx-auto">
            Все важные детали и новости — в общем чате мероприятия. Отсканируй код или нажми
            на кнопку ниже.
          </p>

          <a
            href={EVENT_CHAT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 rounded-full bg-[var(--color-sky)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-white transition-colors"
          >
            <MessageCircle size={15} /> Перейти в чат мероприятия
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
