# kylepollina.github.io

Personal site, served by GitHub Pages from `master`. Pages are written in Markdown under `content/` and built into HTML committed alongside them.

## Setup

```sh
git submodule update --init          # scripts/p5-utilities
python3 -m venv env
env/bin/pip install -r requirements.txt
npm install                          # Tailwind, only needed for CSS changes
```

## Build

```sh
env/bin/python build_site.py           # build once
env/bin/python build_site.py --watch   # rebuild on changes to content/ or templates/
npm run build:css                      # regenerate index.css (after adding new Tailwind classes)
```

Preview with a local server so relative links behave like they do on GitHub Pages. Opening the files directly (`file://`) breaks the image sketches: browsers block reading pixels of images from disk.

```sh
npm run serve                         # serve.py on http://localhost:8500, with browser caching off
```

## Layout

- `content/` — Markdown sources. Frontmatter sets `page` (nav section), `title`, `scripts`, `date`, `published`
- `content/*/__init__.py` — builders that regenerate a section's `index.md` (writing, interactive)
- The interactive builder also writes a bare `<sketch>-embed.html` next to each sketch page; the gallery loads those in iframes. Frontmatter `gallery: false` keeps a sketch out of it
- `templates/` — Jinja templates
- `interactive/`, `writing/`, `research/` — built HTML plus static assets
- `scripts/` — p5.js, shared sketch helpers, and the `p5-utilities` submodule
- `biology-logs/dbc-checklist/` — bird checklist, built separately by `generate_checklist.py` (needs pandas)

After building, commit the generated HTML along with the source changes.
