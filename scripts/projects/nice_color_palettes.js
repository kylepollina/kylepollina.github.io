/****************************
 ** nice_color_palettes.js **
 ***************************/
var normalCanvasWidth;
var normalCanvasHeight;
var savedPalettes = [];

function setup() {
    var canvas;
    normalCanvasWidth = 700;
    normalCanvasHeight = 200;
    
    if(windowWidth >= normalCanvasWidth) {
        canvas = createCanvas(normalCanvasWidth, normalCanvasHeight);
    } 
    else {
        canvas = createCanvas(windowWidth - 40, normalCanvasHeight);
    }
    canvas.parent("nice_color_palettes-holder");

    textFont('arial');

    savedPalettes = [randomPalette()];

    noLoop();
}

/**********
 ** Draw **
 *********/
function draw() {
    background(250, 250, 255);
    drawOutline();
    drawSavedPalettes();
}

function drawOutline() {
    stroke(200);
    strokeWeight(2);

    line(1, 1, width-1, 1);
    line(width-1, 1, width-1, height-1);
    line(width-1, height-1, 1, height-1);
    line(1, height-1, 1, 1);

    line(5, 5, width-5, 5);
    line(width-5, 5, width-5, height-5);
    line(width-5, height-5, 5, height-5);
    line(5, height-5, 5, 5);
}

function drawSavedPalettes() {
    let fontSize = 15;
    textSize(fontSize);

    for(let i = 0; i < savedPalettes.length; i++) {
        let palette = savedPalettes[i];
        let colors = palette.colors;
        let paletteWidth = width - 18;
        let paletteHeight = 100;
        let colorWidth = paletteWidth/5;

        let savedPaletteHeight = fontSize + paletteHeight;
        let xpos = 14;
        let ypos = i * (fontSize + paletteHeight) + 20;

        fill(0);
        noStroke();
        text("Palette: " + palette.index, xpos, ypos);

        // let paletteXpos = (width - paletteWidth)/2;
        // let paletteYpos = 20 + i * paletteHeight;

        // fill(0);
        // noStroke();

        // let paletteGrid = new Grid(paletteXpos, paletteYpos + 15, paletteWidth, paletteHeight, palette.colors.length, 1);

        // for(let j = 0; j < palette.colors.length; j++) {
        //     let tile = paletteGrid.tiles[j];
        //     let color = colors[j];

        //     fill(color);
        //     strokeWeight(2);
        //     stroke(color);
        //     rect(tile.x, tile.y, tile.width, tile.height);

        //     noStroke();
        //     fill(0);
        //     text("rgb(" + red(color) + ", " + green(color) + ", " + blue(color) + ")", tile.x, tile.y + tile.height, tile.width, 15); 
        // }


    }
}

/***********
 ** Other **
 **********/

function randomPalette() {
    let index = ~~random(1000);
    return {colors: getPalette1000(index), index: index}
}

function windowResized() {
    let oldCanvasWidth = width;

    if(windowWidth >= normalCanvasWidth && oldCanvasWidth < normalCanvasWidth) {
        resizeCanvas(normalCanvasWidth, normalCanvasHeight);
    } 
    else if(windowWidth <= normalCanvasWidth) {
        resizeCanvas(windowWidth - 40, normalCanvasHeight);
    }
}
