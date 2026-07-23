import { QrCode, MessageCircle } from 'lucide-react';
import { EVENT_CHAT_URL } from '../data';
import ScrollReveal from './ScrollReveal';

export default function QRBlock() {
  return (
    <section className="relative py-14 px-6 bg-gradient-to-br from-[var(--color-navy)] to-[#142434] text-center overflow-hidden">
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-sky) 0%, transparent 70%)' }}
      />
      <ScrollReveal>
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--color-sky)]">
          Оставайся на связи
        </span>
        <h2 className="relative font-serif text-3xl font-semibold text-white mt-2 mb-8">
          Чат мероприятия
        </h2>

        <div className="relative w-40 h-40 mx-auto rounded-2xl border-2 border-dashed border-white/25 bg-white/5 flex flex-col items-center justify-center gap-2">
          <QrCode size={40} className="text-white/60" strokeWidth={1.25} />
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 px-4 text-center">
            QR-код появится здесь
          </span>
        </div>

        <p className="relative text-white/60 text-sm mt-6 max-w-xs mx-auto">
          Все важные детали и новости — в общем чате мероприятия. Отсканируй код или нажми
          на кнопку ниже.
        </p>

        <a
          href={EVENT_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex items-center gap-2 mt-6 rounded-full bg-[var(--color-sky)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-ink)] hover:bg-white transition-colors"
        >
          <MessageCircle size={15} /> Перейти в чат мероприятия
        </a>
      </ScrollReveal>
    </section>
  );
}
