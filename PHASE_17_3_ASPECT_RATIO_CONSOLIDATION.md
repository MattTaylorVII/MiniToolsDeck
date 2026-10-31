# Phase 17.3 — Smart Image Resizer Consolidation

- Integrated the standalone **Image Aspect Ratio Calculator** into **Smart Image Studio → Crop & Resize**, in a collapsible, always-available calculator.
- Preserved manual original and target dimensions, ratio locking, six aspect-ratio shortcuts, 10 platform sizing presets, sizing-strategy explanations, scale/pixel estimates, copy operations, and dimension transfer to the real Crop & Resize editor.
- Supports calculations without uploading an image; an uploaded source can be used with one click.
- Removed the duplicate **Smart Image Resizer** route/page after verifying that Crop & Resize and batch processing already include its resize/format capabilities.
- The 24-tool homepage listing, sitemap, and internal tool links are updated.
- Existing Resizer and Aspect Ratio Calculator URLs now redirect permanently to `/smart-image-studio/?tool=resize&aspect=1` on Vercel.
- Preserved privacy banners, shared homepage footer, site-wide styling, Studio queue, project save/reopen and image editor tools.
- This is a review build only; master website is unchanged.
