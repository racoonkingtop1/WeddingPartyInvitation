import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Users, Heart } from 'lucide-react';
import { ROLES } from '../data';
import { Guest } from '../guests';

export default function FamilyPopup({
  members,
  currentId,
  special,
  onClose,
}: {
  members: Guest[];
  currentId: string;
  special?: { label: string; name: string };
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Rendered via a portal straight onto <body>: the phone-shell ancestor
  // uses backdrop-filter, which creates a new containing block for
  // position: fixed descendants — without the portal this modal centers
  // inside that (tall, scrollable) shell instead of the actual viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 py-8 bg-[var(--color-void)]/70 backdrop-blur-sm animate-pop-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Твоя семья"
    >
      {/* Fixed proportion of the viewport height with the member list
          scrolling internally — the list can run from 2 to 9+ rows
          depending on the family, so a free-height card would either
          clip off-screen or need the whole page to scroll behind an
          overlay, both worse than a capped card with its own scroll. */}
      <div
        className="relative w-full max-w-[360px] max-h-full glass-panel-strong rounded-[28px] flex flex-col overflow-hidden animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-mist)] hover:bg-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="shrink-0 px-6 pt-7 pb-1">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-blue)] flex items-center justify-center mb-4">
            <Users size={22} className="text-[var(--color-void)]" strokeWidth={1.75} />
          </div>

          <h3 className="font-serif text-2xl font-semibold text-[var(--color-ice)] mb-1">
            Твоя семья
          </h3>
          <p className="text-sm text-[var(--color-mist)]">
            На нашей свадьбе вы будете радоваться вместе!
          </p>
        </div>

        <ul className="min-h-0 overflow-y-auto overscroll-contain space-y-2.5 px-6 pt-4 pb-7">
          {special && (
            <li className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-blue-light)]/30 bg-[var(--color-blue)]/10 glow-blue px-4 py-3">
              <span className="font-serif text-lg text-[var(--color-ice)]">{special.name}</span>
              <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--color-blue-light)] whitespace-nowrap">
                <Heart size={11} strokeWidth={2} /> {special.label}
              </span>
            </li>
          )}
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-blue-light)]/15 bg-white/5 px-4 py-3"
            >
              <span className="font-serif text-lg text-[var(--color-ice)]">
                {member.name}
                {member.id === currentId && (
                  <span className="font-sans text-xs text-[var(--color-blue-light)] ml-1.5">
                    (это ты)
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-mist)] whitespace-nowrap">
                {member.title ?? ROLES[member.role].title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
