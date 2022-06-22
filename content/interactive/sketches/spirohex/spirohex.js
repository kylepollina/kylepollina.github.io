/* spirohex.js */

var palette;
var mixed;
var t;
var offset;
var numSides;
var camera;

function setup() {
    var canvas = createCanvas(600,600);    
    canvas.parent("spirohex-holder");

    offset = 0;
    numSides = 7;
    camera = {"x": 0, "y": 0};

    palette = randomPalette();
    // mixed = mixedPaletteSizeN(2 * numSides + 1);
    mixed = mixedPaletteSizeN(2 * numSides);
    t = new Turtle();
    t.penUp();

    // noLoop();
}

function draw() {
    translate(camera.x, camera.y);
    background(mixed[2]);
    // background(255);
    drawTriangle();
    // drawHex();
}

function drawTriangle() {
    t.setHeading(0);
    t.right(60);
    t.moveTo(width/2, 0);
    drawSpiro();
    drawColors();
    t.clearStack();
}

function drawHex() {
    for(let i = 0; i < 6; i++) {
        t.setHeading(0);
        t.right(60*i);
        t.moveTo(width/2, height/2);
        drawSpiro();
        drawColors();
        t.clearStack();
    }
}

function drawSpiro() {
    strokeWeight(1);
    let len = 1500 / numSides;
    let angle = (360 / numSides) + 1;
    // let level = cos(frameCount / 150) * 6 + 5;
    let level = mouseX / 20;

    t.forward(len);

    for(var i = 0; i < len; i++) {
        t.setHeading(t.heading + angle);
        let mov = len -  (level * (i+1));
        if(mov > 0) {
            t.forward(mov);
            t.push();
        }
    }
}

function drawColors() {
    // offset = ~~(frameCount / 5);
    for(let i = 0; i < t.stack.length - 2; i++) {
        let state1 = t.stack[i];
        let state2 = t.stack[i + 1];
        let state3 = t.stack[i + 2];

        noStroke();
        fill(mixed[(i + numSides * offset) % mixed.length]);
        triangle(state1.x, state1.y, state2.x, state2.y, state3.x, state3.y);
    }
}

function keyPressed() {
    if(keyCode == 32) {
        palette = randomPalette();
        // mixed = mixedPaletteSizeN(2 * numSides + 1);
        mixed = mixedPaletteSizeN(2 * numSides);
        redraw();
    }

    if(keyCode == 48) {
        offset++;
        redraw();
    }

    if(keyCode === RIGHT_ARROW) {
        camera.x += 10;
    }
    if(keyCode === UP_ARROW) {
        camera.y -= 10;
    }
    if(keyCode === LEFT_ARROW) {
        camera.x -= 10;
    }
    if(keyCode === DOWN_ARROW) {
        camera.y += 10;
    }
}

function mouseMoved() {
    // redraw();
}
