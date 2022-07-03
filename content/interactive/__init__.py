
from pathlib import Path
import frontmatter

HERE = Path(__file__).parent


def build():
    content = (
        "---\n"
        "title: interactive\n"
        "page: interactive\n"
        "---\n"
        "## interactive\n"
    )
    sketch_md_files = list(Path(HERE / 'sketches').rglob("*.md"))
    # content += "<ul>"
    for sketch in sketch_md_files:
        with open(sketch, 'r') as f:
            fm = frontmatter.load(f)

        if not fm.get('published'):
            continue

        sketch_name = str(sketch).split('/')[-1].replace('.md', '')
        content += f"- [{sketch_name}]({sketch.relative_to(HERE).with_suffix('.html')})\n"
        # content += f"<div class='my-3'><a href='{sketch.relative_to(HERE).with_suffix('.html')}'>{sketch_name}\n<img class='my-1' src='{str(sketch.relative_to(HERE)).replace(sketch_name + '.md', 'link-' + sketch_name + '.png')}'/></a></div>"

    with open(HERE / "index.md", "w+") as f:
        f.write(content)
