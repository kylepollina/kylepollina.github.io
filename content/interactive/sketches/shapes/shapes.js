/* shapes.js */

var shape;
var shapes = [];
var palette;

function setup() {
    var canvas = createCanvas(640, 640);
    canvas.parent('shapes-holder');

    shape = null;

    palette = randomPalette100();
}

function draw() {
    background(255);   

    if(shape != null) 
        shape.liveShow();

    for(let i = 0; i < shapes.length; i++) {
        shapes[i].show();
    }
}

function mouseClicked() {
    if(shape == null) {
        shape = new Shape(mouseX, mouseY);
    }
    else {
        shape.addPoint(mouseX, mouseY);
        if(shape.isComplete()) {
            shapes.push(shape);
            shape = null;
            console.log("adding shape");
        }
    }
}

class Shape {
    constructor(x1, y1) {
        let numSides = ~~random(3, 5);
        this.points = [];

        if(numSides == 3) {
            this.shape = "TRIANGLE";
            this.numSides = numSides;
            console.log("new triangle");
        }
        else if(numSides == 4) {
            this.shape = "SQUARE";
            this.numSides = numSides;
            console.log("new square");
        }

        for(let i = 0; i < this.numSides; i++) {
            this.points.push({"x": x1, "y": y1})
        }

        this.color = palette[~~random(5)]
    }

    addPoint(x, y) {
        this.points.push({"x": x, "y": y});
    }

    isComplete() {
        if(this.points.length == this.numSides)
            return true;
        else return false;
    }

    show() {
        noStroke();
        fill(this.color);
        beginShape();
        for(let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            vertex(point.x, point.y);
        }
        endShape(CLOSE);
    }
    
    liveShow() {
        noStroke();
        fill(0);
        for(let i = 0; i < this.points.length; i++) {
            let point = this.points[i];
            ellipse(point.x, point.y, 3, 3);
        }
    }
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
