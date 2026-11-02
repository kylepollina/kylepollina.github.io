# kylepollina.github.io

Personal site, served by GitHub Pages from `master`. The home, about and photography pages are hand-written, with specs in [`docs/`](docs/). The older sections live in [`old-site/`](old-site/): written in Markdown under `old-site/content/` and built into HTML committed alongside them.

## Preview

Preview with a local server so relative links behave like they do on GitHub Pages. Opening the files directly (`file://`) breaks the image sketches: browsers block reading pixels of images from disk.

```sh
npm run serve                         # serve.py on http://localhost:8500, with browser caching off
```

## Layout

- `index.html`, `about.html`, `photography.html`, `apps.html`, `photography/` — hand-written pages, drawn by `dither.js` and `photos.js` with `site.css`
- `fonts/`, `favicon.png` — shared with the old site
- `docs/` — specs for the look, the rendering and adding albums
- `scripts/favorites.sh` — copies favorite photos into `photography/favorites/` for the photography page
- `old-site/` — the older sections, kept online but not linked from the new pages

## Old site

These commands run from inside `old-site/`, which is where its paths are relative to.

```sh
git submodule update --init          # scripts/p5-utilities
python3 -m venv env
env/bin/pip install -r requirements.txt
npm install                          # Tailwind, only needed for CSS changes
```

```sh
env/bin/python build_site.py           # build once
env/bin/python build_site.py --watch   # rebuild on changes to content/ or templates/
npm run build:css                      # regenerate index.css (after adding new Tailwind classes)
```

- `content/` — Markdown sources. Frontmatter sets `page` (nav section), `title`, `scripts`, `date`, `published`
- `content/*/__init__.py` — builders that regenerate a section's `index.md` (writing, interactive)
- The interactive gallery shows a still (`<sketch>-thumb.webp`) per sketch, linking to its live page; make them with `scripts/make_thumbs.sh <names>`. A sketch with no thumb is linked in a text list instead. The builder also writes a bare `<sketch>-embed.html` next to each page
- `templates/` — Jinja templates
- `interactive/`, `writing/`, `research/` — built HTML plus static assets
- `scripts/` — p5.js, shared sketch helpers, and the `p5-utilities` submodule
- `biology-logs/dbc-checklist/` — bird checklist, built separately by `generate_checklist.py` (needs pandas)

After building, commit the generated HTML along with the source changes.
