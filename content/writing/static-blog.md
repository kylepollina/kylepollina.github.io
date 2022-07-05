---
page: writing
title: building a static site generator
highlight: true
published: True 
date: July 2 2022
---

# Building a static site generator

> Why the hell am I remaking something that has already been made before?

I wrote my own static site generator because I was frustrated that the current
tools were not customizable to my liking. So instead of spending a few hours reading
the documentation I spent dozens of hours building my own implementation. C'est la vie.


__> Update:__ I was initially in the process of writing up a nice overview on the details of how I
built this, but realized I really don't care enough to waste my time doing that.
Also I think if anyone wants to build a static site generator then they should figure it out for
themselves. It's a great learning experience and will teach you more than I could from a dumb
blog post.

But I'll at least give you links to the tools I use:

- [Mistune](https://mistune.readthedocs.io/en/latest/) - Python markdown parser
- [Jinja2](https://svn.python.org/projects/external/Jinja-2.1.1/docs/_build/html/index.html) - Python template engine
- [Python-frontmatter](https://github.com/eyeseast/python-frontmatter) - Python package to read arbitrary metadata from text files
- [Watchdog](https://python-watchdog.readthedocs.io/en/stable/) - Python package to continuously watch for changed files
- [Tailwindcss](https://tailwindcss.com/) & [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) - Better CSS
