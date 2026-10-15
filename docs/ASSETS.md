# Footer artwork and dialogue

The footer combines an original, editable station drawing with official Shisa character artwork. Its visual direction came from the illustrated ending on [Elaine Yu's portfolio](https://www.elaineyu.design/). The scene uses this site's olive, cream, and terracotta palette.

## Artwork

| Asset | Source and editing |
| --- | --- |
| `public/images/footer/last-stop.svg` | Original 1000 × 390 station drawing made for this project. Edit its paths, sign, and stroke colors directly. It has a transparent background and no external dependencies. |
| `public/images/footer/shisa-official.png` | Unmodified PNG from the [official anime character page](https://www.anime-chiikawa.jp/chara.html), downloaded from its [character sprite image](https://www.anime-chiikawa.jp/images/characters/img_charapage.png). Dimensions: 3766 × 463 pixels; size: 209,921 bytes. |

Shisa artwork credit: **©ナガノ/ちいかわ製作委員会**. The footer retains this credit and links to the official character page.

The complete official sprite is stored unchanged. `.shisa-art` in `src/footer.css` displays the Shisa region at source coordinates `x: 2636, y: 0, width: 400, height: 355` using a clipped CSS window. The image is scaled to `941.5%` width and offset to `left: -659%`. Update the window and offsets together if the sprite changes.

The stored file's SHA-256 is:

```text
856b8b0e181c4a1c2a826816ed0b19eaad271fb580e76c5b21273885ec0ff07e
```

## Dialogue

The `shisaMessages` array in `src/footer.js` contains three short Japanese dialogue excerpts from Nagano's original Shisa comics. The first two entries come from [this original comic post](https://x.com/ngnchiikawa/status/1429862846934896649); the third comes from [this follow-up comic post](https://x.com/ngnchiikawa/status/1430926333165531138). The Japanese speech was checked against the original comic images.

Each entry preserves its provenance:

| Field | Meaning |
| --- | --- |
| `text` | Verified Japanese dialogue excerpt from the original comic |
| `translation` | English translation prepared for this portfolio |
| `source` | Complete URL of the original Nagano comic post |

Keep source links with the quotes and verify the original Japanese speech before adding a line. The bubble and its screen-reader announcement mark Japanese text with `lang="ja"` and the English translation with `lang="en"`.

Dialogue behavior and footer markup live in `src/footer.js`; sprite framing, speech-bubble styling, and theme colors live in `src/footer.css`.
