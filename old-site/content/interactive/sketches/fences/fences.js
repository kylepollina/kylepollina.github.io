/* test.js */

var fencelength;
var boxlength;

function setup() {
    var canvas = createCanvas(500, 500, WEBGL);
    canvas.parent('fences-holder');

    boxlength = 20;

    strokeWeight(3);
    // ortho();

    angleMode(DEGREES);
}

function draw() {
    background(0);
    rotateX(-40);

    for(fencelength = 3; fencelength < 20; fencelength += 8) {
        push();
        translate(-boxlength/2*fencelength, 0, -boxlength/2*fencelength);
        for(let i = 0; i <= fencelength; i++) {
            for(let j = 0; j <= fencelength; j++) {
                push();
                
                if(i == 0 || i == fencelength || j == 0 || j == fencelength) {
                    translate(boxlength*i, 0, boxlength*j);

                    boxheight = 10*boxlength + sin(i*30 + j*30 + fencelength*10 + frameCount*2)*100;
                    normalMaterial();
                    box(boxlength, boxheight, boxlength);
                }

                pop();
            }
        }
        pop();
    }
    
}

/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
