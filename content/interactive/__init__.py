
from pathlib import Path
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
    for sketch in sketch_md_files:
        sketch_name = str(sketch).split('/')[-1].replace('.md', '')
        content += f"- [{sketch_name}]({sketch.relative_to(HERE).with_suffix('.html')})\n"

    with open(HERE / "index.md", "w+") as f:
        f.write(content)
