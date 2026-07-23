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
| `navy` | `#1F3A52` | Secondary text, deep contrast fills |

Never add a 6th hue — vary tint/weight of these seven tokens instead.

## Typography

- **Fraunces** (`font-serif`) — titles, names, editorial moments
- **Manrope** (`font-sans`) — body copy
- **Space Mono** (`font-mono`) — ticket-code meta: times, labels, addresses,
  role tags (small, uppercase, tracked wide)
- **Caveat** (`font-script`) — one handwritten line max per page, never
  structural text

## Layout rhythm

- Sections are full-width cream/sky-light alternating bands, each with
  `py-16 md:py-24` vertical padding and a `max-w-2xl` (or `max-w-3xl` for the
  hero) centered content column.
- Cards use `rounded-[28px]` with a visible `ticket-notch` + `perforation`
  utility (see `src/index.css`) when they represent an actual "ticket"
  surface (hero, role block). Informational cards (schedule rows, location)
  use a plainer `rounded-2xl` with a 1px `sky-dark/15` border.
- Entrance motion: reuse the existing `ScrollReveal` fade+slide pattern from
  the sibling `wedding` project — no bounce/elastic easing anywhere.

## Component patterns

- **Ticket card** — cream surface, `ticket-notch` side cutouts, dashed
  `perforation` divider separating a "stub" section from the main body, mono
  micro-labels in the corners (e.g. `№ 001`, date code).
- **Section header** — small mono uppercase eyebrow label in `sky-dark`,
  followed by a `font-serif` title in `ink`.
- **Badge/pill** — `rounded-full`, mono uppercase text, colored by context
  (`sky` for neutral/guest, `gold` for any special role).
- **Button (primary)** — solid `sky` fill, `ink` text, `rounded-full`,
  hover darkens to `sky-dark` with white text.
- **Button (secondary/outline)** — 1.5px `ink` or `navy` border, transparent
  fill, hover fills `sky-light`.

## Anti-patterns (checked during `design-critique`)

No default Tailwind gradient combos, no bouncy easing, no more than 3 font
families visible in one view, no low-contrast text-on-accent, no dead-looking
interactive elements without a hover/focus state.
