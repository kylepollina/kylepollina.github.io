/* diamond.js */

var palette;
var numDiamonds;
var diamonds = [];

function setup() {
    var canvas = createCanvas(windowWidth*3/4, windowHeight*3/4);
    canvas.parent('diamond-holder');

    palette = randomPalette1000();
    // palette = getPalette1000(568);
    numDiamonds = 20;
    setupDiamonds();

    background(palette[2]);
}

function setupDiamonds() {
    for(let i = 0; i < numDiamonds; i++) {
        var diamond = {
            color: color(palette[i%5]),
            bottomPoint: height/4 + (height/2)/numDiamonds*i,
            update: function() {
                this.bottomPoint += height/2 / numDiamonds / 20;
                if(this.bottomPoint > height*3/4) {
                    this.bottomPoint = height/4;
                    diamonds.unshift(diamonds.pop());
                } 
            }
        }   

        diamonds.push(diamond);
    }
}

function draw() {
    noStroke();
    drawDiamonds();
    drawBackground();
}

function drawBackground() {
    // fill(palette[1]);
    // stroke(palette[1]);
    fill(250, 250, 255);
    stroke(250, 250, 255);
    strokeWeight(5);
    beginShape();
    vertex(0,0);
    vertex(width/2,0);
    vertex(width/2, height/4);
    vertex(width/4, height/2);
    vertex(0, height/2);
    endShape(CLOSE);
    beginShape();
    vertex(width/2, 0);
    vertex(width/2, height/4);
    vertex(width*3/4, height/2);
    vertex(width, height/2);
    vertex(width, 0);
    endShape(CLOSE);
    beginShape();
    vertex(width, height/2);
    vertex(width*3/4, height/2);
    vertex(width/2, height*3/4);
    vertex(width/2, height);
    vertex(width, height);
    endShape(CLOSE);
    beginShape();
    vertex(width/2, height);
    vertex(width/2, height*3/4);
    vertex(width/4, height/2);
    vertex(0, height/2);
    vertex(0, height);
    endShape(CLOSE);
}

function drawDiamonds() {
    for(let i = 0; i < numDiamonds; i++) {
        let diamond = diamonds[numDiamonds - 1 - i];
        diamond.update();

        fill(diamond.color);

        beginShape();
        vertex(width/4, height/2);
        vertex(width/2, height/4);
        vertex(width*3/4, height/2);

        let offset = sin(width/4 - dist(width/2, diamond.bottomPoint, width/2, height/2)/20)*mouseX/20;
        // let offset = 0;

        vertex(width/2 + offset, diamond.bottomPoint);

        vertex(width/4, height/2);
        endShape();

    }
}

function keyPressed() {
    if(keyCode == 32) {
        palette = randomPalette1000();
        for(let i = 0; i < diamonds.length; i++) {
            diamonds[i].color = palette[i%5];
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth*3/4, windowHeight*3/4);
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
