/****************
 ** Holohex.js **
 ***************/

var t;
var unit = 230;
var splits;

var colors;

function setup() {
    var canvas = createCanvas(500,500);    
    canvas.parent("holohex-holder");

    t = new Turtle();

    setupColors();
    randomizeColors();

    strokeWeight(2);
    strokeCap(SQUARE);
}

function draw() {
    background(255, 250, 250);
    splits = floor(mouseX / 10);
    if(splits < 1){
        splits = 1;
    }

    t.moveTo(width/2,height/2);
    t.setHeading(60);

    draw_hexagon();
}

function setupColors() {
    colors = {
        "s1a" : 100,
        "s1b" : -10,
        "s1c" : 255,
        "s1d" : -3,
        "s1e" : -4,
        "s2a" : -7,
        "s2b" : 150,
        "s2c" : -2,
        "s2d" : -8,
        "s3a" : 100,
        "s3b" : -7,
        "s3c" : 200,
        "s3d" : 3,
        "s3e" : 100,
        "s3f" : 8
    }
}

function randomizeColors() {
    let palette = randomPalette100();
    colors.s1a = floor(random(0, 255));
    colors.s1b = floor(random(-10, 10));
    colors.s1c = floor(random(0, 255));
    colors.s1d = floor(random(-10, 10));
    colors.s1e = floor(random(-10, 10));
    colors.s2a = floor(random(-10, 10));
    colors.s2b = floor(random(0, 255));
    colors.s2c = floor(random(-10, 10));
    colors.s2d = floor(random(-10, 10));
    colors.s3a = floor(random(0, 255));
    colors.s3b = floor(random(-10, 10));
    colors.s3c = floor(random(0, 255));
    colors.s3d = floor(random(-10, 10));
    colors.s3e = floor(random(0, 255));
    colors.s3f = floor(random(-10, 10));

    redraw();
}


function draw_hexagon() {
    draw_triangle();
    t.setHeading(t.heading + 60);
    draw_triangle();
    t.setHeading(t.heading + 60);
    draw_triangle();
    t.setHeading(t.heading + 60);
    draw_triangle();
    t.setHeading(t.heading + 60);
    draw_triangle();
    t.setHeading(t.heading + 60);
    draw_triangle();
    t.setHeading(t.heading + 60);
}

function keyPressed() {
    if(keyCode == 32) {
        randomizeColors();
    }
}

function draw_triangle() {
    var side1 = [];
    var side2 = [];
    var side3 = [];

    for(var i = 0; i < splits; i++) {
        t.forward(unit/splits);
        var p = new Point(t.x, t.y);
        side1.push(p);
    } 
    t.setHeading(t.heading + 120);
    for(var i = 0; i < splits; i++) {
        t.forward(unit/splits);
        var p = new Point(t.x, t.y);
        side2.push(p);
    }
    t.setHeading(t.heading + 120);
    for(var i = 0; i < splits; i++) {
        t.forward(unit/splits);
        var p = new Point(t.x, t.y);
        side3.push(p);
    }

    for(var i = 0; i < splits - 1; i++) {
        var p1 = side1[i];
        var p2 = side2[i];
        var p3 = side3[i];

        stroke(colors.s1a + colors.s1b * 2*i, mouseY + colors.s1d * i, 0 + colors.s1e * i);
        line(p1.x,p1.y,p2.x,p2.y);
        stroke(colors.s2a * mouseY, colors.s2c + mouseY/2, colors.s2d * i);
        line(p1.x,p1.y,p3.x,p3.y);
        stroke(colors.s3b * i, colors.s3c*2, mouseY/2 + colors.s3f * i);
        line(p2.x,p2.y,p3.x,p3.y);
    }
}


/* Prevents space from doing default action */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
