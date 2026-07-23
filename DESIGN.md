# DESIGN.md — Wedding Party Invitation

Single source of truth for this project's visual language. Read this before
adding or changing any UI. Style direction: **"elegant event ticket"** — a
wedding invite crossed with a printed event pass.

## About the reference skills

This project's `.claude/skills/` folder is inspired by four public Claude
Skills the user asked to install: `caveman-claude-skill`, `open-design`,
`impeccable`, and `ui-ux-pro-max-skill`. Their installers (`npx impeccable
install`, `npm install -g ui-ux-pro-max-cli`, `od mcp install claude`) run
third-party code from npm/an external app, which falls outside what this
assistant executes unattended. Instead, the *methodology* each one documents
publicly (DESIGN.md-driven design systems, a curated palette/pattern/type
catalog, an audit/critique checklist, an optional terse chat mode) was
distilled into local, inert skill files under `.claude/skills/`:

- `caveman-mode` — optional terse chat style (opt-in only)
- `design-system-spec` — read/update discipline for this file
- `design-system-generator` — the locked palette/type/pattern choices below
- `design-critique` — a manual audit checklist to run after building a block

## Palette

| Token | Hex | Use |
|---|---|---|
| `sky` | `#6FB4DE` | Primary accent — buttons, active states, role=guest tag |
| `sky-light` | `#DCEEF7` | Section tints, card backgrounds |
| `sky-dark` | `#3E7FA6` | Sky-on-sky text, borders |
| `ink` | `#171A1C` | Primary text, ticket-stub black |
| `cream` | `#FBF6EC` | Page/paper background |
| `gold` | `#C9A15D` | "Special role" accent, highlights |
| `gold-light` | `#F1E4C6` | Gold gradient stop, warm section tints |
| `navy` | `#1F3A52` | Secondary text, deep contrast fills |
| `blush` | `#F0C6BA` | Warm decorative accent — glow blobs, cheek/gradient stops, never body text |

Three hue families total: cool (sky), warm (gold/blush), neutral (ink/cream/navy).
Gradients must blend within or across these families (e.g. `sky → sky-light`,
`gold → blush`) — never introduce a hue outside this set, and never a stock
Tailwind gradient color (no `from-purple-500`, etc).

## Typography

- **Fraunces** (`font-serif`) — titles, names, editorial moments
- **Manrope** (`font-sans`) — body copy
- **Space Mono** (`font-mono`) — ticket-code meta: times, labels, addresses,
  role tags (small, uppercase, tracked wide)
- **Caveat** (`font-script`) — one handwritten line max per page, never
  structural text

## Layout rhythm — the "phone shell"

The whole page lives inside **one container shaped like a large phone
screen**, not a normal full-width responsive page. `App.tsx` renders:

- an outer `<div>` covering the viewport, with soft blurred gradient blobs
  (`sky`/`blush`/`gold`, low opacity, `blur-3xl`) as the only page-level
  decoration;
- a single content shell, `w-full max-w-[480px] mx-auto`, holding every
  section in document order. Below the `sm` breakpoint it has **no**
  rounding/border/shadow and **no** horizontal page padding, so it fills the
  device viewport edge-to-edge — on a real phone the shell *is* the screen.
  At `sm:` and up it gets `rounded-[36px]`, a soft shadow, and outer page
  margin, so it reads as a floating phone-shaped card centered on a wider
  viewport.
- Because the shell's width is capped at 480px regardless of viewport, do
  **not** reach for `md:`/`lg:` variants inside individual sections for
  spacing or type scale — the visual width never grows past `sm`. Pick one
  mobile-scale size and keep it. `sm:` is reserved for the outer shell
  chrome only.

Within the shell:

- Sections are cream/sky-light alternating bands (flat or gently
  gradient-tinted, e.g. `bg-gradient-to-b from-[var(--color-sky-light)] to-cream`),
  each with `py-14` vertical padding and `px-6` horizontal padding directly
  on the `<section>` — no extra inner `max-w` wrapper, the shell already
  constrains width.
- Cards use `rounded-[28px]` with a visible `ticket-notch` + `perforation`
  utility (see `src/index.css`) when they represent an actual "ticket"
  surface (hero, role block). Informational cards (schedule rows, location)
  use a plainer `rounded-2xl` with a 1px `sky-dark/15` border.
- Entrance motion: reuse the existing `ScrollReveal` fade+slide pattern from
  the sibling `wedding` project — no bounce/elastic easing anywhere.

## Component patterns

- **Welcome hero (ticket card)** — the hero is purely decorative/informational,
  no form inputs. It auto-fills from the invite link: `?name=` for the guest
  name (falls back to "Дорогой гость") and `?role=` for the role title,
  stacked as two labeled fields on the left. The right side holds a fixed
  illustration (the glasses-wearing dog, `DogIllustration.tsx`) with the
  short date (`EVENT_DATE_SHORT`, `20.08.2026`) beneath it. Cream surface,
  `ticket-notch` side cutouts, dashed `perforation` divider separating a
  "stub" section from the main body, mono micro-labels in the corners
  (e.g. `№ 001`, pass type).
- **Section header** — small mono uppercase eyebrow label in `sky-dark`,
  followed by a `font-serif` title in `ink`.
- **Badge/pill** — `rounded-full`, mono uppercase text, colored by context
  (`sky` for neutral/guest, `gold` for any special role).
- **Button (primary)** — solid `sky` fill, `ink` text, `rounded-full`,
  hover darkens to `sky-dark` with white text.
- **Button (secondary/outline)** — 1.5px `ink` or `navy` border, transparent
  fill, hover fills `sky-light`.

## Anti-patterns (checked during `design-critique`)

No default Tailwind gradient combos (gradients must use the palette tokens
above), no bouncy easing, no more than 3 font families visible in one view,
no low-contrast text-on-accent, no dead-looking interactive elements without
a hover/focus state, no `md:`/`lg:` layout variants inside a section (the
phone shell caps width at `sm`), no re-introducing form inputs into the hero.
