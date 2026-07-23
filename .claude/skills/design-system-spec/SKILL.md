---
name: design-system-spec
description: How to read and update this project's DESIGN.md — the single source of truth for colors, type, spacing, and component rules. Use before touching any visual code (Tailwind classes, new components, palette/typography changes).
---

# Design System Spec

Inspired by the "open-design" convention of a brand-grade `DESIGN.md` that every
prototype/component reads from, instead of ad-hoc inline choices per file.

## Before writing UI code

1. Read [`DESIGN.md`](../../../DESIGN.md) at the project root. It defines the
   locked palette, type scale, spacing rhythm, and the reusable component
   patterns (ticket card, section shell, badge, button).
2. Reuse an existing Tailwind `@theme` token (`--color-sky`, `--color-ink`,
   `--color-cream`, `--color-gold`, `--color-navy`) rather than inventing a new
   hex value inline. If a new token is genuinely needed, add it to
   `src/index.css`'s `@theme` block AND document it in `DESIGN.md` in the same
   change — never one without the other.
3. Match the existing section rhythm (see `DESIGN.md` → "Layout rhythm")
   instead of picking new padding/margin values per section.

## After adding a new visual pattern

If you introduce a genuinely new, reusable pattern (a new card style, a new
badge shape), add a short entry to `DESIGN.md` under "Component patterns" so
the next block that needs something similar reuses it instead of drifting.

## Anti-drift rule

Two blocks solving the same visual problem (e.g. "a labelled info card") should
look like siblings, not strangers. If a new block needs something close to an
existing pattern, extend that pattern rather than inventing a parallel one.
