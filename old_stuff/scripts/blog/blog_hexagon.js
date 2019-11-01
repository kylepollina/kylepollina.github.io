/* hexagon.js */

var t;
var unit = 200;
var splits = 20;

function setup() {
    var canvas = createCanvas(500,400);    
    canvas.parent("hexagon-blog-holder");

    t = new Turtle();
    t.move_to(width/2,height/2);

    strokeWeight(1);
    strokeCap(SQUARE);

    noLoop();
}

function draw() {
    background(0);

    draw_hexagon();
}



function draw_hexagon() {
    draw_triangle();
    t.set_heading(t.heading + 60);
    draw_triangle();
    t.set_heading(t.heading + 60);
    draw_triangle();
    t.set_heading(t.heading + 60);
    draw_triangle();
    t.set_heading(t.heading + 60);
    draw_triangle();
    t.set_heading(t.heading + 60);
    draw_triangle();
    t.set_heading(t.heading + 60);
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
    t.set_heading(t.heading + 120);
    for(var i = 0; i < splits; i++) {
        t.forward(unit/splits);
        var p = new Point(t.x, t.y);
        side2.push(p);
    }
    t.set_heading(t.heading + 120);
    for(var i = 0; i < splits; i++) {
        t.forward(unit/splits);
        var p = new Point(t.x, t.y);
        side3.push(p);
    }

    for(var i = 0; i < splits; i++) {
        var p1 = side1[i];
        var p2 = side2[i];
        var p3 = side3[i];

        var q = width/2;

        stroke(q - 10 * i, q - 3 * i, q + 4 * i);
        line(p1.x,p1.y,p2.x,p2.y);
        stroke(q - 7 * i, 150 - 2 * i, q + 8 * i);
        line(p1.x,p1.y,p3.x,p3.y);
        stroke(q + 7 * i, q - 9 * i, 100 + 8 * i);
        line(p2.x,p2.y,p3.x,p3.y);
    }
}

