# Footer artwork

The footer combines an original, editable station drawing with a newly generated character illustration. The visual direction came from the illustrated ending on [Elaine Yu’s portfolio](https://www.elaineyu.design/); no artwork or source code was copied from that site.

| Asset | Source and editing |
| --- | --- |
| `public/images/footer/last-stop.svg` | Original 1000 × 390 SVG, drawn for this project. Edit its paths, sign, and colors directly. It has a transparent background and no external dependencies. |
| `public/images/footer/shisa.webp` | New Shisa illustration created using the built-in image generation tool. Transparent 768 × 768 WebP, 76,770 bytes. Alpha is preserved; no photo metadata is included. |

Shisa is a character from Chiikawa. Appearance was checked against the [official character page](https://www.chiikawaofficial.com/characters/) and [official Shisa collection](https://chiikawamarket.jp/collections/shisa). The illustration is a new generated interpretation, not an official asset. The original generated PNG is kept outside the project; the website uses the WebP above.

## Generation prompt

Tool: built-in image generation, with `transparent_background: true`.

```text
Use case: illustration-story.
Asset type: transparent character illustration for an illustrated personal portfolio footer.
Primary request: Draw Shisa (シーサー) from Chiikawa, recognizable as the official small Okinawan guardian lion character, in a new original front-facing sitting pose. One character only, entire body visible, friendly and cheerful.
Subject details: very round warm ivory face and tiny ivory body, orange curled/fluted lion mane framing the face, small orange rounded ears and orange curled brow shapes, tiny dark expressive eyes, tiny smiling mouth, soft pink cheeks, short little paws and feet. Preserve Shisa's distinctive Chiikawa character design and childlike proportions; no shirt or other clothing.
Style/medium: delicate hand-drawn warm cream and muted orange outlines, soft flat colour fills, simple charming 2D storybook illustration. Clear compact silhouette with minimal detail, suitable for display at roughly 160px tall. Warm ivory and apricot orange with tiny dark facial details, gently textured linework but crisp edges. Designed to sit within a dark ink-blue and cream line-drawn train-station footer scene.
Composition/framing: a single centered sitting character on a square transparent canvas with a small even empty margin, front view, full ears/mane/paws visible, no cropping.
Scene/backdrop: genuinely transparent alpha background.
Constraints: no background, no ground, no floor, no shadows, no glow, no text, no lettering, no logo, no watermark, no border, no frame, no props, no other characters. Do not draw a generic realistic shisa statue; this is the cute cream-and-orange Shisa from Chiikawa. Do not render a checkerboard pattern; pixels around the character must be transparent.
```

The illustration was visually checked on an ink-blue background before integration. Replacing it only requires updating this file at the same path with a transparent image of the same proportions. Position and speech-bubble styling live in `src/footer.css`; messages live in `src/footer.js`.
