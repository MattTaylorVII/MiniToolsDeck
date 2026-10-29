# MiniToolsDeck — Premium Unified Layout Pass

- 22 HTML pages: homepage + 21 tools.
- Algorithm Exposure Score is the design reference.
- Shared dark header, original layer icon and MiniToolsDeck wordmark, consistent geometry on homepage and all tool pages.
- Two fonts: Manrope for headings; Inter for body/interface text.
- Unified premium hero, cards, tool panel spacing, responsive header and inputs for existing tool pages.
- Categories and Bookmark controls removed from page headers.
- Existing tools, scripts, IDs, routes and site assets preserved.

## Deployment
Upload the contents of this folder to your repository root, retaining the `assets` and tool subdirectories. The `index.html`, `vercel.json`, `robots.txt` and `sitemap.xml` files belong in the root.

## QA note
Static checks and JavaScript syntax checks passed. Browser navigation is blocked in the execution environment, so complete functional, mobile and theme-switch QA in a real browser before treating this as production-verified. External Google Fonts and Font Awesome need an internet connection.
