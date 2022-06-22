/* brush.js */

var palette;
var phyllotaxis;
var points;

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('brush-holder');

    palette = randomPalette();
    phyllotaxis = new Phyllotaxis(1000);

    noStroke();
}

function draw() {
    points = phyllotaxis.generatePoints();
    for(let i = 0; i < points.length; i++) {
        let p = points[i];

        let x = p.x;
        let y = p.y;

        fill(palette[i % 5]);
        ellipse(x, y, i / (mouseX / 10 + 1));
    }
    phyllotaxis.numPoints = 1000 - (width - mouseX)
}


