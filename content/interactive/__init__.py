import re
from html import escape
from pathlib import Path
from textwrap import dedent

import frontmatter
import jinja2

HERE = Path(__file__).parent
# Built pages for this section, e.g. interactive/sketches/arcs/
OUT = Path("interactive")

env = jinja2.Environment(loader=jinja2.FileSystemLoader("./templates"))

GALLERY_STYLE = (
    "<style>\n"
    ".sketch-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }\n"
    ".sketch-card { margin: 0; }\n"
    ".sketch-frame { aspect-ratio: 1; background: #f4f4f5; }\n"
    ".sketch-frame iframe { display: block; width: 100%; height: 100%; border: 0; }\n"
    "</style>\n"
)


def build_embed(sketch, fm):
    """Write a bare copy of the sketch page (no site chrome) for the gallery to load in an iframe.

    It sits next to the full page, so the relative script and image paths still resolve.
    """
    holder = re.search(r'id="([\w-]+-holder)"', fm.content).group(1)
    embed = OUT / sketch.relative_to(HERE).parent / f"{sketch.stem}-embed.html"
    embed.parent.mkdir(parents=True, exist_ok=True)
    embed.write_text(
        env.get_template("sketch_embed.html").render(
            title=fm.get("title", sketch.stem),
            scripts=fm.get("scripts", []),
            holder=holder,
            root="../../../",
        )
    )
    return embed.relative_to(OUT)


def build():
    content = (
        "---\n"
        "title: interactive\n"
        "page: interactive\n"
        "---\n"
        "## interactive\n"
        "\n"
        "some art I made at uni using [p5.js](https://p5js.org/). they're all live: "
        "hover, click and type to play with them, or open one on its own page\n\n"
    )
    sketch_md_files = sorted(Path(HERE / 'sketches').rglob("*.md"), key=lambda p: p.stem)
    cards = []
    broken = []
    for sketch in sketch_md_files:
        with open(sketch, 'r') as f:
            fm = frontmatter.load(f)

        if not fm.get('published'):
            continue

        page = sketch.relative_to(HERE).with_suffix('.html')
        title = escape(fm.get('title', sketch.stem))
        # Sketches that don't run yet stay off the gallery; see TODO.md
        if fm.get('gallery') is False:
            broken.append(f"- [{sketch.stem}]({page})\n")
            continue

        embed = build_embed(sketch, fm)
        cards.append(
            f'<figure class="sketch-card" data-src="{embed}" data-title="{title}">'
            f'<div class="sketch-frame"></div>'
            f'<figcaption><a href="{page}">{title}</a></figcaption>'
            f'</figure>\n'
        )

    # One HTML block with no blank lines, so the markdown parser passes it through untouched
    content += GALLERY_STYLE + "\n"
    content += '<div class="sketch-gallery not-prose">\n' + "".join(cards) + "</div>\n"
    content += '<script src="../scripts/sketches/gallery.js"></script>\n\n'

    if broken:
        content += "a few that need fixing before they can go in the gallery:\n\n" + "".join(broken)

    content += dedent(
        """
        I also played around with kinect cameras, exploring how to read depth information from them and display it in fun ways.

        <iframe width="560" height="315" src="https://www.youtube.com/embed/WwX4lv0vOSY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <br>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/l7ivoH3AzZU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        """
    )

    with open(HERE / "index.md", "w+") as f:
        f.write(content)
