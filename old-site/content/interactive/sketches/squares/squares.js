/* squares.js */

var palette;
var numSquares;
var shrink;

function setup() {
    var canvas = createCanvas(600, 600);
    canvas.parent('squares-holder');

    numSquares = 30;
    palette = randomPalette();

    shrink = 0;

    noStroke();
    rectMode(CENTER);
    background(255);
}

function draw() {
    translate(width/2, height/2);
    background(255);
    for(let i = numSquares; i > 1; i--) {
        let sidelen = width/40*i - shrink;

        if (sidelen < 0) { sidelen = 0 }

        if(i % 2 == 0) fill(0);
        else fill(255);

        let modifier = 1 + mouseX / 1000;
        // let modifier;
        // if (mouseX < width/2) { modifier = mouseX / 1000 }
        // else { modifier = width/2 / 1000 }

        push();
        let sign = i % 2 == 0 ? 1 : -1;
        rotate(sign * sin(frameCount/1000)*i * modifier);
        // rotate(sign * sin(frameCount/100)*i * modifier);
        rect(0, 0, sidelen, sidelen);
        pop();
    } 

    if (mouseIsPressed) {
        shrink++;
    }
    else if (shrink > 0) {
        shrink--;
    }
}

function mouseHeld() {
    shrink += 2;
}

function keyPressed() {
    if(keyCode == 32) {
        palette = randomPalette();
    }
}

