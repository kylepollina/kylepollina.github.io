---
page: writing
---

# Building a static site generator

> Why the hell am I remaking something that has already been made before?

I decided to write my own static site generator because I was frustrated that the current
static site/blog generators were not customizable to my liking. So instead of spending a few
hours reading the documentation I spent dozens of hours building my own implementation. ¯\_(ツ)_/¯

### Tools for the job
- Python
    - [Mistune](https://mistune.readthedocs.io/en/latest/) - Markdown parser
    - [Jinja2](https://svn.python.org/projects/external/Jinja-2.1.1/docs/_build/html/index.html) - Template engine
    - [Watchdog](https://python-watchdog.readthedocs.io/en/stable/) - Continuosly watch for changed files
- [Tailwindcss](https://tailwindcss.com/)
    - [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) - Better CSS
        
## Step 1: Setting up HTML templates

The first step is to set up some HTML templates to be reused throughout the site.

