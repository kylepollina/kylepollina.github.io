
/**************************
 ** Breathing.js         **
 ** Author: Kyle Pollina **
 *************************/


var main_img;
var image_name = "data/p1.png";
var img_blocks = [];
var block_size = 25;

function preload() {
    main_img = loadImage(image_name);
}

function setup() {
    var canvas = createCanvas(500,500);
    canvas.parent("breathing-holder");
    frameRate(20);

    /* Create an array width/block_size * height/block_size
    Save each x,y coordinate with a PImage of block_size into the array */
    for(let x = 0; x < width; x += block_size) {
        let rows = [];
        for(let y = 0; y < height; y += block_size) {
            // Save each x,y coordinate as well as a PImage
            rows.push([x, y, createImage(block_size,block_size)]);
        }
        img_blocks.push(rows);
    }
}

var n = 0;          // use for the sin/cos functions

function draw() {
    background(250,250,255);

    for(let i = 0; i < img_blocks.length; i++) {
        for(let j = 0; j < img_blocks[0].length; j++) {
            let block = img_blocks[i][j];
            let block_x = block[0];         // Top left x of the block
            let block_y = block[1];         // Top left y of the block
            let block_img = block[2];       // PImage of the block

            block_img.copy(
                main_img                            // Copy from main_img 
                ,block_x + 10*cos(i-n/30)           // x coord to copy from main_img
                ,block_y + 10*sin(j+n/30)           // y coord to copy from main_img
                ,block_size + 10*sin(n/100+i/10)    // width of rect to copy from main_img
                ,block_size + 10*cos(n/100-j/10)    // height of rect to copy from main_img
                ,0                                  // Copy to (0,0) coordinate of block_img
                ,0
                ,block_size                         // Squeeze copied rectangle from main_img 
                ,block_size                         //  to square of block_size * block_size
            );
            image(block_img, block_x, block_y);     // Display new image
        }
    }
    n++;
}


var pic_num = 1;
// Rotate through images
function keyPressed() {
    if(keyCode == 32) {
        let pictures = ["data/p1.png", "data/p2.png","data/p3.png","data/p4.png","data/p5.png","data/p6.png","data/p7.png","data/p8.png","data/p9.png",]
        image_name = pictures[pic_num];
        pic_num++;
        if(pic_num == pictures.length) pic_num = 0;
        main_img = loadImage(image_name);
        n = 0;
    }
}


/* Prevents space from doing default action */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
