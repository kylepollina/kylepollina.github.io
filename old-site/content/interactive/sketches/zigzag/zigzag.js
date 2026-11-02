/***************
 ** Zigzag.js **
 **************/

var t;
var unit = 0;
var running = true;

var start;

function setup() {
    var canvas = createCanvas(700, 700);
    canvas.parent('zigzag-holder');

    start = (height - 400) / 2 + 10;

    t = new Turtle();
    stroke(255);
    strokeWeight(2);
}

function draw() {
    background(0, 102, 153)
    t.moveTo(100, start);

    for(let j = 0; j < 40; j++) {
        for(let i = 0; i < 8; i++) {
            drawLine();
        }
        t.moveTo(100, start + j*10);
    }
    t.moveTo(100, start);
    for(let j = 0; j < 40; j++) {
        for(let i = 0; i < 8; i++) {
            drawLine2();
        }
        t.moveTo(100, start + j*10);
    }

    unit += 0.05;
}

function drawLine() {
    t.forward(unit);
    t.right(30);
    t.forward(unit);
    t.left(30);
}

function drawLine2() {
    t.forward(unit);
    t.left(30);
    t.forward(unit);
    t.right(30);
}


function keyPressed() {
    if(keyCode == UP_ARROW)
        unit = 0;
    if(keyCode == 32 && running == true) {
        noLoop();
        running = false;
    }
    else if(keyCode == 32 && running == false) {
        loop();
        running = true;
    }
    if(keyCode == RIGHT_ARROW && running == false) {
        redraw();
    }
    else if(keyCode == LEFT_ARROW && running == false) {
        unit -= 0.1;
        redraw();
    }
}


/* Prevents space from doing default action */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

