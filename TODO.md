# TODO

Tracker for reviving the site. Not published (excluded in `_config.yml`).

The old site moved into `old-site/` (Nov 2026). Paths below to `content/`, `templates/`, `writing/`, `interactive/`, `research/`, `biology-logs/`, `build_site.py`, the sketch scripts and `make_thumbs.sh` are inside that folder.

## Big projects

- [ ] **Move writing to Bear Blog.** Link to your existing Bear Blog sites from here, and migrate the old posts. 8 posts in `content/writing/`, all now listed; `wikipedia-catches-up` is just a title with no body
- [x] **Refresh the p5.js art.** The interactive page is a gallery of still images (`*-thumb.webp`, made by `scripts/make_thumbs.sh`) linking to each live sketch; it was too slow with every sketch running in an iframe
- [ ] **Add a 3D wigglegrams page** to show off that project (started on the `dither` branch: `photography/stereogram.html`)
- [ ] **Favorites from Photos as a build step.** `scripts/favorites.sh` fills the random prints on the photography page from `~/Desktop/favorites`; make it export the hearted photos straight from Photos instead (AppleScript `media items whose favorite is true` works but timed out for 172 photos, so export in batches or use `osxphotos`). 172 favorites come to ~51MB in the repo
- [ ] **AI-driven interactive environmental science.** Move on from the Jupyter notebooks (linked from research via nbviewer, source in `kylepollina/earthscience`) to something interactive that can live on this site. Options to look at:
  - [ ] marimo: reactive Python notebooks stored as plain `.py` files; can export to WASM/HTML that runs in the browser with no server (works on GitHub Pages); built-in AI assistant
  - [ ] Quarto: publishes notebooks as polished pages; interactivity via Observable JS or Pyodide
  - [ ] Observable Framework: static data apps/dashboards in JS; data loaders can be written in Python
  - [ ] JupyterLite: full Jupyter running in the browser via Pyodide, static hosting
  - [ ] Geospatial tooling to pair with any of these: leafmap / geemap (Google Earth Engine)
  - [ ] Decide where AI fits: an assistant while authoring (marimo AI, Jupyter AI, Claude Code) vs. in the published page itself (natural-language queries over the data)
- [ ] Rework the site into a more complete portfolio

## Dithered site follow-ups

Specs are in `docs/`.

- [ ] Check on a real phone: headings scrolling without lag, tap to color, and videos playing on iOS. Small album titles like "kaleido" look a little muddy on phones; make them bigger or crisper if that bothers you
- [ ] Replace drafted text with your own: the stereogram descriptions (the build story was inferred from the photos)
- [ ] Faster photo loading: photos stay solid blocks until loaded, and small grid spots download the full 1600px file. Try smaller versions and a paper-colored placeholder
- [ ] Link previews: pages have no description or preview image, so shared links look bare. A dithered preview image would suit the site
- [ ] Accessibility: photos can't be colored from the keyboard, and the favorites grid has no alt text
- [ ] Repo size: `photography/` is about 81MB, 51MB of it favorites, and git keeps every version. Decide whether all 172 favorites belong in the repo, or use smaller copies or host them elsewhere, before running `scripts/favorites.sh` often
- [ ] Bring the sketches into the new style; they could look great dithered (goes with deciding what happens to `writing/` and `interactive/`)
- [ ] Kaleido album: add download and GitHub links once they're public
- [ ] Code cleanup: the Bayer matrix is duplicated in `dither.js` and `photos.js`; `photography.html` has unused layout rules (`.mosaic .tall`, `.small`); the Tailwind and template setup only serves the old pages
- [ ] Delete the merged local `dither` branch
- [ ] Decide whether the stereogram album finishes the "3D wigglegrams page" item above

## Pages

- [x] `build_site.py` skips `content/index.md` and `content/about.md` (`HAND_WRITTEN`), so it can't overwrite the new hand-written `index.html` and `about.html`. Edit those two pages directly; the old sources are no longer used
- [ ] `writing/` and `interactive/` are still published but no longer linked from the new home page, and keep the old look. Hide them, or link them and restyle
- [ ] Apps page hidden (Nov 2026) until it has something on it. To bring it back: add `<a href="apps.html">apps</a>` to the nav in `index.html`, and remove the `apps.html` line from `exclude` in `_config.yml`
- [x] Earthscience section hidden from the research index (Oct 2026). To bring it back: remove the `<!-- EARTHSCIENCE-HIDDEN ... -->` wrapper around it in `content/research/index.md` and rebuild. The standalone `earthscience/` page was deleted; recover it with `git show HEAD:content/research/earthscience/index.md` if wanted
- [x] Research section hidden (Oct 2026): out of the nav (`HIDDEN_PAGES` in `build_site.py`) and unpublished (`research/` and `biology-logs/` in `_config.yml` `exclude`); content and built pages are kept. To bring it back: remove "research" from `HIDDEN_PAGES`, remove the `old-site/research/` and `old-site/biology-logs/` lines from `exclude`, rebuild
- [ ] Review the research pages
- [x] About: remove Miglia.co, change location to Chicago
- [ ] About: check the Instagram link is still current
- [ ] Old pages (`templates/nav.html`, built into `writing/`, `interactive/`, `research/`, `biology-logs/`) still link `kylepollina@pm.me`; the about page now says `kylepollina [at] gmail`
- [x] Home page now loads a random sketch in an iframe (weighted list in `content/index.md`, cubies most often); the iframe is `max-width:100%`, so check it on a phone

## Interactive sketches

- [x] Unhide all sketches: all 38 are now listed on the interactive page, alphabetically
- [x] Check each sketch runs (headless Chrome, Oct 2026): 31 of 38 render without errors
- Image sketches (breathing, gogh, lisa, lotus, towers, starry) can't run from `file://`: browsers won't let a page read pixels of images opened from disk. Preview with `npm run serve`
- Removed (Oct 2026) as not good enough: spirohex, brush, wall, nike_vhs, opentype_test, prisma, sun
  - [ ] `stripes`: draws, but `p5-utilities/stripes.js` calls a missing `graphicMask()` (hidden for now anyway)
  - [x] `perlin`: replaced the unfinished draw loop (and the missing `innerGrid()`) with the commented-out noise flow field
  - [x] `shapes`: clicks never completed a shape (constructor pre-filled every corner); fixed, with a hint and a live outline
  - [x] `lisa` ("so chic"): popped "Cannot split further" alerts. p5 1.x made `angleBetween()` signed, so right angles weren't detected; now compares `Math.abs()`. Tiny triangles that missed every pixel now take their center pixel's color
- [x] Give sketches real names on the interactive page: gallery uses frontmatter `title`; fixed the copy-paste ones (cubies was "so chic", spiro was "zig")
- Hidden from the interactive page (`published: false`, pages still built): color_palettes, fences, shapes, slices, smile, stripes, zigzag, zigzag2
- [ ] p5 1.4.1 is pinned; the newer p5 2.x has breaking changes, so upgrade deliberately or not at all
- [ ] Sketch JS is served out of `content/`; move it next to the built pages, or into `scripts/sketches/`. That would also let `content/` be excluded from the Jekyll pass
- [ ] `interactive/` holds ~8MB of PNG/JPG previews (some 500–750KB); compress them or convert to WebP
- [ ] `scripts/p5-utilities` is a submodule; consider vendoring the few files actually used. `scripts/sketches/compat.js` covers `randomPalette1000()`, which it no longer has

## Site build

- [x] Page titles (`<title>` was empty on every page)
- [x] Mobile viewport meta tag
- [x] README covering setup, build and preview
- [x] Tailwind build scripted (`npm run build:css`, pinned to tailwindcss 3.1.2)
- [x] `build_site.py` builds once; `--watch` to keep rebuilding
- [x] `requirements.txt`: PyYAML 5.1 → 6.0.2 (5.1 won't install on Python 3.12+); local `env/` updated
- [x] highlight.js 10.5 → 11.9 (used by the static-blog post)
- [x] Post dates normalized to `YYYY-MM-DD`
- [x] Build-only files excluded from the Jekyll pass in `_config.yml`
- [ ] Consider a GitHub Action that runs the build and a link check on push, so the site can't silently break again
- [x] Local `env/` recreated on Python 3.14 from `requirements.txt` (Pelican gone)
- [x] Month-only post dates (`date: Oct 2022`) render as "Oct 2022" instead of borrowing the build day (`format_date` in `build_site.py`)

## Cleanup

- [x] Deleted the duplicate root `biology-logs/arlington-heights/` pages
- [x] Removed the never-committed survey videos and `climate.csv` link (the fall survey's map now links to eBird)
- [x] DBC checklist: Snow Bunting was missing its eBird link (it showed up as `nan`); filled it in
- [x] Moved the orphan pages into `content/` (wikipedia-catches-up, earthscience, biology-logs index)
- [x] Deleted the unused Pitch Test fonts, `Icon\r`, root `__init__.py`, `styles.css`, `.writing/` draft
- [x] `.vscode/` is now gitignored; `.gitignore` tidied
- [x] `ideas/` is gone from the repo
- [x] The untracked `old-site-crap/` is gone
- [ ] `research/earthscience/index.html` duplicates the earthscience section of the research index; keep one
