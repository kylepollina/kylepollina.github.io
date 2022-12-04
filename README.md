How this project structure works:

There are two programs that need to be running while the site is being built:
  - `npx tailwindcss -i index.tailwind.css -o index.css --watch`
  - `python build_site.py`
      
All markdown files within the `content/` directory will be translated over to html in the respective destination directory.

Any `__init__.py` python file that is found within the `content/` directory will be loaded and will run the `build()` function if it exists in that file. The idea is to use the python file to build a markdown file which will automatically be picked up and converted to html.

The templates for the site are saved in the `templates/` directory.