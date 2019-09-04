/****************************
 ** nice_color_palettes.js **
 ***************************/

var defaultCanvasWidth;
var defaultCanvasHeight;
var visiblePalettes;
var savedPalettes;
var palettePage;
var palettePerPage;
var grid;

function setup() {
    setupCanvas();
    setupPalettes();
    // frameRate(20);
    // noLoop();
}

function setupCanvas() {
    defaultCanvasWidth = 1400;
    defaultCanvasHeight = 1200;
    var canvas;
    if(windowWidth >= defaultCanvasWidth) {
        canvas = createCanvas(defaultCanvasWidth, defaultCanvasHeight);
    } 
    else {
        canvas = createCanvas(windowWidth - 40, defaultCanvasHeight);
    }
    canvas.parent("nice_color_palettes-holder");
}

function setupPalettes() {
    savedPalettes = [];
    palettePage = 0;
    palettePerPage = 100;
}

/**********
 ** Draw **
 *********/
function draw() {
    background(250, 250, 255);
    drawOutline();
    drawVisiblePalettes();
    drawButtons();
}

function drawVisiblePalettes() {
    let gridXpos = 10;
    let gridYpos = 10;
    let gridWidth = width-20;
    let gridHeight = 400;
    let numRows = 10;
    let numCols = 10;

    grid = new Grid(gridXpos, gridYpos, gridWidth, gridHeight, numCols, numRows);
    
    let firstPaletteIndex = palettePerPage * palettePage;
    for(let i = 0; i < palettePerPage; i++) {
        let tile = grid.tiles[i];
        let index = firstPaletteIndex + i;
        let palette = getPalette1000(index);
        let padding = 4;
        let paletteX = tile.x + padding;
        let paletteY = tile.y + padding;
        let paletteWidth = tile.width - 2*padding;
        let paletteHeight = tile.height - 2*padding;

        for(let j = 0; j < palette.length; j++) {
            let color = palette[j];
            let colorWidth = paletteWidth / palette.length;
            let colorHeight = paletteHeight;
            let colorX = paletteX + j * colorWidth;
            let colorY = paletteY;

            noStroke();
            fill(color);
            stroke(color);
            rect(colorX, colorY, colorWidth, colorHeight);

        }

        if(tile.isMouseInside()) {
            strokeWeight(2);
            stroke(0);
            noFill();
            rect(tile.x, tile.y, tile.width, tile.height);
        }
    }
}

function drawButtons() {
    // button = createButton('submit');
    // button.position(grid.x, grid.y + grid.height);
    // button.mousePressed(greet);

    let canvasX = (windowWidth - width) / 2 - 5;
    let pageDown = createButton('<-');
    pageDown.position(canvasX + grid.x, grid.y + grid.height);
    pageDown.parent("nice_color_palettes");
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


/***********
 ** Other **
 **********/

function randomPalette() {
    let index = ~~random(1000);
    return {colors: getPalette1000(index), index: index}
}

function windowResized() {
    let oldCanvasWidth = width;

    if(windowWidth >= defaultCanvasWidth && oldCanvasWidth < defaultCanvasWidth) {
        resizeCanvas(defaultCanvasWidth, defaultCanvasHeight);
    } 
    else if(windowWidth <= defaultCanvasWidth) {
        resizeCanvas(windowWidth - 40, defaultCanvasHeight);
    }
}
