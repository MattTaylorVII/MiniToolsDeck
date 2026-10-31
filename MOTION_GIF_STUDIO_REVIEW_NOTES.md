# MiniToolsDeck · Motion & GIF Studio · Review Build

This review integrates Motion & GIF Studio into the latest approved Vector Trace 15C.2 build. The website's Master File and live deployment have not been modified.

## New features
- Multi-image drag-and-drop frame import, direct dropping on animation preview, or using existing edited images and the Studio queue.
- 24-frame timeline, reordering by dragging or up/down buttons, per-frame duration (100–4,000 ms), duplication, deletion and editable captions.
- On-canvas animation playback, scrubbing, cut/crossfade transitions, subtle Ken Burns motion, looping and preset output sizes.
- Local animated GIF and animated WebP encoding, including true multiframe files, without a paid API or online rendering service.
- Local Save/Open Motion Project with `.mtdmotion` timeline data and image frames. The existing `.mtdstudio` format continues to hold still-image editor sessions only.
- Context-sensitive workspace Add Frame button, preserving all previous Studio tools unchanged.

## Testing conducted
- Browser (Chromium): import three frames, playback, export crossfade animation, decode 32-frame GIF and WebP, canvas sizes, no JavaScript page errors.
- Browser: Add Current Image / Add Image Queue (2 source images), source pixels unchanged after switching tools and exporting.
- Browser: Save, clear, and reopen a motion project; invalid-project rejection preserves loaded timeline.
- Browser: portrait, landscape, and square layout; 390px mobile layout without horizontal overflow.
- Offline decoder: Pillow opened GIF and animated WebP outputs; frame count, frame sizes and delays verified.
- All embedded JavaScript checked with Node.js and website ZIP integrity checked with Python zipfile.

## Honest limitations
- GIF is limited to 256 colours and local preview uses browser rendering. Output can be larger for photos or long animations.
- Animated WebP requires browser support for encoding WebP frames. When unavailable, use GIF.
- Maximum 24 frames, maximum 30-second timeline, and animation-frame source images downsampled to at most ~1 MP for memory safety. This does not affect original Studio image pixels.
- Motion project `.mtdmotion` is separate from the existing `.mtdstudio` still-image session.
- Safari and Firefox tests, large-photo performance stress, and accessibility review remain for final QA.
- The Background Removal tool remains excluded from the shipping UI, as agreed.
