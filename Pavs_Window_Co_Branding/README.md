# Pav’s Window Co. – Vector Branding Package

All artwork was rebuilt as true vector paths from your approved PNG (nothing is an embedded raster).
Text is converted to outlines, so no fonts are needed to open any file.

## Folder contents

| Folder | Files | Use |
|---|---|---|
| `01_Premium_Vector/` | `Pavs_Window_Co_Premium` `.svg` `.pdf` `.png` (4000 px) | Web, large print, signage proofs, presentations |
| `02_Simplified_Decal_Sign_Uniform/` | `Pavs_Window_Co_Simplified` `.svg` `.pdf` `.png` | Vehicle decals, signs, uniforms, screen print |
| `03_Embroidery_Artwork/` | `Pavs_Window_Co_Embroidery_NoSlogan` `.svg` `.pdf` `.png` (3000 px) + `_1050px.png` (3.5 in @ 300 dpi) | Artwork to hand to a digitizer (no slogan) |
| `04_Social_Media/` | `Pavs_Window_Co_Social_Square` (forest-green background) and `_Transparent` – `.svg` `.pdf` `.png` (1024 px) + `_400px.png` | Profile pictures / avatars |
| `QC/` | Side-by-side comparisons, size tests, embroidery thin-feature map | Evidence for the checks below |
| `QC_Report_automated.txt` | Machine checks of every file | |

PNGs are transparent except the solid-background social PNGs. PDFs are single-page vector (page sizes: 12 in wide for Premium/Simplified, 3.5 in for Embroidery, 4 in square for Social).

## Colours

* Premium: gradients only (silver, forest green, black, plus the blue water drops and sky-blue window panes from the original).
* Simplified / Embroidery / Social: **Forest green `#1B7A3A`**, **Silver-gray `#C3C6C9`**, **Black `#000000`** – nothing else. (Social adds a `#0E4A29` background in the solid version only.)
  These are flat approximations I chose to match the overall tone of the original; swap in your Pantone/thread numbers when ordering.

## What was kept, rebuilt or approximated

**Premium** – same layout and elements as the reference: three-ribbon swoosh, roofline with chimney, gable window, squeegee with rivets/handle hole/water drops, PAV’S, WINDOW CO., slogan, side bars, black outer plate.
* PAV’S letters, roof, squeegee, window, bars and drops were drawn as clean geometric paths measured from your image. The swoosh ribbons and black outer plate were fitted to your image and smoothed.
* WINDOW CO. and the slogan are outlined letterforms (Montserrat-style, OFL-licensed, stretched about 14% wider and fitted letter by letter to your artwork). They match the original closely but are not a pixel trace – tiny differences in individual letter shapes are possible.
* The metallic look uses vector gradients plus a bright/dark rim to imitate the bevel. **Not reproduced:** the fine brushed-metal grain, soft drop-shadows/glows, the photographic cloud-and-forest scene in the window (replaced by a simple sky-and-pine illustration) and the pitted texture on the siding (replaced by simple siding lines). These are raster-style effects that would not survive vinyl, embroidery or reliable PDF output.

**Simplified** – removed: all gradients, bevels, glows, rivets, siding lines, window picture, tiny inner ribbon (smallest swoosh ribbon), drop highlights. Windows become four flat silver panes; drops become flat silver; slogan letters were thickened ~1.6 px (at 1774 px width) so they cut/print cleanly. A 3.5 px black keyline separates touching colours. Why: flat colour, fewer nodes (about 215 vs about 600) and no effects make it cuttable, printable and scalable.

**Embroidery (no slogan)** – exactly three flat colours, no strokes or effects. Changes beyond “Simplified”: slogan removed; two smallest swoosh ribbons and the smallest water drop removed; rivets/handle details removed; roof inner line thickened to about 1.2 mm and the squeegee rubber strip to about 1.2 mm at 3.5 in wide; window panes separated by about 1 mm gaps; chimney made a solid block with a small hole; the green wedge above PAV’S and the side bars were shortened so no thin spear tips remain; ribbon tips thinner than about 0.6 mm were trimmed; the black plate hugs the artwork instead of reproducing the slogan plate. Black is the third thread/colour (omit it on black garments).
This is **artwork for digitizing, not a stitch file** – the digitizer chooses stitch types, underlay, density and pull compensation.

**Social** – full logo, no slogan, no tiny drop or side bars, thicker black keylines, centred in a 1024 px square at 94 % width so it survives circular cropping. Reads as PAV’S + roof + squeegee at 64 px; the WINDOW CO. line becomes a texture below about 64–96 px, so use the avatar at 96 px or larger for that line to be legible.

## Quality-control results (what was actually checked)

* Every SVG was rendered in Chromium and inspected visually against your PNG, at full size and zoomed regions (swoosh, house/window, squeegee/drops, PAV’S, WINDOW CO./slogan). Side-by-side sheets are in `QC/`.
* Spelling/typography checked in zoomed renders: **PAV’S**, **WINDOW CO.**, **CLEARER VIEWS. BRIGHTER DAYS.** – correct in the premium and simplified files.
* SVG checks (see `QC_Report_automated.txt`): well-formed XML; no `<image>`, no data URIs, no live `<text>`, no external references, no filters/masks; embroidery/simplified use exactly the three colours above.
* Transparency: all non-social PNG corners have alpha = 0 and each PDF renders with alpha 0 at the corners; the logo is one connected opaque shape (no stray specks).
* PDFs: 0 raster images and 0 fonts in each.
* Embroidery size test at 3.5 in wide (300 dpi): remaining areas thinner than 1 mm are limited to sharp corners and the few tapered ends; a thin-feature map is in `QC/05_...png`.

## Known limits / please review

* This is a close recreation, not an identical copy – the premium file is flatter than the original’s textured chrome. If you want more texture/contrast, that can be added as extra vector layers.
* I have **not** tested these files in a vinyl cutter/RIP, a print shop proofing system or embroidery digitizing software, so I am not calling them “print-ready” or “production-ready”. They passed the checks above; please get a proof (and, for embroidery, a digitizer’s sew-out) before bulk orders.
* For vinyl decals the black plate is part of the design; if you want a cut-out version without it, ask for a “no plate” variant.
* Some small stylised details differ from the original: simplified window scene, water-drop highlights, and the exact outline of the black plate.
