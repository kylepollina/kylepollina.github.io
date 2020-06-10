/* main-sketch.js 
   kylepollina.github.io*/


var cube_texture;
var palette;

function setup() {
    var canvas = createCanvas(495, 220, WEBGL);
    canvas.parent('main-sketch-holder');

    palette = randomPalette();
    cube_texture = createGraphics(100, 100);

    ortho();
    noLoop();
}

function draw() {
    draw_cube_texture();
    draw_cubes();
}

function draw_cube_texture() {
    var boxlen = 20;

    for(let x = 0; x < cube_texture.width; x += boxlen) {
        for(let y = 0; y < cube_texture.height; y += boxlen) {

            let n = generate_n1(x, y, boxlen);

            cube_texture.fill(palette[n%5]);
            cube_texture.noStroke();
            cube_texture.rect(x, y, boxlen, boxlen);
        }
    }
}

function draw_cubes() {
    noStroke();
    texture(cube_texture);
    rotateX(radians(45));
    rotateY(radians(45));

    translate(-2*width/3, 0, -200);

    for(let i = 0; i < 5; i++) {
        for(let j = 0; j < 10; j++) {
            box(100);
            translate(100, 0, 100);
            box(100);
            translate(0, 100, -100);
        }
        translate(-1000, -1000, 0); // reset origin
        translate(0, -100, 100);
    }
}

function generate_n1(x, y, boxlen) {
    let xindex = x / boxlen;
    let yindex = y / boxlen;
    let n = (yindex * sin(frameCount/80) + xindex + frameCount/4);
    n = Math.floor(Math.abs(n));
    return n;
}

function mouseClicked() {
    palette = randomPalette();
    redraw();
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
