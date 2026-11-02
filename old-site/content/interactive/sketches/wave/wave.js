/**************
 ** waves.js **
 *************/

var step;
var amplitude;
var freq;
var palette;
var waves;

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('wave-holder');

    step = 20;
    amplitude = 10;
    freq = 6;

    palette = randomPalette1000();
    waves = [];
    setupWaves();

    angleMode(DEGREES);
}

function draw() {
    background(255);
    for(let i = 0; i < waves.length; i++) {
        let wave = waves[i];
        image(wave.graphics, -1*width/2 + 100*cos(wave.y+frameCount*2), wave.y);
    }
}

function setupWaves() {
    for(let y = 0; y < 2*height; y+=20) {
        let graphics = createGraphics(2*width, 2*height);
        graphics.fill(palette[y/20%5]);
        graphics.noStroke();
        graphics.beginShape();

        for(var x = -1*width; x < 2*width; x+=step) {
            let x_val = x;
            let y_val = amplitude*sin(freq*x) + height/2;
            graphics.curveVertex(x_val, y_val); 
        }

        graphics.vertex(x, 2*height);
        graphics.vertex(-1*width, 2*height);

        graphics.endShape();
        waves.push({"graphics": graphics, "y": y-height});
    }
}

function keyPressed() {
    if(keyCode == 32) {
        save();
    }
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
