# TODO

Tracker for reviving the site. Not published (excluded in `_config.yml`).

## Big projects

- [ ] **Move writing to Bear Blog.** Link to your existing Bear Blog sites from here, and migrate the old posts. 8 posts in `content/writing/`, all now listed; `wikipedia-catches-up` is just a title with no body
- [ ] **Refresh the p5.js art.** Build a new way to show sketches that can't break the main site, e.g. each sketch isolated in its own iframe/page with a gallery of preview thumbnails
- [ ] **Add a 3D wigglegrams page** to show off that project
- [ ] Rework the site into a more complete portfolio

## Pages

- [ ] Review the research pages
- [x] About: remove Miglia.co, change location to Chicago
- [ ] About: check the Instagram link and `kylepollina@pm.me` are still current
- [ ] Home page sketch is a fixed 495px wide and causes horizontal scrolling on phones; size it to its container

## Interactive sketches

- [x] Unhide all sketches: all 38 are now listed on the interactive page, alphabetically
- [x] Check each sketch runs (headless Chrome, Oct 2026): 31 of 38 render without errors
- [ ] Fix the 7 that don't:
  - [ ] `nike_vhs`: loads `nike_classic.png` and `swoosh.png`, which were never committed
  - [ ] `sun`, `prisma`: load a `gradient.png` that was never committed
  - [ ] `opentype_test`: needs the opentype.js library and a Futura font file, neither in the repo
  - [ ] `spirohex`: draws, but calls `mixedPaletteSizeN()`, which no longer exists in p5-utilities
  - [ ] `stripes`: draws, but `p5-utilities/stripes.js` calls a missing `graphicMask()`
  - [ ] `perlin`: draws, but calls `outerGrid.innerGrid()`, which no longer exists in `grid.js`
- [ ] Give sketches real names on the interactive page (it lists folder names like `color_palletes`, `zigzag2`)
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
- [ ] Local `env/` still has old Pelican packages and Python 3.10; recreate it when convenient

## Cleanup

- [x] Deleted the duplicate root `biology-logs/arlington-heights/` pages
- [x] Removed the never-committed survey videos and `climate.csv` link (the fall survey's map now links to eBird)
- [x] DBC checklist: Snow Bunting was missing its eBird link (it showed up as `nan`); filled it in
- [x] Moved the orphan pages into `content/` (wikipedia-catches-up, earthscience, biology-logs index)
- [x] Deleted the unused Pitch Test fonts, `Icon\r`, root `__init__.py`, `styles.css`, `.writing/` draft
- [x] `.vscode/` is now gitignored; `.gitignore` tidied
- [ ] `ideas/` has three 2022 screenshots committed to the public repo; move them out if they're private notes
- [ ] Delete the untracked `old-site-crap/` once you're sure nothing in it is needed
- [ ] `research/earthscience/index.html` duplicates the earthscience section of the research index; keep one
