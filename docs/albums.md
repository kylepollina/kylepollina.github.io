# Adding an album

The recipe for getting photos onto the site. Commands run from the repo root and need ImageMagick (`magick`), `ffmpeg` and `exiftool`.

## Checklist

1. Ask for the order. Stereogram used date added, but date added means nothing for a folder dropped in all at once, so use date taken there. Check with `mdls -raw -name kMDItemDateAdded FILE` and `exiftool -DateTimeOriginal FILE`.
2. Look at the photos first. A contact sheet is quickest:
   ```bash
   magick montage SRC/*.jpg -auto-orient -thumbnail 300x300 -geometry +4+4 -tile 5x /tmp/sheet.jpg
   ```
3. Process the media into `photography/NAME/`.
4. **Confirm no location data is left** (below).
5. Write `photography/NAME.html`.
6. Add a preview to `photography.html`, newest album first.
7. Check on desktop and phone, in light and dark.

## Privacy: strip location first

**The repo and site are public, and most of Kyle's photos have GPS in them** (168 of the 172 favorites did). Never copy originals in. Always re-encode with `-strip`, then confirm this prints 0:

```bash
exiftool -q -q -if '$GPSPosition' -p '$FileName' photography/NAME | wc -l
```

Also ask yourself whose images these are. Don't publish images owned by someone else without checking with Kyle, and check that a repo is public before linking to it (`gh repo view OWNER/NAME --json visibility`).

## Processing

**Photos:** 1600px on the long side.

```bash
magick IN.jpg -auto-orient -resize '1600x1600>' -strip -quality 82 photography/NAME/out.jpg
```

**Wiggle GIFs:** convert to animated WebP. A 2.8MB GIF became about 120KB.

```bash
magick IN.gif -coalesce -resize 600x -strip -quality 80 -define webp:method=6 -loop 0 photography/NAME/out-wiggle.webp
```

**Wiggle videos:** this `ffmpeg` has no WebP encoder, so go through frames. Adjust size and quality to land around 2MB.

```bash
ffmpeg -i IN.mov -vf "fps=12,scale=600:-1:flags=lanczos" /tmp/frames/f%03d.png
magick -delay 8 /tmp/frames/f*.png -resize 500x -loop 0 -quality 62 -define webp:method=6 photography/NAME/wiggle.webp
```

**Videos:** H.264 `.mp4` plays everywhere, so one version is enough. Save the first frame as a poster:

```bash
ffmpeg -i IN.mp4 -frames:v 1 photography/NAME/poster.jpg
```

Use lowercase file names, since the live server is case-sensitive.

## Album page

Copy the closest existing page. Paths are relative to `photography/`.

| Page | Layout | Good for |
|---|---|---|
| `stereogram.html` | Titled sections | A project with a story |
| `kaleido.html` | Lead video, pairs, captioned features | An app or before-and-after |

Give every img its real `width` and `height` so the shape is known before it loads, and write real alt text. Find a size with `magick identify -format '%wx%h\n' FILE`.

Use the owner's words where they exist. Kaleido's text came from its landing page. If you have to draft text, say so clearly so Kyle can replace it.

The date line goes in `<p class="meta prose">`, and reading text in `<div class="prose">`.

## Preview on the photography page

Pick `trio` (three squares) or `mosaic` (mixed sizes), and copy an existing section:

```html
<section class="album trio">
  <header>
    <h2><a href="photography/NAME.html">name</a></h2>
    <p class="meta prose">october 2026</p>
  </header>
  <div class="prose">
    <p>A line or two.</p>
  </div>
  <div class="three">
    <figure class="photo"><img src="photography/NAME/a.jpg" alt="…" loading="lazy"></figure>
    <figure class="photo"><img src="photography/NAME/b.jpg" alt="…" loading="lazy"></figure>
    <figure class="photo"><img src="photography/NAME/c.jpg" alt="…" loading="lazy"></figure>
  </div>
  <p class="prose open-album"><a href="photography/NAME.html">see the whole album →</a></p>
</section>
```

No sideways scrollers and no big feature photo, see [design.md](design.md#tried-and-rejected).

## Favorites grid

```bash
python3 scripts/favorites.py    # from the hearted photos in Apple Photos
```

This asks Photos for the hearted photos, adds new ones (shrunk and stripped), removes un-hearted ones, and writes `list.js`, which the page picks from. Photos already on the site aren't touched. Any that look the same as another are skipped and remembered in `scripts/favorites_skipped.txt`, so re-exports and near-identical burst shots can't both land on the wall. It stops with an error if any location data remains.

It's run by hand, not on every push. Asking Photos for the list took anywhere from 49 seconds to over 5 minutes, too slow to hold up a push. `.githooks/pre-push` would run it automatically (`git config core.hooksPath .githooks`), but it's off until the listing is faster, see `TODO.md`.

## Keep an eye on repo size

Git keeps every version of every file forever. Favorites are about 65MB of `photography/`. `favorites.py` only adds new photos, so running it costs little, but every photo ever added stays in the history. Keep album media small.

| Media | Typical size |
|---|---|
| Photo | 200–550KB |
| Wiggle | About 120KB |
| Video | 2–5MB, downloaded only when played |
