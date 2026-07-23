import { MessageCircle } from 'lucide-react';
import { EVENT_CHAT_URL } from '../data';
import ScrollReveal from './ScrollReveal';
import TelegramQR from './TelegramQR';

export default function QRBlock() {
  return (
    <section className="relative py-10 px-6 text-center overflow-hidden">
      <ScrollReveal>
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--color-blue-light)]">
          Заходи в наш
        </span>
        <h2 className="relative font-serif text-3xl font-semibold text-[var(--color-ice)] mt-2 mb-8">
          Чат мероприятия
        </h2>

        <div className="relative w-40 h-40 mx-auto rounded-2xl glow-blue overflow-hidden p-2 bg-[var(--color-ice)]">
          <TelegramQR className="w-full h-full" />
        </div>

        <p className="relative text-[var(--color-mist)] text-sm mt-6 max-w-xs mx-auto">
          Все важные детали и новости — в общем чате мероприятия. Отсканируй код или нажми
          на кнопку ниже.
        </p>

        <a
          href={EVENT_CHAT_URL}
          target="_blank"
          rel="noreferrer"
          className="relative inline-flex items-center gap-2 mt-6 rounded-full bg-[var(--color-blue)] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--color-void)] hover:bg-[var(--color-blue-light)] transition-colors"
        >
          <MessageCircle size={15} /> Перейти в чат мероприятия
        </a>
      </ScrollReveal>
    </section>
  );
}
