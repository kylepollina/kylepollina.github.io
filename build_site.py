

from datetime import datetime
import time

import mistune
from pathlib import Path
from mistune.plugins import (
    plugin_strikethrough,
    plugin_footnotes,
    plugin_table,
    plugin_url,
    plugin_task_lists,
)

import frontmatter
import jinja2

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

MD_DIR = 'content/'
HTML_DIR = './'

templates = jinja2.FileSystemLoader('./templates')
env = jinja2.Environment(loader=templates)


def main():
    md_files = list(Path(MD_DIR).rglob('*.md'))
    for file in md_files:
        with open(file, 'r') as f:
            fm = frontmatter.load(f)

        # See this for example of custom plugins
        # https://github.com/AlanDecode/Maverick/tree/master/Maverick/mistune_plugins
        # renderer = HighlightRenderer(escape=False)
        markdown = mistune.create_markdown(
            plugins=[
                plugin_strikethrough,
                plugin_footnotes,
                plugin_table,
                plugin_url,
                plugin_task_lists,
            ],
            escape=False,
            # renderer=renderer,
        )

        html = markdown.parse(fm.content)
        # Save file
        html_file = Path(str(file).replace(MD_DIR, HTML_DIR).replace('.md', '.html'))
        html_file.parent.mkdir(parents=True, exist_ok=True)
        template = env.get_template("base.html")
        with open(html_file, 'w+') as f:
            f.write(
                template.render(
                    content=html,
                    scripts=fm.get('scripts', []),
                    highlight=fm.get('highlight', False),
                    page=fm['page'],
                    year=datetime.now().year,
                    parents=len(html_file.parents)
                )
            )


class MyHandler(FileSystemEventHandler):
    def on_modified(self,  event):
        if 'templates/' in event.src_path or 'content/' in event.src_path:
            print(f'event type: {event.event_type} path : {event.src_path}')
            main()

    def on_created(self,  event):
        if 'templates/' in event.src_path or 'content/' in event.src_path:
            print(f'event type: {event.event_type} path : {event.src_path}')
            main()

    def on_deleted(self,  event):
        if 'templates/' in event.src_path or 'content/' in event.src_path:
            print(f'event type: {event.event_type} path : {event.src_path}')
            main()


if __name__ == "__main__":
    main()
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler,  path='.',  recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
