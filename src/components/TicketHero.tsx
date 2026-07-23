import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Upload, ImagePlus } from 'lucide-react';
import { BRIDE_NAME, GROOM_NAME, EVENT_DATE_LABEL } from '../data';

const PHOTO_KEY = 'wpi_guest_photo';
const NAME_KEY = 'wpi_guest_name';
const NOTE_KEY = 'wpi_guest_note';

export default function TicketHero() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [note, setNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhoto(localStorage.getItem(PHOTO_KEY));
    setGuestName(localStorage.getItem(NAME_KEY) ?? '');
    setNote(localStorage.getItem(NOTE_KEY) ?? '');
  }, []);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPhoto(dataUrl);
      localStorage.setItem(PHOTO_KEY, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleNameChange = (value: string) => {
    setGuestName(value);
    localStorage.setItem(NAME_KEY, value);
  };

  const handleNoteChange = (value: string) => {
    setNote(value);
    localStorage.setItem(NOTE_KEY, value);
  };

  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 bg-[var(--color-cream)] overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-sky) 0%, transparent 70%)' }}
      />
      <div className="max-w-2xl mx-auto relative">
        <div className="text-center mb-8">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--color-sky-dark)]">
            Посадочный билет · {EVENT_DATE_LABEL}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--color-ink)] mt-3 leading-tight">
            Ваш билет на свадебные посиделки
          </h1>
          <p className="font-serif italic text-lg text-[var(--color-navy)]/80 mt-2">
            {GROOM_NAME} &amp; {BRIDE_NAME}
          </p>
        </div>

        {/* Ticket card */}
        <div className="ticket-notch rounded-[28px] shadow-xl shadow-[var(--color-navy)]/10 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 p-6 md:p-8 bg-[var(--color-cream)]">
            {/* Left: guest info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-sky-dark)]">
                    Кому
                  </label>
                  <input
                    value={guestName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Впиши своё имя"
                    className="w-full mt-1 bg-transparent border-b-2 border-[var(--color-sky)]/40 focus:border-[var(--color-sky)] outline-none font-serif text-xl text-[var(--color-ink)] placeholder:text-[var(--color-navy)]/30 py-1 transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-sky-dark)]">
                    Пожелание молодожёнам
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => handleNoteChange(e.target.value)}
                    placeholder="Необязательно — можно оставить пару слов"
                    rows={2}
                    className="w-full mt-1 bg-transparent border-b-2 border-[var(--color-sky)]/40 focus:border-[var(--color-sky)] outline-none text-sm text-[var(--color-ink)] placeholder:text-[var(--color-navy)]/30 py-1 resize-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Right: photo upload */}
            <div className="flex sm:flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl border-2 border-dashed border-[var(--color-sky-dark)]/40 bg-[var(--color-sky-light)] flex items-center justify-center overflow-hidden shrink-0 cursor-pointer hover:border-[var(--color-sky-dark)] transition-colors group"
              >
                {photo ? (
                  <img src={photo} alt="Ваше фото" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-[var(--color-sky-dark)]">
                    <ImagePlus size={22} strokeWidth={1.75} />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-center px-2">
                      Загрузить фото
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-[var(--color-ink)]/0 group-hover:bg-[var(--color-ink)]/10 transition-colors" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              {photo && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-sky-dark)] hover:text-[var(--color-ink)] flex items-center gap-1"
                >
                  <Upload size={11} /> Заменить
                </button>
              )}
            </div>
          </div>

          {/* Perforated divider */}
          <div className="h-4 relative">
            <div className="absolute inset-0 border-t-2 border-dashed border-[var(--color-navy)]/20" style={{ top: '50%' }} />
          </div>

          {/* Stub */}
          <div className="px-6 md:px-8 pb-6 pt-2 bg-[var(--color-cream)] flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-wider text-[var(--color-navy)]/60">
            <span>№ 001 · GUEST PASS</span>
            <span>{EVENT_DATE_LABEL}</span>
            <span>16:00</span>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--color-navy)]/50 mt-4">
          Фото и имя сохраняются только в твоём браузере — это твоя личная копия билета.
        </p>
      </div>
    </section>
  );
}
