/* patterns.js */

var palette;

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('patterns-holder');

    // palette = randomPalette1000();
    palette = allPalettes[534];

    strokeWeight(3);
    stroke(palette[0]);
    fill(palette[2]);
}

function keyPressed() {
    if(keyCode == 32) {
        palette = randomPalette1000();
        stroke(randColor(palette));
        fill(randColor(palette));
    }
    else if(keyCode == 48) {
        stroke(randColor(palette));
        fill(randColor(palette));
    }
}

function draw() {
    background(255);

    let squareLen = width/5;

    for(let x = 0; x < width; x += squareLen) {
        for(let y = 0; y < height; y += squareLen) {
            drawSquare(x, y, squareLen, 0);
        }
    }
}


function drawSquare(x, y, len, recursionLevel) {
    let xpos = x + sin(frameCount/30) * recursionLevel * dist(x, y, mouseX, mouseY)/100;
    let ypos = y + cos(frameCount/60) * recursionLevel * dist(x, y, mouseY, mouseY)/100;
    let l = len + sin(frameCount/50) * recursionLevel;
    let w = len + cos(frameCount/20) * recursionLevel;
    rect(xpos, ypos, l, w);
    if(len > 20) {
        drawSquare(x+10, y+10, len-20, recursionLevel+1);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
