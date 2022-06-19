---
page: writing
highlight: true
---

# Building a static site generator

> Why the hell am I remaking something that has already been made before?

I decided to write my own static site generator because I was frustrated that the current
static site/blog generators were not customizable to my liking. So instead of spending a few
hours reading the documentation I spent dozens of hours building my own implementation. _C'est la vie_.

### Tools for the job

- Python
  - [Mistune](https://mistune.readthedocs.io/en/latest/) - Markdown parser
  - [Jinja2](https://svn.python.org/projects/external/Jinja-2.1.1/docs/_build/html/index.html) - Template engine
  - [Watchdog](https://python-watchdog.readthedocs.io/en/stable/) - Continuosly watch for changed files
  - [Python-frontmatter](https://github.com/eyeseast/python-frontmatter) - Page metadata
- [Tailwindcss](https://tailwindcss.com/)
  - [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) - Better CSS


I'm not going to go into much detail regarding Tailwindcss, but I will at least show how I set it up to work for
this project.

## Templates

The first step is to set up some basic HTML templates to be reused throughout the site. I keep these all in
a directory called `templates/`

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
{% include 'head.html' %}
{% include 'body.html' %}
</html>
```

This will be the main template we'll use. Jinja allows us to include other template files from the same directory,
which helps us make the site more modular.

```html
<!-- templates/head.html -->
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
</head>
```

```html
<!-- templates/body.html -->
<body>
  {% include 'header.html' %}
  <div>
    {% include 'nav.html' %} 
    {{ content }}
  </div>
</body>
```

etc.

## Markdown -> HTML

To convert markdown to html we are going to need the [Mistune](https://mistune.readthedocs.io/en/latest/)
package for Python. For this example we will keep all of the markdown files in a directory called `markdown/`
and all the HTML files in a directory called `html/`.

Let's start with a simple file at `markdown/hello-world.md`.

```markdown
# Hello world
_This_ is **my** website.

- [Link 1](www.google.com)
- [Link 2](www.wikipedia.org)
```

Here's a Python script called `build_site.py` to read all files from the `markdown/` dir and convert them into HTML:

```python
# ./build_site.py
from pathlib import Path
import jinja2
from mistune.plugins import (
    plugin_strikethrough,
    plugin_footnotes,
    plugin_table,
    plugin_url,
)

MD_DIR = 'markdown/'
HTML_DIR = 'html/'
TEMPLATES_DIR = 'templates/'

templates = jinja2.FileSystemLoader(TEMPLATES_DIR)
env = jinja2.Environment(loader=templates)

def main():
    # Get a list of all markdown files in the MD_DIR directory
    md_files = list(Path(MD_DIR).rglob('*.md'))

    for file in md_files:
        with open(file, 'r') as f:
            content = f.read()
        
        # Create a markdown parser with the given plugins
        markdown = mistune.create_markdown(
            plugins=[
                plugin_strikethrough,
                plugin_footnotes,
                plugin_table,
                plugin_url,
            ],
            escape=False,  # Allows us to write HTML code in
            # the markdown files without the code being escaped
        )
        # Parse the markdown text into html
        html = markdown.parse(content)
        # Make a new filepath for the new html file we will create
        html_file = Path(str(file).replace(MD_DIR, HTML_DIR).replace('.md', '.html'))
        html_file.parent.mkdir(parents=True, exist_ok=True)

        # Create a new template object with the base.html template
        template = env.get_template("base.html")
        page_text = template.render(
            title='my title',
            content=html
        )

        with open(html_file, 'w+') as f:
            f.write(page_text)
    
if __name__ == "__main__":
    main()
```

Read more about `mistune.create_markdown()` here: [TODO LINK]()

## Frontmatter
I use [python-frontmatter](https://github.com/eyeseast/python-frontmatter) to read in metadata for each markdown file.
Let's add some metadata to our `hello-world.md` file.

```markdown
---
title: My Hello world page
---
# Hello world
_This_ is **my** website.

- [Link 1](www.google.com)
- [Link 2](www.wikipedia.org)
```

Now we can access this data using the `frontmatter` package. Change the `main()` function to read the frontmatter data
into a dictionary.

```python
import frontmatter
...

def main():
    # Get a list of all markdown files in the MD_DIR directory
    md_files = list(Path(MD_DIR).rglob('*.md'))

    for file in md_files:
        with open(file, 'r') as f:
            # Load the frontmatter data into the dictionary `fm`
            fm = frontmatter.load(f)
            content = fm.content
        
        ...

        # Create a new template object with the base.html template
        template = env.get_template("base.html")
        page_text = template.render(
            # We can now access the title metadata from the markdown
            # frontmatter and plug it into our template
            title=fm.get('title'),
            content=html
        )

        with open(html_file, 'w+') as f:
            f.write(page_text)
        
```

## Automatic reloading

In order to have automatic reloading whenever a markdown file or template file is changed, we
can use the `watchdog` package to observe any changes to files and run the `main()` function
for each event.

```python

from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
...

class MyHandler(FileSystemEventHandler):
    def on_modified(self,  event):
        if TEMPLATES_DIR in event.src_path or MD_DIR in event.src_path:
            print(f'event type: {event.event_type} path : {event.src_path}')  
            main()

    def on_created(self,  event):
        if TEMPLATES_DIR in event.src_path or MD_DIR in event.src_path:
            print(f'event type: {event.event_type} path : {event.src_path}')  
            main()

    def on_deleted(self,  event):
        if TEMPLATES_DIR in event.src_path or MD_DIR in event.src_path:
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
```

Now, whenever we run `python build_site.py` it will continuously check for changes in the `templates/` dir
and the `markdown/` dir and run the whole build step each time a file changes.

## TailwindCSS for styling

This site uses [Tailwindcss](https://tailwindcss.com/) and the [Typography](https://tailwindcss.com/docs/typography-plugin)
plugin for tailwindcss. The typography plugin sets up a lot of nice styles for converted markdown -> html which makes
basic setup for a blog a breeze.

1. Download and install tailwindcss
2. Setup your `tailwind.config.js` to look for our html and markdown files and add the typography plugin.
   ```javascript
   module.exports = {
       content: ["./**/*.html", "./content/**/*.md"],
       theme: {},
       plugins: [
         require('@tailwindcss/typography'),
       ],
   }
   ```
3. Run the command `npx tailwindcss -i index.tailwind.css -o index.css --watch` to continuously build our output css to the
   file `index.css`
4. Somewhere in your templates add a stylesheet link to this newly created `index.css` file
   ```html
   <head>
      <meta charset="UTF-8">
      <title>{{ title }}</title>
      <!-- CSS -->
      <link rel="stylesheet" href="index.css">
   </head>
   ```
   
Now we will be able to use tailwindcss classes in our templates and have them applied to every page that is being built.