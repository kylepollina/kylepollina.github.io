/* perlin.js */

var grid;
var paused;

function setup() {
    var canvas = createCanvas(640, 640);
    canvas.parent('perlin-holder');

    paused = false;

    grid = new Grid(0, 0, width, height, 50, 50);

    noFill();
    stroke(0);
    strokeWeight(1);
}

function draw() {
    background(255);
    for(let i = 0; i < grid.nCols; i++) {
        for(let j = 0; j < grid.nRows; j++) {
            let angle = map(noise(i / 10 + frameCount / 200, j / 10), 0, 1, 0, TWO_PI);
            let tile = grid.getTile(i, j);

            push();
            translate(tile.centerX, tile.centerY);
            rotate(angle);
            line(-tile.width / 2, 0, tile.width / 2, 0);
            pop();
        }
    }
}

function keyPressed() {
    if(keyCode == 32) {
        if(paused == false) {
            paused = true;
            noLoop();
        }
        else if(paused == true) {
            paused = false;
            loop();
        }
    }
}
