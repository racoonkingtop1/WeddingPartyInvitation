# DESIGN.md — Wedding Party Invitation

Single source of truth for this project's visual language. Read this before
adding or changing any UI. Style direction: **"liquid glass, midnight"** — a
dark, frosted-glass event ticket floating over softly glowing blue/black
blobs. Replaces the earlier "elegant event ticket" cream/gold paper look —
that identity was fully replaced, not blended; the ticket *structure*
(notch cutouts, perforation, stub, mono micro-labels) survives, its surface
does not.

## About the reference skills

This project's `.claude/skills/` folder is inspired by four public Claude
Skills the user asked to install: `caveman-claude-skill`, `open-design`,
`impeccable`, and `ui-ux-pro-max-skill`. Their installers (`npx impeccable
install`, `npm install -g ui-ux-pro-max-cli`, `od mcp install claude`) run
third-party code from npm/an external app, which falls outside what this
assistant executes unattended. Instead, the *methodology* each one documents
publicly (DESIGN.md-driven design systems, a curated palette/pattern/type
catalog, an audit/critique checklist, an optional terse chat mode) was
distilled into local, inert skill files under `.claude/skills/`.

## Palette

Cool-neutral ground plus one accent hue family (blue) — no warm accent
survives this redesign; even the former "special role" gold highlight is
now a lighter blue tone, differentiated by glow rather than hue.

| Token | Hex | Use |
|---|---|---|
| `void` | `#05070C` | Page background, outside the phone shell |
| `abyss` | `#0A0F1A` | Ticket-notch punch-out fill, small tile fills (dog mascot tile) |
| `abyss-2` | `#101A2C` | Secondary solid-ish card fill (one RoleBlock accent variant) |
| `blue` | `#3E7BFA` | Primary accent — buttons, badges, blob glow |
| `blue-light` | `#8FB8FF` | Labels, eyebrow text, hover states, the lighter of the two RoleBlock "blue" accents |
| `blue-deep` | `#14245C` | Deep blob gradient stop, adds depth without leaving the blue family |
| `ice` | `#EAF1FF` | Primary text on dark |
| `mist` | `#93A3C2` | Secondary/muted text on dark |

Never introduce a hue outside blue/black/neutral (no gold, blush, or any
warm accent) — the brief pins this palette specifically, and it happens to
match the couple's own real dress code (black or blue).

## Typography

Unchanged from the previous system — the font swap was already settled and
survives this visual-world replacement:

- **Cormorant Garamond** (`font-serif`) — titles, names, role values,
  editorial moments.
- **Onest** (`font-sans`) — body copy.
- **Space Mono** (`font-mono`) — ticket-code meta: times, labels, addresses,
  role tags. No Cyrillic glyphs; falls back to the system monospace for
  Russian labels, which is expected and not to be "fixed".
- **Marck Script** (`font-script`) — one handwritten line max per page.

## Liquid glass

Glass is now the base material of the whole surface, not a sparing accent —
that is the point of this redesign. Four utilities in `src/index.css`:

- `.glass-panel` — translucent dark fill (`rgba(16,24,40,0.55)`) +
  `blur(24px) saturate(160%)` + a 1px blue-tinted border. The default
  surface for every content card (ticket body, schedule rows, dress-code
  card, role card, timeline).
- `.glass-panel-strong` — less transparent (`rgba(8,13,24,0.86)`), used
  where a lot of body copy needs to stay legible over the moving blob
  background: the outer phone shell (`App.tsx`) and the family popup.
- `.glass-chip` — small pills/badges (the "Кто моя семья?" trigger, the
  Yandex Maps link).
- `.glow-blue` — soft blue box-shadow, used sparingly as a "this one is
  special" signal (e.g. the `gold`-keyed RoleBlock accent).

## Fixed background texture

The outer fixed decoration layer (`App.tsx`) carries three large
(`blur-3xl`) radial blobs — `blue`, `blue-deep`, `blue-light` — over a flat
`void` fill, plus `.bg-grain`, a low-opacity (`opacity-[0.05]`) tiled SVG
`feTurbulence` noise texture blended with `mix-blend-overlay` (not
`multiply` — multiply would crush a light-colored grain to black against
this dark base; overlay lets it read faintly inside the lighter blob glow
regions and stay invisible over flat void). Deliberately *not* a dot/line
grid. This fixed backdrop is also what removes hard section-to-section
seams: sections no longer carry their own flat/gradient background color —
they are transparent, so every card just floats as glass over one
continuous backdrop.

## Layout rhythm — the "phone shell"

Unchanged structurally from the previous system:

- an outer `<div>` covering the viewport, `bg-[var(--color-void)]`, with
  the grain layer and three blurred blob decorations as the only page-level
  decoration;
- a single content shell, `w-full max-w-[480px] mx-auto`, now itself
  `.glass-panel-strong` rather than a flat cream paper fill — the shell is
  one large glass pane floating over the fixed blob background, holding
  every section in document order. Below `sm` it has no rounding, so it
  fills the device viewport edge-to-edge; at `sm:` and up it gets
  `rounded-[36px]` and outer page margin.
- Sections no longer own a background at all (no more chained gradients —
  that whole problem disappears once nothing is flat-filled). Each section
  keeps its `py-14 px-6` padding directly on the `<section>`.
- Cards use `rounded-[28px]` with `ticket-notch` + `perforation` (now
  recolored: the notch punch-out fill is `abyss`, the perforation dashes are
  `blue-light/20`) on ticket-surface cards (hero), a plainer `rounded-2xl`
  `.glass-panel` for informational cards (schedule rows, location, dress
  code, role).
- Entrance motion: unchanged `ScrollReveal` fade+slide pattern, no
  bounce/elastic easing anywhere.

## Component patterns

- **Welcome hero (ticket card)** — unchanged behavior: auto-fills from
  `?guest=<id>` or the manual `?name=`/`?role=` pair. Now a `.glass-panel`
  surface instead of flat cream paper. The mascot (`DogIllustration.tsx`)
  is strictly two-tone: `blue` fur + `void` linework — the redesign's own
  accent pair, replacing the old gold/ink pairing — sitting on an `abyss`
  tile that matches the new dark card surface, with its glasses' "shine"
  punch-out recolored from `cream` to `abyss` to keep matching that tile.
- **Family popup** — unchanged behavior, now `.glass-panel-strong` over a
  `void/70` backdrop instead of a light frosted panel over an `ink/45`
  backdrop.
- **RoleBlock accents** — the four accent keys in `data.ts` (`sky`, `gold`,
  `navy`, `ink`) are unchanged (they're just categorization strings), but
  `ACCENT_STYLES` in `RoleBlock.tsx` now maps all four into the blue/black
  pair only: `sky`/`gold` render as two blue treatments (plain glass vs.
  glass + `.glow-blue` for a "this one's special" read), `navy`/`ink`
  render as two black-family solid-ish cards (`abyss-2` vs `void`). The
  former per-accent light/dark text branching is gone — every card is dark
  now, so text is always `ice`/`mist`.
- **Section header** — small mono uppercase eyebrow label in `blue-light`,
  followed by a `font-serif` title in `ice`.
- **Badge/pill** — `rounded-full`, mono uppercase text, `blue` fill with
  `void` text (was `sky` fill with `ink` text).
- **Button (primary)** — solid `blue` fill, `void` text, `rounded-full`,
  hover lightens to `blue-light`.
- **Button (secondary/outline)** — `.glass-chip`, hover fills `blue/15`.

## Anti-patterns (checked during `design-critique`)

No hue outside blue/black/neutral (no gold, blush, or other warm accent).
No flat opaque section backgrounds — every section is transparent, letting
the fixed blob backdrop and nested glass panels carry the surface. No
dot/line grid textures (noise/grain only, blended with `overlay` not
`multiply` on a dark base). No bouncy easing. No more than 3 font families
visible in one view. No low-contrast text-on-accent. No re-introducing form
inputs into the hero. No `md:`/`lg:` layout variants inside a section (the
phone shell caps width at `sm`). Text on glass must be `ice` (primary) or
`mist` (secondary) only, never a color tuned for the old light-card system.
