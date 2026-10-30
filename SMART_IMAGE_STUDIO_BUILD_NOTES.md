# Smart Image Studio — Phase 1 prototype

New page: `/smart-image-studio/`. Existing `/smart-image-resizer/` and `/batch-image-converter/` remain **unchanged**. No homepage cards, sitemap, redirects or canonical URLs have been altered; do not deploy as a replacement for the existing tools without review.

Implemented: drag-and-drop/file/clipboard image import, crop (center ratio or custom percentage rectangle), resize with aspect ratio lock and presets, rotate/flip, brightness/contrast/saturation adjustments, PNG/JPEG/WebP export with quality, reset, undo/redo (12 states), local browser processing.

Limits: one image at a time; image must be <=12,000 pixels per side and <=40MP; history snapshots may consume considerable memory on large images. This is not yet a production-grade batch editor or true drag-handle crop UI. Unsupported browser formats may fail. Image format conversion is via browser Canvas, so animation and some metadata are not preserved.

Future phases: interactive crop handles, batch workflow, true compression-size target, watermarking, before/after comparison, background removal, PDF and palette tools, mobile and cross-browser QA, and homepage integration.
