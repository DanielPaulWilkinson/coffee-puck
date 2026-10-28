# Deploying to GitHub Pages (manual)

There's no CI workflow in this repo on purpose: publishing only happens when you do it by hand.

## One-off: publish from a `gh-pages` branch
```bash
npm ci
npm test
BASE_PATH=/coffee-puck/ npm run build          # match the repo name
npx gh-pages -d dist                           # pushes dist/ to the gh-pages branch
```
Then, on GitHub, go to **Settings → Pages → Build and deployment** and set:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **(root)**

The site appears at `https://danielpaulwilkinson.github.io/coffee-puck/` in about a minute. Pages serves it over HTTPS, which the PWA needs before it can be installed.

## Updating
Run the same three build commands and `npx gh-pages -d dist` again. Installed copies pick up the new version the next time they open, because the service worker updates itself.

## Checks before you publish
- `npm test` and `npm run build` both pass.
- Lighthouse (in Chrome DevTools) scores accessibility 100 and shows the app as installable.
- The `og:image` URL in `index.html` matches the real site address.

## Optional: deploy with Actions later
If you'd rather deploy from GitHub Actions, add a workflow that runs `actions/upload-pages-artifact` and `actions/deploy-pages`, and set the Pages source to **GitHub Actions**. Pushing a workflow file needs a token with the `workflow` scope.
