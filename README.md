# X Phones

Static storefront for the X Phone lineup — deployed via GitHub Pages.

**Live site:** https://rextest84-source.github.io/X-Phones/ *(after enabling Pages — see below)*

## One-time Pages setup

The deploy workflow publishes to the `gh-pages` branch on every push to `main`. To go live:

1. Open **Settings → Pages** in this repo
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Choose branch **`gh-pages`**, folder **`/ (root)`**, then Save

## Local preview

Open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8080
```

## Deploy

Pushes to `main` automatically rebuild and publish to the `gh-pages` branch.
