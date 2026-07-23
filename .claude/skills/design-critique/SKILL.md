---
name: design-critique
description: Self-review checklist to run over a new or edited section of this site before calling it done. Inspired by impeccable's audit/critique/polish workflow. Use after building or changing a visual block, before reporting it complete.
---

# Design Critique Pass

A lightweight stand-in for impeccable's `/impeccable audit` / `critique` /
`polish` commands — run this manually as a checklist since the real CLI isn't
installed (see `../../../DESIGN.md` → "About the reference skills" for why).

## Run this after building or editing any block

1. **Contrast** — is every text/background pairing readable? (`ink` on
   `cream`/`sky-light`, or white on `ink`/`navy`/saturated `sky`.)
2. **Rhythm** — does the section's vertical spacing match its siblings (see
   `DESIGN.md` → "Layout rhythm")? No block should feel cramped or floaty next
   to the others.
3. **Font discipline** — serif for titles, sans for body, mono for
   ticket-style meta, script only for the one handwritten line. No stray
   system-font fallback visible.
4. **Motion** — entrance animation is a calm fade/slide (`ScrollReveal`
   pattern already in the codebase), not a bounce or spin.
5. **Responsiveness** — check the block from a narrow (375px) viewport
   mentally or via the browser preview; ticket-notch/perforation decorations
   should not overflow or clip content on mobile.
6. **Role-block correctness** — if the change touches `RoleBlock`, confirm
   every role in `ROLES` still renders (not just the one you were testing),
   and that unknown/missing `?role=` still falls back to `guest` cleanly.
7. **Real content, not lorem** — every string should be actual Russian copy
   for this event, not placeholder text left behind from scaffolding.

Only report a block "done" once these seven checks pass.
