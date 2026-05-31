# Porto — Developer Portfolio

A single-page personal portfolio for a software engineer. Dark, bold,
award-site aesthetic with an **orange-on-black** palette, oversized display
typography, and tasteful motion.

**Stack:** React 18 · Vite · Tailwind CSS · Framer Motion. Built from
scratch — no UI kit, no template.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Editing content

All copy and placeholders live in **[`src/data.js`](src/data.js)** — name,
initials, role, city, email, the hero headline, bio, the 5 projects, the
stack list, the 4 stats, and social URLs. No copy is hard-coded in
components.

Design tokens (colours + fonts) live in
[`tailwind.config.js`](tailwind.config.js) and are mirrored as CSS variables
in [`src/index.css`](src/index.css).

## Structure

```
src/
├─ App.jsx
├─ main.jsx
├─ index.css            # tokens, globals, keyframes, reduced-motion
├─ data.js              # ← all editable content
├─ lib/richText.jsx     # **bold** parser for copy
└─ components/
   ├─ Reveal.jsx        # reusable fade-up-on-scroll wrapper
   ├─ Preloader.jsx
   ├─ CursorGlow.jsx
   ├─ GrainOverlay.jsx
   ├─ Navbar.jsx
   ├─ Hero.jsx
   ├─ Marquee.jsx
   ├─ SectionHeader.jsx
   ├─ About.jsx         # (01)
   ├─ Work.jsx          # (02)
   ├─ Stack.jsx         # (03)
   ├─ Stats.jsx
   ├─ CTA.jsx
   └─ Footer.jsx
```

## Accessibility & motion

- Semantic landmarks, real heading hierarchy, focus-visible styles.
- Respects `prefers-reduced-motion`: entrance/scroll animations are skipped
  and content shows immediately.
- Works down to ~360px wide; type scales with `clamp()`.
