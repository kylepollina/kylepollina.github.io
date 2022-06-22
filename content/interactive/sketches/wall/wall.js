/* wall.js */

var palettes = [];

function setup() {
    var canvas = createCanvas(640, 640, WEBGL);
    canvas.parent('wall-holder');

    for(let i = 0; i < 5; i++) {
        palettes.push(randomPalette1000());
    }

    ortho();
    // noLoop();
}

function draw() {
    // camera(0, 0, 0, 0, 0, 0, 0, 1, 0);
    background(255);
    // rotateX(radians(mouseX));
    // rotateY(radians(mouseY));
    rotateX(radians(frameCount/2));
    rotateY(radians(frameCount/2))


    // translate(-400, 0, 0);

    // noStroke();
    stroke(255);
    fill(0);
    box(100, 100);
    // for(let i = 0; i < 10; i++) {
    //     for( let j = 0; j < 10; j++) {
    //         push();

    //         translate(100 * i, 100 * j, 0);
    //         fillRandom();
    //         plane(100, 100); 

    //         pop();
    //     }
    // }

}

function fillRandom() {
    fill(palettes[~~random(5)][~~random(5)]);
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
