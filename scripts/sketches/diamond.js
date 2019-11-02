/* diamond.js */

var palette;
var diamonds = [];

var left;
var right;

function setup() {
    var canvas = createCanvas(520, 500);
    canvas.parent('diamond-holder');

    palette = randomPalette1000();
    setupDiamonds();
}

function setupDiamonds() {
    let numDiamonds = 20;
    for(let i = 0; i < numDiamonds; i++) {
        var diamond = {
            color: color(palette[i % 5]),
            bottomPoint: 0 + height / numDiamonds * i,
            update: function() {
                this.bottomPoint += height / numDiamonds / 20;
                if(this.bottomPoint > height) {
                    this.bottomPoint = 0;
                    diamonds.unshift(diamonds.pop());
                } 
            }
        }   

        diamonds.push(diamond);
    }

    left = 0;
    right = width;
    // left = width/8;
    // right = width*7/8;
}

function draw() {
    noStroke();
    drawDiamonds();
    drawBackground();
}

function drawDiamonds() {
    for(let i = 0; i < diamonds.length; i++) {
        let diamond = diamonds[diamonds.length - 1 - i];
        diamond.update();

        fill(diamond.color);

        beginShape();
        vertex(left, height/2);
        vertex(width/2, 0);
        vertex(right, height/2);

        let offset = sin(left - dist(width/2, diamond.bottomPoint, width/2, height/2)/20)*mouseX/20;

        vertex(width/2 + offset, diamond.bottomPoint);

        vertex(left, height/2);
        endShape();
    }
}

function drawBackground() {
    fill(255, 250, 250);
    beginShape();
    vertex(0, height/2);
    vertex(left, height/2);
    vertex(width/2, 0);
    vertex(right, height/2);
    vertex(width/2, height);
    vertex(left, height/2);
    vertex(0, height/2);
    vertex(0, height);
    vertex(width, height);
    vertex(width, 0);
    vertex(0, 0);
    endShape(CLOSE);
}

function mousePressed() {
    palette = randomPalette1000();
    for(let i = 0; i < diamonds.length; i++) {
        diamonds[i].color = palette[i%5];
    }
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
