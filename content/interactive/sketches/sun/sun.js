/* sun.js */

var gradient;
var palette;

function preload() {
    gradient = loadImage('gradient.png');
}

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('sun-holder');

    gradient.loadPixels();
    palette = randomPalette1000();

    angleMode(DEGREES);
    noLoop();
}

function keyPressed() {
    if(keyCode == 32) loop();
}

function draw() {
    background(250, 250, 255);
    drawLines();
}

function drawLines() {
    let centerX = width/2;
    let centerY = height/2;
    let radius = width*2/5;
    let x1 = width/2;
    let y1 = height*9/10;
    let numLines = 100;

    for(let i = 0; i < numLines; i++) {
        let angle = (i * (360/numLines) + frameCount/5)%360;
        if(angle > (360-frameCount/5)) {

            let x2 = centerX + radius * cos(angle);
            let y2 = centerY + radius * sin(angle);
            // line(x1, y1, x2, y2);

            let angle2 = (i+frameCount/10) % numLines * (360/numLines);
            let x3 = centerX + radius * cos(angle2 + frameCount/5);
            let y3 = centerY + radius * sin(angle2 + frameCount/5);
            line(x2, y2, x3, y3);

        }
    }
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
