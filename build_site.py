

from datetime import datetime
import importlib
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
import dateparser

import frontmatter
import jinja2

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

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
            print(f'error running builder for {file}')


def build_index_file(file):
    dirpath = file.parent

    md_files = list(dirpath.rglob('*.md'))

    content = f"## {file.parent.name}\n\n"
    pages = []

    for md_file in md_files:
        with open(md_file, 'r') as f:
            fm = frontmatter.load(f)

        if fm.get('published') is True:
            date = dateparser.parse(fm['date']) if 'date' in fm else None
            pages.append(
                {
                    'date': date,
                    'line': f"- [{fm['title']}]({md_file.relative_to(dirpath).with_suffix('.html')}) {date.strftime('%b %d %Y') if date else ''}"
                }
            )

    content += '\n'.join([page_info['line'] for page_info in sorted(pages, key=lambda page: (page['date'] is None, page['date']), reverse=True)])

    return content

def convert_md_to_html():
    md_files = list(Path(MD_DIR).rglob('*.md'))
    for file in md_files:
        with open(file, 'r') as f:
            fm = frontmatter.load(f)
            if fm.get('build_index') is True:
                fm.content += "\n\n" + build_index_file(file)

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
            try:
                time.sleep(1)
            except KeyError:
                pass
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
