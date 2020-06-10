"""
Uses jinja2 to build a static website
"""

import os
from shutil import copyfile
from jinja2 import Environment, FileSystemLoader

env = Environment(
    loader=FileSystemLoader('templates'),
    trim_blocks=True,
    lstrip_blocks=True,
)

os.chdir('..')

def main():
    """Build each individual site"""
    copy_styles()
    kyle_pollina_github_io()
    art()
    # build_kinect()
    # build_color_palettes()
    # build_mandalas()
    # build_ukiyo_e()
    # build_data_science()

def write_file(directory, file_name, file_contents):
    """Quicker write"""
    with open(file_name, "w+") as f:
        f.write(file_contents)

def copy_styles(directory):
    copyfile('kyle_pollina_github_io/styles.css', f'{directory}/styles.css')

def kyle_pollina_github_io():
    directory = 'kylepollina.github.io'
    file_name = 'index.html'

    template = env.get_template(file_name)
    copy_styles(directory)

    file_contents = template.render(
        file_name=file_name,
        current_page='home',
        title='',
        requires_p5=True,
        is_sketch=False,
        sketch_name='main-sketch',
        utility_scripts=[
            'palettes.js'
        ]
    )

    write_file(directory, file_name, file_contents)

def art():
    directory = 'kylepollina.github.io'
    file_name = 'index.html'

    template = env.get_template(file_name)
    copy_styles(directory)

    sketches = [
        {'sketch_name': 'thrill',    'scripts': []},
        {'sketch_name': 'squares',   'scripts': ['palettes.js','io.js']},
        {'sketch_name': 'corners',   'scripts': ['palettes.js','grid.js']},
        {'sketch_name': 'arcs',      'scripts': []},
        {'sketch_name': 'towers',    'scripts': ['grid.js']},
        {'sketch_name': 'gogh',      'scripts': ['phyllotaxis.js','graphics.js','d3-delaunay.js']},
        {'sketch_name': 'diamond',   'scripts': ['palettes.js']},
        {'sketch_name': 'starry',    'scripts': ['phyllotaxis.js','graphics.js','shapes.js']},
        {'sketch_name': 'triangles', 'scripts': []},
        {'sketch_name': 'holohex',   'scripts': ['palettes.js','turtle.js','shapes.js']},
        {'sketch_name': 'spiro',     'scripts': ['turtle.js','shapes.js']},
        {'sketch_name': 'lisa',      'scripts': ['graphics.js','shapes.js']},
        {'sketch_name': 'breathing', 'scripts': []},
    ]

    build_interactive_main(sketches)
    build_interactive_sketches(sketches)


def build_interactive_main(sketches):
    sketch_names = [sketch['sketch_name'] for sketch in sketches]

    file_name = 'in.html'
    template = env.get_template(file_name)
    file_contents = template.render(
        file_name=file_name,
        current_page='interactive',
        title='kyle pollina',
        p5js=False,
        is_sketch=False,
        posts=sketch_names
    )

    # write_file(BASE_PATH / file_name, file_contents)


# def build_interactive_sketches(sketches):
    # for sketch in sketches:
    #     file_name = 'interactive/' + sketch['sketch_name'] + '.html'
    #     template = env.get_template('sketch.html')
    #     file_contents = template.render(
    #         file_name=file_name,
    #         current_page='interactive',
    #         title='kyle pollina',
    #         p5js=True,
    #         is_sketch=True,
    #         sketch_name=sketch['sketch_name'],
    #         scripts=sketch['scripts']
    #     )

    #     write_file(BASE_PATH / file_name, file_contents)


# def build_kinect():
    # file_name = 'kinect.html'
    # template = env.get_template(file_name)
    # file_contents = template.render(
    #     file_name=file_name,
    #     current_page='kinect',
    #     title='kyle pollina',
    #     p5js=False,
    #     is_sketch=False,
    #     videos=[
    #         {'title': 'hand painting', 'link': 'https://www.youtube.com/embed/WwX4lv0vOSY'},
    #         {'title': 'depth towers', 'link': 'https://www.youtube.com/embed/l7ivoH3AzZU'},
    #         {'title': 'depth finder', 'link': 'https://www.youtube.com/embed/UsiiZcQ8KB8'}
    #     ]
    # )

    # write_file(BASE_PATH / file_name, file_contents)


# def build_color_palettes():
    # file_name = 'color_palettes.html'
    # template = env.get_template(file_name)
    # file_contents = template.render(
    #     file_name=file_name,
    #     current_page='color palettes',
    #     title='kyle pollina',
    #     p5js=True,
    #     is_sketch=False,
    #     sketch_name='color_palettes',
    #     scripts=[
    #         'palettes.js',
    #         'grid.js',
    #         'simplebutton.js'
    #     ]
    # )

    # write_file(BASE_PATH / file_name, file_contents)


# def build_mandalas():
    # file_name = 'mandalas.html'
    # template = env.get_template(file_name)
    # file_contents = template.render(
    #     file_name=file_name,
    #     current_page='mandalas',
    #     title='kyle pollina',
    #     p5js=False,
    #     mandalas=['18', '17', '16', '15', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3']
    # )

    # write_file(BASE_PATH / file_name, file_contents)


# def build_ukiyo_e():
    # file_name = 'ukiyo-e.html'
    # template = env.get_template(file_name)
    # file_contents = template.render(
    #     file_name=file_name,
    #     current_page='ukiyo-e',
    #     title='kyle pollina',
    #     p5js=False,
    #     hiroshige=[
    #         'No. 2 Kawachi Settsu',
    #         'Tagged Cranes',
    #     ],
    #     narumi=[
    #         'Postcard of Genroku Beauty 2',
    #         'Woman with umbrella',
    #         'Postcard of Princess from Jogaku sekai',
    #         'Female nude seated in water',
    #     ]
    # )

    # write_file(BASE_PATH / file_name, file_contents)


# def build_data_science():
    # file_name = 'data_science.html'
    # template = env.get_template(file_name)
    # file_contents = template.render(
    #     file_name=file_name,
    #     current_page='data science',
    #     title='kyle pollina',
    #     p5js=False,
    # )

    # write_file(BASE_PATH / file_name, file_contents)

    # build_fmri()


# def build_fmri():
    # file_name = 'fmri_natural_language_processing.html'
    # template = env.get_template(file_name)
    # file_contents = template.render(
    #     file_name=file_name,
    #     current_page='data science',
    #     title='kyle pollina',
    #     is_sketch=True,
    #     p5js=False,
    # )

    # write_file(BASE_PATH / ('data_science/' + file_name), file_contents)


if __name__ == "__main__":
    main()
