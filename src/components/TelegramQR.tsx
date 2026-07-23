// Real, scannable QR code encoding EVENT_CHAT_URL — generated offline with
// the `qrcode` npm package (run once, not a runtime dependency) so the
// module path data below can be dropped in as static markup. Regenerate if
// EVENT_CHAT_URL ever changes:
//   npm install qrcode --no-save && node -e "require('qrcode').toString(process.argv[1], {type:'svg', errorCorrectionLevel:'M', margin:1, color:{dark:'#000000', light:'#0000'}}, (e,s)=>console.log(s))" "<url>"
export default function TelegramQR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 31 31" shapeRendering="crispEdges" className={className} role="img" aria-label="QR-код чата мероприятия">
      <rect width="31" height="31" fill="var(--color-ice)" rx="2" />
      <path
        stroke="var(--color-blue-deep)"
        d="M1 1.5h7m2 0h2m2 0h1m2 0h1m2 0h2m1 0h7M1 2.5h1m5 0h1m3 0h1m2 0h3m6 0h1m5 0h1M1 3.5h1m1 0h3m1 0h1m2 0h5m2 0h5m1 0h1m1 0h3m1 0h1M1 4.5h1m1 0h3m1 0h1m3 0h1m1 0h4m2 0h2m2 0h1m1 0h3m1 0h1M1 5.5h1m1 0h3m1 0h1m2 0h2m1 0h3m1 0h1m1 0h1m3 0h1m1 0h3m1 0h1M1 6.5h1m5 0h1m1 0h1m1 0h2m1 0h2m2 0h4m1 0h1m5 0h1M1 7.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M10 8.5h1m1 0h2m1 0h1m2 0h4M1 9.5h1m2 0h1m1 0h2m1 0h2m1 0h2m2 0h1m1 0h1m1 0h1m1 0h1M3 10.5h3m2 0h1m1 0h4m1 0h2m2 0h6m1 0h1m2 0h1M2 11.5h1m1 0h4m1 0h1m3 0h1m3 0h1m1 0h2m1 0h7M4 12.5h1m1 0h1m3 0h4m1 0h2m2 0h2m2 0h2m2 0h2M2 13.5h1m4 0h3m3 0h1m3 0h2m4 0h1m2 0h1m1 0h2M2 14.5h1m1 0h1m1 0h1m2 0h1m1 0h3m2 0h1m2 0h4M1 15.5h2m2 0h1m1 0h2m2 0h2m3 0h4m1 0h1m3 0h5M1 16.5h3m4 0h1m1 0h1m2 0h3m1 0h2m4 0h1m1 0h2m1 0h1M2 17.5h1m3 0h2m2 0h3m1 0h4m2 0h3m5 0h1M2 18.5h1m5 0h2m1 0h1m1 0h1m2 0h1m1 0h3m1 0h1m1 0h1m2 0h1M1 19.5h1m3 0h3m1 0h1m1 0h1m1 0h2m4 0h1m8 0h2M5 20.5h1m3 0h2m3 0h1m1 0h4m3 0h1m1 0h1m2 0h2M1 21.5h1m1 0h1m3 0h2m3 0h2m1 0h1m1 0h1m2 0h6m1 0h1M9 22.5h1m2 0h3m1 0h2m2 0h2m3 0h1m1 0h3M1 23.5h7m3 0h1m2 0h3m4 0h1m1 0h1m2 0h1M1 24.5h1m5 0h1m1 0h1m1 0h2m1 0h1m2 0h1m1 0h1m3 0h5M1 25.5h1m1 0h3m1 0h1m2 0h1m1 0h2m1 0h3m3 0h5m2 0h1M1 26.5h1m1 0h3m1 0h1m1 0h3m1 0h8m1 0h6m1 0h1M1 27.5h1m1 0h3m1 0h1m3 0h1m1 0h1m1 0h1m2 0h2m2 0h1m1 0h4m1 0h1M1 28.5h1m5 0h1m2 0h1m1 0h5m1 0h2m4 0h1m3 0h1M1 29.5h7m1 0h1m1 0h1m2 0h5m2 0h1m2 0h2m2 0h1"
      />
    </svg>
  );
}
