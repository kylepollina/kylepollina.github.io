from jinja2 import Environment, FileSystemLoader, select_autoescape
env = Environment(
    loader=FileSystemLoader('templates'),
    trim_blocks=True,
    lstrip_blocks=True,
)

def build_index():
    template = env.get_template('index.html')
    file_name = 'index.html'
    text = template.render(
            file_name=file_name, 
            current_page='home',
            title='kyle pollina',
            p5js=True,
            is_sketch=False,
            scripts=[
                'sketches/cubies.js',
                'p5-utilities/palettes.js'
                ],
            sketch_name='cubies',
            )

    write_file(file_name, text)

def build_interactive():
    sketches = [
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

    template = env.get_template('interactive.html')
    file_name = 'interactive.html'
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
        template = env.get_template('sketch.html')
        file_name = 'interactive/' + sketch['sketch_name'] + '.html'
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
    
def write_file(file_name, text):
    file = open(file_name, 'w')
    file.write(text)
    file.close()

if __name__ == "__main__":
    build_index()
    build_interactive()
    # build_kinect()
    # build_color_palettes()
    # build_mandalas()
    # build_ukiyo_e()
    # build_grand_prix_posters()

