/* squares.js */

var palette;
var numSquares;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('squares-holder');

    numSquares = 30;
    palette = randomPalette();

    noStroke();
    rectMode(CENTER);
    background(255);
}

function draw() {
    translate(width/2, height/2);
    background(255);
    for(let i = numSquares; i > 1; i--) {
        let sidelen = width/40*i;

        if(i % 2 == 0) fill(0);
        else fill(255);

        let modifier = 1 + mouseX / 1000;

        push();
        let sign = i % 2 == 0 ? 1 : -1;
        rotate(sign * sin(frameCount/1000)*i * modifier);
        rect(0, 0, sidelen, sidelen);
        pop();
    } 
}


function mouseClicked() {
    if(isBW == true) {
        isBW = false;
        frameChanged = frameCount;
        palette = randomPalette1000();
    }
    else {
        isBW = true;
    }
}

function keyPressed() {
    if(keyCode == 32) {
        palette = randomPalette();
    }
}

