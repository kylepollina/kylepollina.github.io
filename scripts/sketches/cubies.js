/* cubies.js */

var gridGraphics;
var boxlen = 20;
var palette;

function setup() {
    var canvas = createCanvas(495, 220, WEBGL);
    canvas.parent('cubies-holder');

    palette = randomPalette1000();
    gridGraphics = createGraphics(100, 100);
    noStroke();

    ortho();
    noLoop();
}

function draw() {
    for(let x = 0; x < gridGraphics.width; x+=boxlen) {
        for(let y = 0; y < gridGraphics.height; y+=boxlen) {

            let n = generateN1(x, y);

            gridGraphics.fill(palette[n%5]);
            gridGraphics.noStroke();
            gridGraphics.rect(x, y, boxlen, boxlen);
        }
    }

    fill(255);
    noStroke();
    texture(gridGraphics);
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


function generateN1(x, y) {
    let xindex = x / boxlen;
    let yindex = y / boxlen;
    let n = (yindex * sin(frameCount/80) + xindex + frameCount/4);
    n = Math.floor(Math.abs(n));
    return n;
}

function mouseClicked() {
    palette = randomPalette1000();
    redraw();
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
