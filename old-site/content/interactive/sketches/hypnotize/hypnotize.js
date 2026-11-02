/******************
 ** Hypnotize.js **
 *****************/

var spiral = [];   // Array of spiral centers
var worm = [];      // Array of worm centers
var step = 20;      // Change in circle radii
var speed = 2;      // Speed of rotation
var n = 0;          // use for sin/cos
var bg = 0;
var showing = "worm"

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent("hypnotize-holder");
    
    for(let i = 0; i < 40 && 400-step*i > 0; i++) {
        spiral.push(new Point(width/2, height/2));
        worm.push(new Point(width / 2, height/2));
    }

    noStroke();
}

function draw() {
    if(bg == 0) {
        background(250,250,255);
    }
    else if(bg == 1) {
        background(250,250,255);
        fill(5,5,0);
        rect(0,0,width/2,height);
    }
    else if(bg == 2) {
        background(5,5,0);
        fill(250,250,255);
        rect(0,0,width/2,height);
    }
    else if(bg == 3) {
        background(5, 5, 0);
    }

    hypnotize();
    n++;
}

function keyPressed() {
    if(keyCode == 32) {
        bg++;
        bg = bg % 4;
    }
    if (keyCode == 39 || keyCode == 37) {
        if (showing == "spiral") {
            showing = "worm";
        }
        else if (showing == "worm") {
            showing = "spiral";
        }
    }
}

function hypnotize() {
    for(let i = 1; i < spiral.length-1; i++) {
        // Get center coordiantes of parent circle
        var parentSpiral = spiral[i-1];
        var parentWorm = worm[i-1];

        if(i%2 == 0) var sign = 1;
        else var sign = -1;

        // Set current circle center to coordinate of parent circle + offset
        let xSpiral = parentSpiral.x + 20*cos(i/speed*n/100)*sign;
        let ySpiral = parentSpiral.y + 20*sin(i/speed*n/100)*sign;
        let xWorm   = parentWorm.x;
        let yWorm   = parentWorm.y + 20*sin(i/speed*n/100)*sign;
        
        spiral[i] = new Point(xSpiral, ySpiral);
        worm[i] = new Point(xWorm, yWorm);
        let rad = 400 - step*i;

        if(bg == 0 || bg == 2) {
            if(i%2 == 0) fill(5,5,0);
            else fill(250,250,255);
        }
        else if(bg == 1 || bg == 3) {
            if(i%2 == 0) fill(250, 250, 255);
            else fill(5,5,0);
        }

        if (showing == "spiral") ellipse(xSpiral, ySpiral, rad);

        if(bg == 0 || bg == 1) {
            if(i%2 == 0) fill(5,5,0);
            else fill(250,250,255);
        }
        else if(bg == 2 || bg == 3) {
            if(i%2 == 0) fill(250, 250, 255);
            else fill(5,5,0);
        }

        if (showing == "worm") ellipse(xWorm, ySpiral, rad);
    }
}
