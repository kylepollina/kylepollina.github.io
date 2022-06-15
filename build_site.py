

from typing import List

import mistune
from pathlib import Path
from mistune.plugins import (
    plugin_strikethrough,
    plugin_footnotes,
    plugin_table,
    plugin_url
)

import frontmatter
import jinja2
import os


templates = jinja2.FileSystemLoader('./templates')
env = jinja2.Environment(loader=templates)


def fd(path: str) -> List[str]:
    # return [f'{dir}/{file}' for file in files for dir, _, files in os.walk(os.path.expanduser(path))]

    all_files = []
    for dir, _, files in os.walk(os.path.expanduser(path)):
        for file in files:
            all_files.append(f'{dir}/{file}')

    return all_files

def main():
    for file in fd('./content'):
        with open(file, 'r') as f:
            fm = frontmatter.load(f)
        
        # See this for example of custom plugins
        # https://github.com/AlanDecode/Maverick/tree/master/Maverick/mistune_plugins
        markdown = mistune.create_markdown(
            plugins=[
                plugin_strikethrough,
                plugin_footnotes,
                plugin_table,
                plugin_url,
            ]
        )

        html = markdown.parse(fm.content)
        # Save file
        path = Path(file.replace('content/', '').replace('.md', '.html'))
        path.parent.mkdir(parents=True, exist_ok=True)
        template = env.get_template("body.html")
        with open(path, 'w+') as f:
            f.write(template.render(content=html))


if __name__ == "__main__":
    main()