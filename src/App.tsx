import TicketHero from './components/TicketHero';
import ScheduleBlock from './components/ScheduleBlock';
import DressCodeBlock from './components/DressCodeBlock';
import RoleBlock from './components/RoleBlock';
import LocationBlock from './components/LocationBlock';
import QRBlock from './components/QRBlock';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] font-sans antialiased relative overflow-x-hidden">
      {/* Page-level decoration — only visible in the margins around the shell on wider screens */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden bg-[var(--color-cream)]">
        <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-multiply" />
        <div
          className="absolute -top-28 -left-24 w-80 h-80 rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-sky) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -right-32 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-blush) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--color-gold) 0%, transparent 70%)' }}
        />
      </div>

      {/* Phone shell — full-bleed on mobile (it IS the screen), a floating
          phone-shaped card once there's room to see its edges. */}
      <div className="relative py-0 sm:py-10 px-0 sm:px-4">
        <div className="relative w-full max-w-[480px] mx-auto bg-[var(--color-cream)] sm:rounded-[36px] sm:shadow-[0_30px_80px_-15px_rgba(31,58,82,0.35)] sm:border sm:border-white/70 overflow-hidden">
          <TicketHero />
          <ScheduleBlock />
          <DressCodeBlock />
          <RoleBlock />
          <LocationBlock />
          <QRBlock />
          <footer className="py-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] bg-[#142434]">
            <span className="text-white/40">Валерия &amp; Павел · Свадебные посиделки · 2026</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
