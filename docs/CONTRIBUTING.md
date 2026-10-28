# Contributing

This is a small personal project, but suggestions and fixes are welcome.

- **Setup:** `npm install`, then `npm run dev`. Add `?demo=1` to the URL for sample data.
- **Before opening a PR:** run `npm test` and `npm run build`. Both must pass.
- **Logic** lives in `src/lib/` as plain TypeScript with unit tests in `tests/`. Keep views thin.
- **Keep it light:** no new runtime dependencies without a good reason, no third-party scripts, fonts or trackers, and no network calls with user data.
- **Accessibility:** use labels on every input, keep tap targets at least 44px and contrast at least 4.5:1, and respect `prefers-reduced-motion`. Lighthouse accessibility should stay at 100.
- **Style:** Vue 3 `<script setup lang="ts">` and Tailwind utilities. Theme colours are in `tailwind.config.js`.
- **Commits:** short, imperative messages ("Add merge import").
