/*************
 ** Gogh.js **
 ************/

var phyllotaxis;

/* load image */
function preload() {
    img = loadImage("data/gogh.png");
}

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent("gogh-holder");
    img.loadPixels();

    phyllotaxis = new Phyllotaxis(5000);
    phyllotaxis.setMouseControls();
    phyllotaxis.constant = 14;
    phyllotaxis.ymin = 50;
    
    noLoop();
}

function mouseMoved() {
    redraw();
}

function draw() {
    let points = phyllotaxis.generatePointsArray();

    let delaunay = Delaunay.from(points);
    let voronoi = delaunay.voronoi([0, 0, width-1, height-1]);
    
    /* iterate through each cell from iterable voronoi.cellPolygons() */
    for(var polygon of voronoi.cellPolygons()) {
        /* find avg color of polygon */
        let min_x = min(polygon[0][0],polygon[1][0]);
        let min_y = min(polygon[0][1],polygon[1][1]);
        let max_x = max(polygon[0][0],polygon[1][0]);
        let max_y = max(polygon[0][1],polygon[1][1]);

        for(let i = 1; i < polygon.length - 1; i++) {
            min_x = min(polygon[i][0],polygon[i+1][0]);
            min_y = min(polygon[i][1],polygon[i+1][1]);
            max_x = max(polygon[i][0],polygon[i+1][0]);
            max_y = max(polygon[i][1],polygon[i+1][1]);
        }
        let color = getAvgColor(img, min_x, min_y, max_x, max_y);
        fill(color);
        stroke(color);

        /* create polygon */
        beginShape();
        for(let i = 0; i < polygon.length; i++) {
            /* add vertex to shape */
            vertex(polygon[i][0],polygon[i][1]); 
        }
        endShape();
    }
}

