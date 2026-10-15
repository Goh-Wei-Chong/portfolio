# Character artwork and messages

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

## Messages

The `shisaMessages` array in `src/footer.js` contains thirteen user-authored English messages for this portfolio. The official character image retains its separate artwork attribution above.

Each entry is a plain JavaScript string. Edit or reorder those strings directly and keep at least one entry. The speech bubble displays the message in English, and a separate polite live region announces the same text for screen readers.

Message behavior and footer markup live in `src/footer.js`; sprite framing, speech-bubble styling, and theme colors live in `src/footer.css`.

## Scroll cameos

The scroll peeks use existing character artwork. The files are stored locally with their original PNG bytes, without generation, image editing, or reencoding. Finn, Jake, and Bill use wiki-hosted artwork; these downloads are not represented as images obtained directly from the show's publisher.

| Asset | Source and dimensions |
| --- | --- |
| `public/images/cameos/finn.png` | Adventure Time Wiki's [Original Finn image record](https://adventuretime.fandom.com/wiki/File:Original_Finn.png), [original PNG](https://images.wikia.com/adventuretimewithfinnandjake/images/f/f3/Original_Finn.png?format=original). 1467 × 2385 pixels; 253,705 bytes. |
| `public/images/cameos/jake.png` | Adventure Time Wiki's [Jake image record](https://adventuretime.fandom.com/wiki/File:Jakesalad.png), [original PNG](https://images.wikia.com/adventuretimewithfinnandjake/images/3/3b/Jakesalad.png?format=original). 1700 × 2455 pixels; 254,097 bytes. |
| `public/images/cameos/bill-cipher.png` | Disney Wiki's [Bill image record](https://disney.fandom.com/wiki/File:Bill_cipher.png) and [character gallery](https://disney.fandom.com/wiki/Bill_Cipher/Gallery), [original PNG](https://images.wikia.com/disney/images/9/9b/Bill_cipher.png?format=original). 512 × 682 pixels; 78,448 bytes. This existing gallery artwork has a yellow glow; its publisher provenance is unspecified. |
| Chiikawa | Reuses the complete official sprite listed above; no second download. CSS displays source coordinates `x: 0, y: 0, width: 335, height: 362` using an image width of `1124.179104%`, left/top `0`, and a wrapper aspect ratio of `335 / 362`. |

Adventure Time characters: **© The Cartoon Network, Inc.** ([official show page](https://www.discoveryjapan.jp/cartoonnetwork/adventuretime/)). Bill Cipher / Gravity Falls: **© Disney**. Chiikawa: **©ナガノ/ちいかわ製作委員会** ([official character page](https://www.anime-chiikawa.jp/chara.html)). These characters remain the property of their respective rights holders.

Bill's transparent margins are clipped in CSS to source coordinates `x: 101, y: 21, width: 330, height: 506`; the PNG itself stays unchanged. Edit this framing in `src/cameos.css`. Cameo choices and placement live in `src/cameos.js`; see `EDITING.md` for configuration.
