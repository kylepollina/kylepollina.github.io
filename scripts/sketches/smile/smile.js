/* smile.js */

var t;
var n;
var floor;

function setup() {
    var canvas = createCanvas(640, 640);
    canvas.parent('smile-holder');

    t = new Turtle();
    // t.setStroke(color(0, 255, 255));
    t.penDown();
    
    n = 0;

    floor = height * 3/4;
}

function draw() {
    background(0);    

    let offset = -1 * sin(n / 200) * 350;
    let roof = floor + offset;

    stroke(0, 255, 255);
    noFill();

    let l = width * 3/8;
    let r = width * 5/8;

    if(roof < floor) {
        triangle(l, floor, r, floor, width / 2, roof);
    }

    n++;
}
