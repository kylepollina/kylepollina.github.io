# Rendering spec

How the dithered pages work, the constraints that shaped them, and how to test them. The look itself is in [design.md](design.md).

## Files

| File | Job |
|---|---|
| `site.css` | Shared styles, colors, prose and photo rules |
| `dither.js` | The page surface: headings, paper, band, trail |
| `photos.js` | Each `figure.photo`: dither, color, video |
| `index.html`, `about.html`, `photography.html`, `apps.html` | Hand-written pages in the root |
| `photography/*.html` | Album pages, loading `../site.css` and friends |

These pages are not built. `build_site.py` skips `content/index.md` and `content/about.md` (`HAND_WRITTEN`) so it can't overwrite them, so those two sources are dead. It still builds `writing/`, `interactive/` and `research/` in the old style.

## How text gets drawn

CSS lays the page out normally with `color: transparent`, so links, selection, search and screen readers keep working on real text. `dither.js` then:

1. Walks the text nodes and uses `Range.getClientRects()` to find where CSS put each word.
2. Draws the words into masks: `small` (thresholded, crisp), `core` (big text, soft) and `halo` (glow).
3. Each frame, works out a brightness for every pixel from paper, glow, band, ripple and trail, then compares it to an 8x8 Bayer matrix to pick ink or paper.

The canvas is low resolution and scaled up with `image-rendering: pixelated`. The dot size is rounded to whole device pixels. Text at least `BIG` (28) dither pixels tall is treated as a heading.

Set `data-cell` and `data-cell-phone` on `<canvas id="dither">` to change the dot size for a page.

## The scroll lag rule

**The most important constraint here.** `#dither` is fixed to the window and repaints after the page has moved, so anything drawn on it trails real content. On phones it's much worse, because they scroll ahead of the page's scripts entirely.

So:

- **Never draw under real text.** Prose is skipped by `dither.js`, and the paper behind it is only cleared of texture and glow (`clean` mask, fading over `CLEAR` pixels). Keep `.prose` boxes tight to their text, because the cleared patch matches the box. A full-width box clears a wide visible strip, which is why `.meta.prose` is `inline-block`.
- **Anything that scrolls and must look solid gets its own canvas inside its element.** Photos always do. On touch screens, headings and the back link do too: `LIFTED` in `dither.js`, built by `buildLayers()`. Those canvases are transparent except for their dots, so the paper shows through.
- **Pages that don't scroll can stay on the fixed canvas.** That's why the home page has no layers, and why desktop headings stay on it. Desktop lag is small, and only phones were a problem.

If a new element looks like it's sliding around while scrolling, this is the cause.

## Phone rules

- **Address bar:** it fires `resize` while scrolling. Only redo expensive work when `innerWidth` changes.
- **Reading layout:** bounding rects include any CSS transform. Measure with `offsetWidth`/`offsetHeight` when sizing a canvas.
- **Sideways overflow:** clamp layer canvases to the window, or the glow makes the whole page scroll sideways.
- **Touch detection:** use `matchMedia("(hover: none)")`.

## Photos

`photos.js` turns each `figure.photo` into a real photo with a canvas on top, dithered once, then shows or hides that canvas with CSS opacity.

```html
<figure class="photo"><img src="a.jpg" width="1600" height="1067" alt="…" loading="lazy"></figure>
```

- **Size:** the figure needs one, from an aspect-ratio, a grid cell, or the img's `width` and `height` with `height: auto`.
- **Crop:** the photo fills the figure from the center. `data-crop="x y zoom"` moves and zooms it, with x and y from 0 to 1.
- **Wiggles:** use an animated WebP in the img. It's dithered as a still, and moves only once it's visible in color.
- **Videos:** put the first frame in the img, then a video after it:

  ```html
  <figure class="photo"><img src="poster.jpg" alt="…" loading="lazy"><video src="a.mp4" muted loop playsinline preload="none"></video></figure>
  ```

  It plays while in color and on screen, and rewinds on `transitionend` once the dither is back.
- **Other sites' images:** these need CORS and `crossorigin="anonymous"`. Without them the canvas can't read the pixels, so the real photo just shows.

Browsers may stop animating an image hidden under a canvas. We tried dithering every frame from sprite sheets to work around that, then dropped it when still-until-colored turned out to look better. The frame sheets aren't needed.

## Numbers kept in two places

- Colors: `site.css` and `THEMES` in `dither.js`.
- The Bayer matrix: `dither.js` and `photos.js`.

## Testing

Preview with `npm run serve` (http://localhost:8500, caching off). Kyle uses Firefox, and `file://` breaks things.

The built-in browser pane has quirks that look like bugs but aren't:

| What you see | Why |
|---|---|
| Blocky canvas or a size of 0 | The pane was hidden on load. Set a viewport size, then dispatch `resize` |
| Fades don't run, hover does nothing | The pane doesn't play CSS transitions and synthetic hover doesn't apply. Set `transition: none` or add `.open` to check the end state |
| Animations look frozen | Animated images barely advance there. Check on a real browser |
| Solid blocks where photos should be | Lazy images load slowly there. Wait longer |
| Phone behavior missing | Emulation is per tab and `hover: none` is read on load. Set the mobile preset first, then reload |
| A video won't play in a test | It has to be on screen, because `photos.js` won't play it otherwise. Scroll to it and wait |

**What the pane can't tell you:** scroll smoothness, real fades, and iOS video behavior. Check those on a real phone, and say so when reporting back. The two biggest phone problems here (shimmer, heading lag) only showed up on a real device.

## Publishing

- GitHub Pages serves `master` with Jekyll. Keep non-site files out using `exclude` in `_config.yml`.
- Finished work goes straight to `master`. Experiments go on a local branch and are committed only when Kyle asks.
- Browsers keep files for about 10 minutes after a deploy, so a change can look missing on a phone. Try a private tab first.
- After pushing, check the Pages run with `gh run list`, then fetch the live URL.
