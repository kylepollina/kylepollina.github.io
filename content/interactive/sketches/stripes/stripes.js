/****************
 ** Stripes.js **
 ***************/

var s1;
var s2;
var g1;
var g2;
var bggrad;

var col1;
var col2;
var col3;
var col4;
var col5;

var palette;

function setup() {
    var canvas = createCanvas(700, 700);
    canvas.parent('stripes-holder');

    palette = randomPalette100();
    
    col1 = palette[0];
    col2 = palette[1];
    col3 = palette[2];
    col4 = palette[3];
    col5 = palette[4];
    
    s1 = new StripeBox((width-400)/2, (height-600)/2, 300, 500, col1, col2, 45);
    s1.border = 200;
    s2 = new StripeBox((width-400), (height-550), 300, 500, col3, col4, 45);
    s2.border = 200;
    g1 = new StripeGradient((s1.x + s2.x)/2, (s1.y+s2.y)/2, 300, 500, col2, col5, 30);
    bggrad = new StripeGradient(0, 0, width, height, col3, col4, 20);
    
    noLoop();
}

function draw() {
    background(255);
    bggrad.show();
    s1.show();
    g1.show();
    s2.show();
}

function keyReleased() {
    if(keyCode == 32) {
        save();
    }
    if(keyCode == 49) {
        palette = randomPalette1000();
        randomizeColors();
        redraw();
    }
    if(keyCode == 48) {
        randomizeColors();
        redraw();
    }
}

function randomizeColors() {
    col1 = palette[floor(random(palette.length))];
    col2 = palette[floor(random(palette.length))];
    col3 = palette[floor(random(palette.length))];
    col4 = palette[floor(random(palette.length))];
    col5 = palette[floor(random(palette.length))];
    s1.col1 = col1;
    s1.col2 = col2;
    s2.col1 = col3;
    s2.col2 = col4;
    g1.col1 = col2;
    g1.col2 = col5;
    bggrad.col1 = col3;
    bggrad.col2 = col4;
}


