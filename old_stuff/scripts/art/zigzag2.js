/****************
 ** Zigzag2.js **
 ***************/

var turtle;
var unit = 300;

function setup() {
    var canvas = createCanvas(700, 700);
    canvas.parent('test-holder');
    gifCanvas = canvas.canvas;

    turtle = new Turtle();
    stroke(255);
    strokeWeight(2);

    noLoop();
}


function draw() {
    background(0, 102, 153)
    turtle.moveTo((width-unit)/2, 100);
    turtle.push();

    drawHexagon();
    drawOutline();
}

function drawOutline() {
    noFill();
    let len = width - 10;
    rect(5, 5, len, len);
    len -= 10;
    rect(10, 10, len, len);
    len -= 10;
    rect(15, 15, len, len);
    len -= 10;
    rect(20, 20, len, len);

    for(let i = 0; i < 33; i++) {
        fill(255);
        stroke(0, 102, 153);
        rect(25 + i*20, 25, 10, 10);
    }
    for(let i = 0; i < 33; i++) {
        fill(255);
        stroke(0, 102, 153);
        rect(25 + i*20, height-35, 10, 10);
    }

    for(let i = 0; i < 33; i++) {
        fill(255);
        stroke(0, 102, 153);
        rect(25, 25 + i*20, 10, 10);
    }
    for(let i = 0; i < 33; i++) {
        fill(255);
        stroke(0, 102, 153);
        rect(width-35, 25 + i*20, 10, 10);
    }

}



function drawHexagon() {
    drawTriangle();
    drawTriangle();
    drawTriangle();
    drawTriangle();
    drawTriangle();
    drawTriangle();
}


function drawTriangle() {
    while(unit > 10) {
        turtle.forward(unit); 
        turtle.right(120);
        unit -= 10;
        turtle.forward(unit);
        turtle.right(120);
        unit -= 10;
        turtle.forward(unit);
        turtle.right(120);
        unit -= 10;
    }

    unit = 300;
    turtle.pop();
    turtle.penUp();
    turtle.forward(unit);
    // turtle.forward(5);
    turtle.right(60);
    // turtle.forward(5);
    turtle.penDown();
    turtle.push();
}



function keyPressed() {
    if(keyCode == UP_ARROW)
        save('test.png');
}


/* Prevents space from doing default action */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

