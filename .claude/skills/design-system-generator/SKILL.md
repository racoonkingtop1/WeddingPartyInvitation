---
name: design-system-generator
description: Curated palette/typography/pattern picks for this wedding-party site, distilled from the ui-ux-pro-max design-intelligence approach. Use when choosing a color for a new element, picking a font weight, or deciding how a new section should be laid out.
---

# Design System Generator (curated, project-scoped)

Inspired by "ui-ux-pro-max"'s idea of matching palette/style/pattern to context
instead of guessing — but scoped down to the one set already chosen for this
project (see `DESIGN.md`), not a general-purpose catalog.

## Style direction

**"Elegant event ticket"** — a wedding invitation crossed with a printed event
pass: ticket-stub notches, perforated dividers, monospace "ticket code" details,
soft paper-cream backgrounds, a single confident accent (sky blue) plus a
restrained gold for anything marked "special".

## Palette (locked — see `DESIGN.md` for hex values and usage rules)

`sky` (primary accent) · `ink` (text/black) · `cream` (background/paper) ·
`gold` (special-role / highlight accent) · `navy` (secondary text, deep contrast)

Do not introduce a 6th hue. If something needs emphasis, vary weight/size/tint
of an existing token before reaching for a new color.

## Typography pairing

- `font-serif` (Fraunces) — section titles, names, anything that should feel
  like print/editorial.
- `font-sans` (Manrope) — body copy, descriptions.
- `font-mono` (Space Mono) — ticket-code style details: times, role tags, seat
  numbers, addresses — small uppercase-tracked labels that reinforce the
  "ticket" feel.
- `font-script` (Caveat) — sparse, handwritten touches only (a personal line,
  a signature), never for structural text.

## Anti-patterns to avoid (from impeccable's detector philosophy)

- No default-bland gradients (`from-blue-500 to-purple-500` etc.) — use the
  locked palette or a single subtle radial glow at low opacity instead.
- No bouncy/elastic easing on entrance animations — use calm ease-out fades
  and slides, consistent with the rest of the site.
- Don't stack more than 3 font families in one view.
- Keep text-on-`sky`/`gold` contrast checked — prefer `ink` or white text on
  saturated accent fills, never `navy`-on-`sky`.
- Every interactive element (button, link, role toggle) needs a visible
  hover/focus state — no dead-looking clickables.
