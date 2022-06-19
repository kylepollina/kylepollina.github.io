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

This will be the main template we'll use. Jinja allows us to include other template files in the same directory,
which is nice to make things more modular.

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
    {% include 'content.html' %}
  </div>
</body>
```

etc.


## Markdown -> HTML

So to convert markdown to html we are going to need the [Mistune](https://mistune.readthedocs.io/en/latest/)
package for Python. I also use [python-frontmatter](https://github.com/eyeseast/python-frontmatter) to
read in metadata for each markdown file. I keep all of my markdown files in a directory called `content/`

Here's a simple script to read all files from the `content/` dir and convert them into HTML.

```python
def main():
    ...

if __name__ == "__main__":
  main()
```

## Frontmatter

## TailwindCSS for styling