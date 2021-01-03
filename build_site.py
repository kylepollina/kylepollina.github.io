"""
Uses jinja2 to build a static website
"""

import shutil
from jinja2 import Environment, FileSystemLoader


class Page:
    def __init__(
        self,
        file_name,
        template=None,
        sketch_name=None,
        current_page='home',
        p5_utility_scripts=None,
    ):
        self.file_name = file_name
        self.template = template
        self.sketch_name = sketch_name
        self.current_page = current_page
        self.p5_utility_scripts = p5_utility_scripts

    def build(self):
        ...


if __name__ == "__main__":
    Page(
        file_name='index.html',
        template='sketch',
        sketch_name='main-sketch',
        p5_utility_scripts=['palettes.js', 'shapes.js']
    ).build()


# class Page:
#     env = Environment(
#         loader=FileSystemLoader('templates'),
#         trim_blocks=True,
#         lstrip_blocks=True,
#     )

#     def __init__(self, directory, file_name, page, template_name, styles=True, requires_p5=False, sketch_name=None, is_sketch=False, utility_scripts=None, posts=None, hiroshige=None, narumi=None):
#         self.directory = directory
#         self.file_name = file_name
#         self.page = page
#         self.template_name = template_name
#         self.styles = styles
#         self.requires_p5 = requires_p5
#         self.sketch_name = sketch_name
#         self.is_sketch = is_sketch
#         self.hiroshige = hiroshige
#         self.narumi = narumi
#         self.utility_scripts = utility_scripts if utility_scripts is not None else []
#         self.posts = posts

#     def build(self):
#         if self.styles:
#             self.copy_styles()
#         file_contents = self.build_content()
#         self.write_file(file_contents)

#     def copy_styles(self):
#         """Copy the styles.css file into its directory"""
#         dest = f'../{self.directory}/styles.css'
#         try:
#             shutil.copyfile('styles.css', dest)
#         except:
#             pass

#     def build_content(self) -> str:
#         """Generate the file contents"""
#         template = self.env.get_template(self.template_name)
#         file_contents = template.render(
#             file_name=self.file_name,
#             current_page=self.page,
#             title=self.directory,
#             requires_p5=self.requires_p5,
#             sketch_name=self.sketch_name,
#             utility_scripts=self.utility_scripts,
#             posts=self.posts,
#             hiroshige=self.hiroshige,
#             narumi=self.narumi,
#         )

#         return file_contents

#     def write_file(self, file_contents: str) -> None:
#         """Quicker write"""
#         file_name = f'../{self.directory}/{self.file_name}'
#         with open(file_name, "w+") as f:
#             f.write(file_contents)


# def kylepollina_github_io():
#     Page(
#         directory='kylepollina.github.io',
#         file_name='index.html',
#         page='home',
#         template_name='kylepollina.github.io.html',
#         requires_p5=True,
#         is_sketch=True,
#         sketch_name='main-sketch',
#         utility_scripts=['palettes.js']
#     ).build()


# def earthscience():
#     Page(
#         directory='earthscience',
#         file_name='index.html',
#         page='earthscience',
#         template_name='earthscience.html',
#     ).build()


# def ukiyo_e():
#     Page(
#         directory='ukiyo-e',
#         file_name='index.html',
#         page='ukiyo-e',
#         template_name='ukiyo-e.html',
#         hiroshige=[
#             'No. 2 Kawachi Settsu',
#             'Tagged Cranes',
#         ],
#         narumi=[
#             'Postcard of Genroku Beauty 2',
#             'Woman with umbrella',
#             'Postcard of Princess from Jogaku sekai',
#             'Female nude seated in water',
#         ]
#     ).build()

# if __name__ == "__main__":
#     """Build each individual site"""
#     print('building kylepollina.github.io')
#     kylepollina_github_io()
#     print('building earthscience')
#     earthscience()
#     print('building ukiyo-e')
#     ukiyo_e()


# # def build_color_palettes():
#     # file_name = 'color_palettes.html'
#     # template = env.get_template(file_name)
#     # file_contents = template.render(
#     #     file_name=file_name,
#     #     current_page='color palettes',
#     #     title='kyle pollina',
#     #     p5js=True,
#     #     is_sketch=False,
#     #     sketch_name='color_palettes',
#     #     scripts=[
#     #         'palettes.js',
#     #         'grid.js',
#     #         'simplebutton.js'
#     #     ]
#     # )

#     # write_file(BASE_PATH / file_name, file_contents)


# # def build_mandalas():
#     # file_name = 'mandalas.html'
#     # template = env.get_template(file_name)
#     # file_contents = template.render(
#     #     file_name=file_name,
#     #     current_page='mandalas',
#     #     title='kyle pollina',
#     #     p5js=False,
#     #     mandalas=['18', '17', '16', '15', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3']
#     # )

#     # write_file(BASE_PATH / file_name, file_contents)


#     # write_file(BASE_PATH / file_name, file_contents)


# # def build_data_science():
#     # file_name = 'data_science.html'
#     # template = env.get_template(file_name)
#     # file_contents = template.render(
#     #     file_name=file_name,
#     #     current_page='data science',
#     #     title='kyle pollina',
#     #     p5js=False,
#     # )

#     # write_file(BASE_PATH / file_name, file_contents)

#     # build_fmri()


# # def build_fmri():
#     # file_name = 'fmri_natural_language_processing.html'
#     # template = env.get_template(file_name)
#     # file_contents = template.render(
#     #     file_name=file_name,
#     #     current_page='data science',
#     #     title='kyle pollina',
#     #     is_sketch=True,
#     #     p5js=False,
#     # )

#     # write_file(BASE_PATH / ('data_science/' + file_name), file_contents)

# # def art():
# #     sketches = [
# #         {'sketch_name': 'thrill',    'scripts': []},
# #         {'sketch_name': 'squares',   'scripts': ['palettes.js','io.js']},
# #         {'sketch_name': 'corners',   'scripts': ['palettes.js','grid.js']},
# #         {'sketch_name': 'arcs',      'scripts': []},
# #         {'sketch_name': 'towers',    'scripts': ['grid.js']},
# #         {'sketch_name': 'gogh',      'scripts': ['phyllotaxis.js','graphics.js','d3-delaunay.js']},
# #         {'sketch_name': 'diamond',   'scripts': ['palettes.js']},
# #         {'sketch_name': 'starry',    'scripts': ['phyllotaxis.js','graphics.js','shapes.js']},
# #         {'sketch_name': 'triangles', 'scripts': []},
# #         {'sketch_name': 'holohex',   'scripts': ['palettes.js','turtle.js','shapes.js']},
# #         {'sketch_name': 'spiro',     'scripts': ['turtle.js','shapes.js']},
# #         {'sketch_name': 'lisa',      'scripts': ['graphics.js','shapes.js']},
# #         {'sketch_name': 'breathing', 'scripts': []},
# #     ]

# #     sketch_names = [sketch['sketch_name'] for sketch in sketches]

# #     Page(
# #         directory='art',
# #         file_name='index.html',
# #         page='art',
# #         template_name='art.html',
# #         posts=sketch_names
# #     ).build()

# #     for sketch in sketches:
# #         Page(
# #             directory='art/interactive',
# #             file_name=f'{sketch["sketch_name"]}.html',
# #             page='art',
# #             template_name='sketch.html',
# #             styles=False,
# #             requires_p5=True,
# #             sketch_name=sketch['sketch_name'],
# #             is_sketch=True,
# #             utility_scripts=sketch['scripts']
# #         ).build()
