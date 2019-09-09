/****************************
 ** nice_color_palettes.js **
 ***************************/

var defaultCanvasWidth;
var defaultCanvasHeight;
var visiblePalettes;
var savedPalettes;
var palettePage;
var palettePerPage;
var paletteGrid;
var buttons;
var selectedPalettes;
var selectedPalettesGrid;

function setup() {
    setupCanvas();
    setupPalettes();
    setupButtons();
    setupSelectedPalettes();
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

function setupButtons() {
    buttons = [];
    let buttonHeight = 420;

    let prev = new SimpleButton(15, buttonHeight, 40, 30);
    prev.setText("<-");
    prev.execute = function() {
        if(palettePage > 0) palettePage--;
    }

    let next = new SimpleButton(100, buttonHeight, 40, 30);
    next.setText("->");
    next.execute = function() {
        if(palettePage < 9) palettePage++;
    }

    buttons.push(prev);
    buttons.push(next);
}

function setupSelectedPalettes() {
    selectedPalettes = [];

    for(let i = 0; i < 5; i++) {
        selectedPalettes.push(getPalette1000(i));
    }
}

/**********
 ** Draw **
 *********/
function draw() {
    background(250, 250, 255);
    drawOutline();
    drawVisiblePalettes();
    drawButtons();
    drawSelectedPalettes();
    drawCursorBox();
}

function drawVisiblePalettes() {
    let gridXpos = 10;
    let gridYpos = 10;
    let gridWidth = width-20;
    let gridHeight = 400;
    let numRows = 10;
    let numCols = 10;

    paletteGrid = new Grid(gridXpos, gridYpos, gridWidth, gridHeight, numCols, numRows);
    
    let firstPaletteIndex = palettePerPage * palettePage;
    for(let i = 0; i < palettePerPage; i++) {
        let tile = paletteGrid.tiles[i];
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
    let buttonHeight = 420;

    let prev = new SimpleButton(15, buttonHeight, 40, 30);
    prev.setText("<-");
    prev.execute = function() {
        if(palettePage > 0) palettePage--;
    }

    let next = new SimpleButton(100, buttonHeight, 40, 30);
    next.setText("->");
    next.execute = function() {
        if(palettePage < 9) palettePage++;
    }

    prev.show();
    next.show();

    textSize(24);
    text(palettePage + 1, prev.x + prev.width + 10, buttonHeight + 25);
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

function drawSelectedPalettes() {
    let gridYpos = paletteGrid.y + paletteGrid.height + 60;
    selectedPalettesGrid = new Grid(paletteGrid.x, gridYpos, paletteGrid.width, height - gridYpos - 10, 5, 5);

    noStroke();

    for(let i = 0; i < selectedPalettes.length; i++) {
        let palette = selectedPalettes[i];
        
        for(let j = 0; j < palette.length; j++) {
            let tile = selectedPalettesGrid.getTile(i, j);
            
            fill(palette[j]);
            rect(tile.x + 10, tile.y, tile.width - 20, tile.height); 
        }
    }
}

function drawCursorBox() {
    for(let i = 0; i < selectedPalettesGrid.tiles.length; i++) {
        let tile = selectedPalettesGrid.tiles[i];

        if(tile.isMouseInside()) {
            fill(255);
            rect(mouseX, mouseY, 100, 100);
        }
    }
}

/***********
 ** Other **
 **********/

function mouseClicked() {
    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if(button.isMouseOver()) {
            button.execute();
        }
    }
}

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
