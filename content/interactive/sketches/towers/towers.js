/* towers.js */

var input;
var file = "./towers.png";
var blocks = [];
var blockSize = 15;


function preload() {
    input = loadImage(file);
    input.crossOrigin = 'Anonymous';
}

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent("towers-holder");
    frameRate(20);

    // setupBlocks1();
    setupBlocks2();
}

function setupBlocks1() {
    for(let x = 0; x < width; x += blockSize) {
        let column = [];
        for(let y = 0; y < height; y += blockSize) {
            column.push({
                "x": x,
                "y": y,
                "image": createImage(blockSize, blockSize)
            });
        }
        blocks.push(column);
    }
}

function setupBlocks2() {
    for(let y = 0; y < height; y += blockSize) {
        let row = [];
        for(let x = 0; x < width; x += blockSize) {
            row.push({
                "x": x,
                "y": y,
                "image": createImage(blockSize, blockSize)
            });
        }
        blocks.push(row);
    }
}

function draw() {
    // background(0, 100, 200);
    drawBlocks();
}

function drawBlocks() {
    for(let i = 0; i < blocks.length; i++) {
        for(let j = 0; j < blocks[0].length; j++) {
            let block = blocks[i][j];

            let mod = 5 + 1000 / dist(block.x, block.y, mouseX, mouseY);

            block.image.copy(
                input                                                // Copy from input 
                ,block.x   + mod * cos(i - frameCount / 30)           // x coord to copy from input
                ,block.y   + mod * sin(j + frameCount / 30)           // y coord to copy from input
                ,blockSize + mod * sin(frameCount / 100 +i / 10)      // width of rect to copy from input
                ,blockSize + mod * cos(frameCount / 100- j / 10)      // height of rect to copy from input
                ,0                                                   // Copy to (0,0) coordinate of block_img
                ,0
                ,blockSize                                           // Squeeze copied rectangle from input 
                ,blockSize                                           //  to square of blockSize * blockSize
            );
            image(block.image, block.x, block.y);                    // Display new image
        }
    }
}


var nfile = 1;
// Rotate through images
function keyPressed() {
    if(keyCode == 32) {
        let pictures = [
            "data/p1.png", 
            "data/p2.png",
            "data/p3.png",
            "data/p4.png",
            "data/p5.png",
            "data/p6.png",
            "data/p7.png",
            "data/p8.png",
            "data/p9.png"
        ]
        file = pictures[nfile];
        nfile++;
        if(nfile == pictures.length) nfile = 0;
        input = loadImage(file);
    }
}

/* Prevents space from doing default action */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);





