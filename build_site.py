
import dateparser

import importlib
import time
from datetime import datetime
from pathlib import Path

import frontmatter
import jinja2
import mistune
from mistune.plugins import (
    plugin_footnotes,
    plugin_strikethrough,
    plugin_table,
    plugin_task_lists,
    plugin_url,
)
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

from logger import logger
from rich.traceback import install

install(show_locals=True)

MD_DIR = 'content/'
HTML_DIR = './'

templates = jinja2.FileSystemLoader('./templates')
env = jinja2.Environment(loader=templates)

themes = [
    ['#C42E60', '#225B7E', '#4C8785', '#D39C49', '#E65244'],
    ["#027B7F", "#FFA588", "#D62957", "#BF1E62", "#572E4F"],
]
current_theme = 0

def main():
    logger.info("Building site")
    build_md_files()
    convert_md_to_html()


def build_md_files():
    py_files = list(Path(MD_DIR).rglob('*.py'))

    for file in py_files:
        module_path = str(file).replace('/', '.').replace('.py', '')
        module = importlib.import_module(module_path)
        try:
            module.build()
        except Exception:
            logger.exception('Error running builder', extra={'file': file})


def convert_md_to_html():
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
        nav_info = {
            'home': ['https://kylepollina.github.io/', f'[{themes[current_theme][0]}]'],
            'about': ['https://kylepollina.github.io/about.html', f'[{themes[current_theme][1]}]'],
            # 'tools': ['', '[#894bb8]'],
            'writing': ['https://kylepollina.github.io/writing', f'[{themes[current_theme][2]}]'],
            'research': ['https://kylepollina.github.io/research', f'[{themes[current_theme][3]}]'],
            'interactive': ['https://kylepollina.github.io/interactive', f'[{themes[current_theme][4]}]'],
        }
        page = fm['page']
        date = dateparser.parse(fm['date']).strftime("%b %d %Y") if 'date' in fm else ''
        with open(html_file, 'w+') as f:
            f.write(
                template.render(
                    content=html,
                    scripts=fm.get('scripts', []),
                    highlight=fm.get('highlight', False),
                    page=page,
                    nav_info=nav_info,
                    link_bg=nav_info[page][-1],
                    year=datetime.now().year,
                    parents=len(html_file.parents),
                    page_date=date
                )
            )


class MyHandler(FileSystemEventHandler):
    def on_modified(self,  event):
        if 'templates/' in event.src_path or ('content/' in event.src_path and 'index.md' not in event.src_path):
            print(f'event type: {event.event_type} path : {event.src_path}')
            main()

    def on_created(self,  event):
        if 'templates/' in event.src_path or ('content/' in event.src_path and 'index.md' not in event.src_path):
            print(f'event type: {event.event_type} path : {event.src_path}')
            main()

    def on_deleted(self,  event):
        if 'templates/' in event.src_path or ('content/' in event.src_path and 'index.md' not in event.src_path):
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
            try:
                time.sleep(1)
            except KeyError:
                pass
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
