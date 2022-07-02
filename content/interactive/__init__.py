
from pathlib import Path
from textwrap import dedent
HERE = Path(__file__).parent


def build():
    content = dedent(
        """
        ---
        title: interactive
        page: interactive
        ---
        """
    )
    sketches = Path()
    with open(HERE / 'index.md', 'w+') as f:
        f.write(content)
