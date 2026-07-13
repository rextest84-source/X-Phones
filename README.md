# X Phones

Static storefront for the X Phone lineup — published on [Netlify](https://www.netlify.com/).

## Netlify setup

1. In [Netlify](https://app.netlify.com/), choose **Add new site → Import an existing project**
2. Connect this GitHub repo (`rextest84-source/X-Phones`)
3. Netlify reads `netlify.toml` automatically:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.` (repo root)
4. Deploy

No build step is required — the site is plain HTML, SVG images, and Tailwind via CDN.

## Local preview

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Project structure

```
index.html          Home page
shop.html           Shop page
images/             X Phone product photos (PNG)
netlify.toml        Netlify publish settings
```
