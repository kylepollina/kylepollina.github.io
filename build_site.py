# build_site.py

from jinja2 import Environment, FileSystemLoader, select_autoescape
env = Environment(
    loader=FileSystemLoader('templates'),
    trim_blocks=True,
    lstrip_blocks=True,
)

def build_index_page():
    file_name = 'index.html'
    template = env.get_template(file_name)
    text = template.render(
            file_name=file_name, 
            current_page='home',
            title='kyle pollina',
            p5js=True,
            is_sketch=False,
            sketch_name='cubies',
            scripts=[
                'palettes.js'
                ]
            )

    write_file(file_name, text)

def build_interactive_page():
    sketches = [
            {'sketch_name': 'thrill', 'scripts': []},
            {'sketch_name': 'squares', 'scripts': [
                'palettes.js',
                'io.js'
                ]},
            {'sketch_name': 'corners', 'scripts': [
                'palettes.js',
                'grid.js'
                ]},
            {'sketch_name': 'arcs', 'scripts': []},
            {'sketch_name': 'towers', 'scripts': [
                'grid.js'
                ]},
            {'sketch_name': 'gogh', 'scripts': [
                'phyllotaxis.js',
                'graphics.js',
                'd3-delaunay.js'
                ]},
            {'sketch_name': 'diamond', 'scripts': [
                'palettes.js'
                ]},
            {'sketch_name': 'starry', 'scripts': [
                'phyllotaxis.js',
                'graphics.js',
                'shapes.js'
                ]},
            {'sketch_name': 'triangles', 'scripts': []},
            {'sketch_name': 'holohex', 'scripts': [
                'palettes.js',
                'turtle.js',
                'shapes.js'
                ]},
            {'sketch_name': 'spiro', 'scripts': [
                'turtle.js',
                'shapes.js'
                ]},
            {'sketch_name': 'lisa', 'scripts': [
                'graphics.js',
                'shapes.js'
                ]},
            {'sketch_name': 'breathing', 'scripts': []},
            ]
    build_interactive_main(sketches)
    build_interactive_sketches(sketches)

def build_interactive_main(sketches):
    sketch_names = [sketch['sketch_name'] for sketch in sketches]

    file_name = 'interactive.html'
    template = env.get_template(file_name)
    text = template.render(
            file_name=file_name,
            current_page='interactive',
            title='kyle pollina',
            p5js=False,
            is_sketch=False,
            posts=sketch_names
            )

    write_file(file_name, text)

def build_interactive_sketches(sketches):
    for sketch in sketches:
        file_name = 'interactive/' + sketch['sketch_name'] + '.html'
        template = env.get_template('sketch.html')
        text = template.render(
                file_name=file_name,
                current_page='interactive',
                title='kyle pollina',
                p5js=True,
                is_sketch=True,
                sketch_name=sketch['sketch_name'],
                scripts=sketch['scripts']
                )

        write_file(file_name, text)

def build_kinect_page():
    file_name = 'kinect.html'
    template = env.get_template(file_name)
    text = template.render(
            file_name=file_name,
            current_page='kinect',
            title='kyle pollina',
            p5js=False,
            is_sketch=False,
            videos=[
                {'title': 'hand painting', 'link': 'https://www.youtube.com/embed/WwX4lv0vOSY'},
                {'title': 'depth towers', 'link': 'https://www.youtube.com/embed/l7ivoH3AzZU'},
                {'title': 'depth finder', 'link': 'https://www.youtube.com/embed/UsiiZcQ8KB8'}
                ]
            )

    write_file(file_name, text)

def build_color_palettes_page():
    file_name = 'color_palettes.html'
    template = env.get_template(file_name)
    text = template.render(
            file_name=file_name,
            current_page='color palettes',
            title='kyle pollina',
            p5js=True,
            is_sketch=False,
            sketch_name='color_palettes',
            scripts=[
                'palettes.js',
                'grid.js',
                'simplebutton.js'
                ]
            )

    write_file(file_name, text)

def build_mandalas_page():
    file_name = 'mandalas.html'
    template = env.get_template(file_name)
    text = template.render(
            file_name=file_name,
            current_page='mandalas',
            title='kyle pollina',
            p5js=False,
            mandalas=['18', '17', '16', '15', '13', '12', '11', '10', '9', '8', '7', '6', '5', '4', '3']
            )
    
    write_file(file_name, text)

def build_ukiyo_e_page():
    file_name = 'ukiyo-e.html'
    template = env.get_template(file_name)
    text = template.render(
            file_name=file_name,
            current_page='ukiyo-e',
            title='kyle pollina',
            p5js=False,
            hiroshige=[
                'No. 2 Kawachi Settsu',
                'Tagged Cranes',
                ],
            narumi=[
                'Postcard of Genroku Beauty 2',
                'Woman with umbrella',
                'Postcard of Princess from Jogaku sekai',
                'Female nude seated in water',
                ]
            )

    write_file(file_name, text)
    
def write_file(file_name, text):
    file = open(file_name, 'w')
    file.write(text)
    file.close()

if __name__ == "__main__":
    build_index_page()
    build_interactive_page()
    build_kinect_page()
    build_color_palettes_page()
    build_mandalas_page()
    build_ukiyo_e_page()

