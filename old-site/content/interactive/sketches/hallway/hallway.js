/**************************
 ** Flashes.js           **
 ** Author: Kyle Pollina **
 *************************/

var size = 500;
var n_box;
var spacer = 20;         // Spacer between boxes
var flashes = [];        // Flash event list storing which box is flashing i.e. box 0 through n_box
var brightness = [];     // Array to store each box brightness

function setup() {
    var canvas = createCanvas(size,size);
    canvas.parent('hallway-holder');
    frameRate(30);

    // Determine max amount of boxes that can fit in canvas
    let box_len;
    n_box = 0;
    do {
        box_len = size-1 - spacer*n_box;
        n_box++;
    } while(box_len > 0);
    n_box--;

    // Setup brightness array    
    for(let i = 0; i < n_box; i++) {
        brightness[i] = 0;
    }

    fill(0,0,0,0);
    stroke(250, 250, 255);
}

function draw() {
    background(250, 250, 255);

    for(let i = 0; i < n_box; i++) {
        let box_len = size-1 - spacer*i;

        // Set stroke to brightness of box i
        stroke(250 - brightness[i], 250 - brightness[i], 255 - brightness[i]);
        rect(i*mouseX/n_box, i*mouseY/n_box, box_len, box_len);

        // Decrease brightness of box i until brightness == 0
        if(brightness[i] > 0)
            brightness[i] -= 255/10;
    }

    // Loop through flash events
    for(let i = 0; i < flashes.length; i++) {
        let x = flashes[i];
        brightness[x] = 255;
        flashes[i]++;           // Set to flash next box

        // If flash reached every box, remove flash event
        if(flashes[i] >= n_box) {
            flashes.shift();        
        }
    }

    // Automatically flash every 40 frames
    if(frameCount % 40 == 0) 
        flashes.push(0);
}

// Add flash
function mouseClicked() {
    flashes.push(0);
}

