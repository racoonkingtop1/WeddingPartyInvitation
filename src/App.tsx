import TicketHero from './components/TicketHero';
import ScheduleBlock from './components/ScheduleBlock';
import DressCodeBlock from './components/DressCodeBlock';
import RoleBlock from './components/RoleBlock';
import LocationBlock from './components/LocationBlock';
import QRBlock from './components/QRBlock';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] font-sans antialiased">
      <TicketHero />
      <ScheduleBlock />
      <DressCodeBlock />
      <RoleBlock />
      <LocationBlock />
      <QRBlock />
      <footer className="py-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-navy)]/50 bg-[var(--color-navy)]">
        <span className="text-white/40">Валерия &amp; Павел · Свадебные посиделки · 2026</span>
      </footer>
    </div>
  );
}
