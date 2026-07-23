import { useEffect } from 'react';
import { X, Users } from 'lucide-react';
import { ROLES } from '../data';
import { Guest } from '../guests';

export default function FamilyPopup({
  members,
  currentId,
  onClose,
}: {
  members: Guest[];
  currentId: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-[var(--color-ink)]/45 backdrop-blur-sm animate-pop-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Твоя семья сегодня"
    >
      <div
        className="relative w-full max-w-[360px] glass-panel rounded-[28px] px-6 py-7 animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-ink)]/60 hover:bg-[var(--color-ink)]/10 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[var(--color-sky)] flex items-center justify-center mb-4">
          <Users size={22} className="text-[var(--color-ink)]" strokeWidth={1.75} />
        </div>

        <h3 className="font-serif text-2xl font-semibold text-[var(--color-ink)] mb-1">
          Твоя семья сегодня
        </h3>
        <p className="text-sm text-[var(--color-navy)]/70 mb-5">
          Вы здесь вместе — рады видеть всех в сборе.
        </p>

        <ul className="space-y-2.5">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-sky-dark)]/15 bg-white/55 px-4 py-3"
            >
              <span className="font-serif text-lg text-[var(--color-ink)]">
                {member.name}
                {member.id === currentId && (
                  <span className="font-sans text-xs text-[var(--color-sky-dark)] ml-1.5">
                    (это ты)
                  </span>
                )}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-navy)]/60 whitespace-nowrap">
                {ROLES[member.role].title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
