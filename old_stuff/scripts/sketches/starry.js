/* starry.js */

var starry;
var phyllotaxis;

/* load image */
function preload() {
    starry = loadImage("data/starry.png");
}

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent("starry-holder");

    phyllotaxis = new Phyllotaxis(5000);
    phyllotaxis.setMouseControls();

    starry.loadPixels();

    noStroke();
    noLoop();
}

function mouseMoved() {
    redraw();
}

function draw() {
    background(255);
    let points = phyllotaxis.generatePoints();
    let radius = 10;

    for(let i = 0; i < points.length; i++) {
        let point = points[i];

        /* only draw visible circles */
        if(0 < point.x - radius && point.x + radius < width && 0 < point.y - radius && point.y + radius < height) {
            let color = getAvgColor(starry, point.x - radius, point.y - radius, point.x + radius, point.y + radius);  
            fill(color);
            ellipse(point.x, point.y, radius);
        }
    }
}
