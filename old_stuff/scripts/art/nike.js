/* test.js */

var src;
var points = [];

function preload() {
    src = loadImage('face.jpg');
}

function setup() {
    var canvas = createCanvas(src.width, src.height);
    canvas.parent('test-holder');

    src.loadPixels();

    for(let i = 0; i < 100; i++) {
        points.push(new Point(width/4, height/4));
    }

}

function draw() {
    if(keyIsPressed && keyCode == 32) {
        let newPoint = new Point(mouseX, mouseY);
        for(let i = points.length - 100; i < points.length; i++) {
            let p = points[i];
            let index = (newPoint.x + newPoint.y * src.width) * 4;
            let r1 = src.pixels[index];
            let g1 = src.pixels[index+1];
            let b1 = src.pixels[index+2];

            index = (p.x + p.y * src.width) * 4;
            let r2 = src.pixels[index];
            let g2 = src.pixels[index+1];
            let b2 = src.pixels[index+2];

            stroke((r1+r2)/2, (g1+g2)/2, (b1+b2)/2);
            line(newPoint.x, newPoint.y, p.x, p.y);
        }
        points.push(newPoint);
    }
}


/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
