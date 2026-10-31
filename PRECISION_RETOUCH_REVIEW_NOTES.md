# MiniToolsDeck Smart Image Studio — Precision Retouch Review

## New capabilities
- Spot Repair: paints small marks using a nearby texture-matched patch.
- Healing Brush: Option/Alt-click to sample texture, then paint with local tone correction.
- Clone Stamp: Option/Alt-click to choose a clean source, then paint over the destination.
- Object Cleanup: drag a small rectangular selection and fill from an automatically matched nearby patch, with edge blending.
- Brush diameter, strength, softness, stroke Undo/Redo, before/after comparison, Apply and Discard.
- Uses existing image canvas, project-save workflow, global Undo/Redo, export center and drag-and-drop upload.

## Operational limits
- Best on small blemishes, scratches and distractions on backgrounds with usable nearby texture. It does NOT promise perfect removal of large or complicated objects, and is not an AI generative fill tool.
- Retouch draft is limited to 12 megapixels for browser memory and responsiveness; resize an oversized source before retouching.
- Rectangular Object Cleanup is limited to 260,000 pixels, at most 40% of each image dimension.
- Retouch history adapts to a roughly 80 MiB history budget. Applied edits are still part of the standard Studio undo history and saved projects.
- Source images never leave the browser; no paid APIs. Use an ordinary photo editing tool where a higher-end result is required on highly complex backgrounds.

## Verified checks
- JavaScript syntax, package ZIP CRC, image upload, Spot Repair draft vs. source-pixel isolation, local Undo/Redo, Apply, global Undo, Clone Stamp, rectangular selection, Object Cleanup execution, switching to Campaign Creative without applying, project saving, existing Convert & Compress and Watermark navigation, desktop layout and no mobile horizontal overflow.
- These automated browser checks used Chromium. Safari/Firefox and extreme memory workloads remain for the wider final QA.

## Scope / integration
- Only `smart-image-studio/index.html` changed among existing website files. All website pages are otherwise preserved.
- Separate review build. Do not replace the production master until all final integration stages and user approval.
- Background Removal remains hidden from the shipping navigation; none of the unstable background-removal work was reintroduced.
