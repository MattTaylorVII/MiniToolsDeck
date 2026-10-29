# MiniToolsDeck — 26-page SEO structure

## Deploy on Vercel
Upload or deploy the **contents** of this folder as the site root. `index.html` is the homepage; each tool has a dedicated `<slug>/index.html` page. Assets are shared under `/assets/`.

If deploying through Git, put these files at the repository root. Vercel static hosting should serve the directory index URLs. Test several tool URLs directly after deployment.

## Canonical hostname
The canonical base URL is currently `https://minitoolsdeck.vercel.app`. If you use a custom domain, update the canonical, Open Graph URLs, sitemap and robots.txt before launch.

## SEO notes
- Every tool has a unique title, description, H1, short guide, FAQ, related-tool links, canonical and WebApplication JSON-LD.
- The homepage is a directory, not a tab-based app. Each tool retains its original HTML panel and shared JavaScript.
- Check browser functionality for each tool and external library availability after deployment.
- Search engines choose their own titles/snippets; these tags do not guarantee ranking.
- Google Analytics from the original site was deliberately omitted from this version; reconnect it only after reviewing your privacy/consent requirements.
- Existing hash URLs like `/#word-counter` will now open the homepage rather than auto-select a tool. Add redirects if you have published links to those fragments (fragments cannot be redirected by the server).
