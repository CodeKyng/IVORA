# IVORA Landing Page

Professional, conversion-focused landing page for **IVORA** (Intelligence Value Operation and Reliable Automation).

## What’s included

- Fully responsive HTML / CSS / JavaScript
- Dark premium theme matching the IVORA logo (deep navy + violet accents)
- Three.js animated node network in the hero (automation / connected-systems motif)
- Waitlist form with client-side success state
- Sections: Hero + form, Problem, Services, How it works, Use cases, Results, FAQ, Final CTA, Footer
- SEO title + meta description
- Mobile navigation
- Subtle scroll-reveal animations (respects `prefers-reduced-motion`)

## Files

| File | Purpose |
|------|--------|
| `index.html` | Structure & content |
| `styles.css` | Design system & responsive layout |
| `script.js` | Form handling, mobile menu, Three.js scene, reveals |
| `logo.jpg` | Brand mark (add this file from the design assets) |

## Local preview

```bash
# From this directory
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:3000` (or 8080).

## Deploy

- **GitHub Pages**: enable Pages on the `main` branch / root.
- **Vercel / Netlify**: connect the repo; no build step required (static).

## Elevator pitch

IVORA designs and builds custom automation systems that eliminate repetitive work, connect your tools, and give your business cleaner operations. We turn manual processes into reliable, scalable workflows so you can focus on growth.

## Next steps

1. Add `logo.jpg` (the provided brand mark) to the repo root.
2. Wire the waitlist form to your preferred backend (Formspree, Airtable, custom API, etc.).
3. Optionally enable GitHub Pages or deploy to Vercel for a live URL.
