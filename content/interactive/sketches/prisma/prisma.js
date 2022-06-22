/* prisma.js */

var particles = [];
var gradient;
var numParticles;
var speed;

function preload() {
    gradient = loadImage('gradient.png');
}

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('prisma-holder');
    
    gradient.loadPixels();
    numParticles = 30;
    speed = 1;
    setupParticles();
}

function setupParticles() {
    for(let i = 0; i < numParticles; i++) {
        let p = new Particle(random(width), random(height), random(0.1, speed), random(0.1, speed));
        particles.push(p);
    }
}

function draw() {
    updateParticles();
    generateDiagram();
}

function updateParticles() {
    for(let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();
    }
}

function generateDiagram() {
    let points = generatePoints();
    points.push([0,0]);
    points.push([0,height]);
    points.push([width,0]);
    points.push([width,height]);
    let delaunay = Delaunay.from(points);

    for(var polygon of delaunay.trianglePolygons()) {
        /* find avg color of polygon */
        
        let xmin = min([polygon[0][0], polygon[1][0], polygon[2][0]]);
        let ymin = min([polygon[0][1], polygon[1][1], polygon[2][1]]);
        let xmax = max([polygon[0][0], polygon[1][0], polygon[2][0]]);
        let ymax = max([polygon[0][1], polygon[1][1], polygon[2][1]]);

        // console.log("xmin:" + xmin, "xmax:" + xmax, "ymin:" + ymin, "ymax:" + ymax);

        for(let i = 0; i < polygon.length - 1; i++) {
            xmin = min(polygon[i][0], polygon[i+1][0]);
            ymin = min(polygon[i][1], polygon[i+1][1]);
            xmax = max(polygon[i][0], polygon[i+1][0]);
            ymax = max(polygon[i][1], polygon[i+1][1]);
        }

        let color = getAvgColor(gradient, xmin, ymin, xmax, ymax);
        // console.log(red(color),green(color),blue(color));
        fill(color);
        stroke(255);

        /* create polygon */
        beginShape();
        for(let i = 0; i < polygon.length; i++) {
            /* add vertex to shape */
            vertex(polygon[i][0],polygon[i][1]); 
        }
        endShape();

    }


}

function generatePoints() {
    let points = [];
    for(let i = 0; i < particles.length; i++) {
        let p = particles[i];
        points.push([p.x, p.y]);
    }
    return points;
}

class Particle {
    constructor(x, y, xvelocity, yvelocity) {
        this.x = x;
        this.y = y;
        this.xvelocity = xvelocity; 
        this.yvelocity = yvelocity;
    }

    update() {
        this.x += this.xvelocity;
        this.y += this.yvelocity;
        if(this.x >= width) this.x = 0;
        else if(this.y >= height) this.y = 0;
        else if(this.x < 0) this.x = width;
        else if(this.y < 0) this.y = height;
    }

    show() {
        ellipse(this.x, this.y, 5, 5);
    }
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
