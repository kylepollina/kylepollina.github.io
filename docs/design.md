# Design spec

What the site should look and feel like, and the calls already made. Read this before changing how anything looks. How it's built is in [rendering.md](rendering.md); how to add photos is in [albums.md](albums.md).

## The idea

The whole site is one living, two-tone dithered surface, not a fun home page with static pages behind it. The dither is the identity: if a new page doesn't feel like it belongs to the home page, it isn't done.

## Principles

1. **Everything shares one surface.** Same paper, ink, dots and light band on every page.
2. **Dither is for looking; real text is for reading.** Headings are drawn in dots. Anything a person actually reads is solid HTML text.
3. **Nothing may trail the scroll.** A canvas fixed to the window repaints after the page moves. Whatever sits on it next to real content looks broken. This has decided more than any other rule, see [rendering.md](rendering.md#the-scroll-lag-rule).
4. **Color is the reward.** Photos rest in two tones and come alive when you reach for them.
5. **Movement means alive.** Wiggles and videos are still while dithered and move only in color. The change from still to moving is the effect.
6. **Still layouts, interesting shapes.** Variety comes from the shapes of the photos, not from tilting, scrolling sideways or moving them around.
7. **The same rule for every album.** Whatever we decide for one page applies to all of them.

## Look

| | Light | Dark |
|---|---|---|
| Ink | `#111` | `#d6d0c0` |
| Paper | `#ece8dc` | `#161513` |

The theme follows the system setting. These colors live in two places that must match: `site.css` and `THEMES` in `dither.js`.

- **Headings:** Fraunces 800, drawn in dots with a soft glow, and centered.
- **Reading text:** IBM Plex Mono, solid ink, 18px (16px on phones), in a centered column 36em wide. Text inside the column stays left-aligned.
- **Date lines:** IBM Plex Mono italic, 16px, solid.
- **Dots:** 2px on subpages, 3px on the home page, 1.5px and 2px on phones. Always a whole number of device pixels.

## Page anatomy

**Home:** the name fills the window, with a row of links directly under it. "about" is pinned to the right edge. The page doesn't scroll.

**Subpages:** a back link at the top left, then a centered heading over a centered column. With or without prose, every subpage is laid out this way.

**Photography page**, top to bottom:

1. The heading.
2. A favorites grid: random photos, random crop, and one of three layouts that fill the grid exactly. It's different on every load, and doesn't move once loaded.
3. Album previews, newest first. Each has a centered title, a date line, a short description, its photos, and "see the whole album →". Previews use `trio` (three squares) or `mosaic` (mixed sizes).

**Album pages:** a back link to photography, then the title, date and text, then every photo. The layout can suit the album: sections for stereogram, a lead video and pairs for kaleido.

## How photos behave

| Action | What happens |
|---|---|
| At rest | Two-tone dither, at the page's dot size |
| Hover | Color in 0.4s. After the mouse leaves: holds 2s, then fades back over 1.5s, so you can sweep across them and watch them settle |
| Click or tap | Stays in color until clicked again |
| Wiggle or video | Still while dithered, moves only in color. A video rewinds once the dither is back |
| Phone | Tap only. Nothing colors itself |

The cursor stays a normal arrow over photos.

## Interactions on the surface

- **Light band:** a diagonal band sweeps across the headings about every 9 seconds, with a slow ripple through the letters.
- **Mouse trail:** leaves a thicker, twinkling patch of dots that fades in about 3 seconds. It shows behind prose too, but the paper texture and heading glow don't.
- **Links:** go solid on hover. Links in prose are underlined.

## Tried and rejected

Don't bring these back without a new reason.

| Idea | Why it failed |
|---|---|
| Dithered body text | Unreadable, especially while scrolling |
| Real text with a dithered shadow under it | The shadow lagged the text on scroll. "Looks terrible" |
| Sideways-scrolling album strips | Kyle doesn't want these on any album |
| Tilted, scattered prints as a header | Disliked. A still grid with varied crops was what was wanted |
| A big feature photo in album previews | Disliked on both albums that had it |
| Hand cursor over photos | Removed right after adding it |
| Instant fade back to dither | Too quick to sweep across photos and enjoy them |
| Wiggles animating while dithered | Less alive than still-until-colored |
| Light band coloring photos on phones | "Looks pretty awful". Replaced by tap only |
| Headings on the fixed canvas on phones | Lagged badly when scrolling, see [rendering.md](rendering.md#the-scroll-lag-rule) |

## Decided, for now

- **Apps page:** hidden until it has content (steps in `TODO.md`).
- **Kaleido album:** leaves out Apple's aerials and wallpaper, since those images are Apple's and the site is public. It has no GitHub link while that repo is private.
- **Old pages:** `old-site/writing/` and `old-site/interactive/` are still online in the old style but aren't linked. Open question in `TODO.md`.

Open work lives in `TODO.md`, not here.
