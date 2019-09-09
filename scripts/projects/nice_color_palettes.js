/****************************
 ** nice_color_palettes.js **
 ***************************/

var defaultCanvasWidth;
var defaultCanvasHeight;

var visiblePalettes;
var savedPalettes;
var buttonToolbar;

function setup() {
    setupCanvas();
    setupPalettes();
    setupButtonToolbar();
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
    visiblePalettes = new PaletteBrowser();
    savedPalettes = new SavedPalettes();
}

function setupButtonToolbar() {
    buttonToolbar = new ButtonToolbar();
}

class ButtonToolbar {
    constructor() {
        this.y = visiblePalettes.grid.y + visiblePalettes.grid.height + 20;
        this.prevButton = new SimpleButton(15, this.y, 40, 30);
        this.prevButton.setText("<-");
        this.prevButton.execute = function() {
            visiblePalettes.prevPage();
        };

        this.nextButton = new SimpleButton(100, this.y, 40, 30);
        this.nextButton.setText("->");
        this.nextButton.execute = function() {
            visiblePalettes.nextPage();
        };
    }

    show() {
        this.prevButton.show();
        this.nextButton.show();
        
        textSize(24);
        fill(0);
        text(visiblePalettes.currentPage, 70, this.y + 20);
    }
}

class PaletteBrowser {
    constructor() {
        this.currentPage = 0;
        this.palettesPerPage = 100;
        this.numPages = 10;

        let gridXpos = 10;
        let gridYpos = 10;
        let gridWidth = width - 2 * gridXpos;
        let gridHeight = 400;
        let numCols = 10;
        let numRows = 10;
        this.grid = new Grid(gridXpos, gridYpos, gridWidth, gridHeight, numCols, numRows);

        for(let i = 0; i < this.grid.tiles.length; i++) {
            this.grid.tiles[i].setItem(getPalette1000(i));
        }
    }

    resize() {
        this.grid.resize(this.grid.x, this.grid.y, width - 2 * this.grid.x, this.grid.height);
    }

    show() {
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];
            let palette = tile.item;
            let margin = 5;
            let paletteXpos = tile.x + margin;
            let paletteYpos = tile.y + margin;
            let paletteWidth = tile.width - 2 * margin;
            let paletteHeight = tile.height - 2 * margin;
            let colorWidth = paletteWidth / 5;
            let colorHeight = paletteHeight;
            
            for(let j = 0; j < palette.length; j++) {
                let color = palette[j];
                fill(color);
                stroke(color);
                rect(paletteXpos + j * colorWidth, paletteYpos, colorWidth, colorHeight);
            }

            if(tile.isMouseInside()) {
                noFill();
                stroke(0);
                strokeWeight(2);
                rect(tile.x, tile.y, tile.width, tile.height);
            }
        }
    }

    prevPage() {
        if(this.currentPage > 0) {
            this.currentPage--;

            for(let i = 0; i < this.grid.tiles.length; i++) {
                this.grid.tiles[i].setItem(getPalette1000(this.currentPage * this.palettesPerPage + i));
            }
        }
    }

    nextPage() {
        if(this.currentPage < this.numPages - 1) {
            this.currentPage++;

            for(let i = 0; i < this.grid.tiles.length; i++) {
                this.grid.tiles[i].setItem(getPalette1000(this.currentPage * this.palettesPerPage + i));
            }
        }
    }
}

class SavedPalettes {
    constructor() {
        let gridXpos = visiblePalettes.grid.x;
        let gridYpos = visiblePalettes.grid.y + visiblePalettes.grid.height + 80;
        let gridWidth = width - 2 * gridXpos;
        let gridHeight = height - gridYpos - 10;
        this.grid = new Grid(gridXpos, gridYpos, gridWidth, gridHeight, 5, 1);

        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];
            let paletteGrid = new Grid(tile.x, tile.y, tile.width/2, tile.height, 1, 5);
            this.grid.tiles[i].setItem(paletteGrid);
        }
    }

    resize() {
        this.grid.resize(this.grid.x, this.grid.y, width - 2 * this.grid.x, this.grid.height);
        
        for(let i = 0; i < this.grid.tiles.length; i++) {
            this.grid.tiles[i].item.resize(this.grid.tiles[i].x, this.grid.tiles[i].y, this.grid.tiles[i].width/2, this.grid.tiles[i].height);
        }
    }

    show() {
        this.grid.show();

        for(let i = 0; i < this.grid.tiles.length; i++) {
            let paletteGrid = this.grid.tiles[i].item;
            paletteGrid.show();
        }
    }
}


/**********
 ** Draw **
 *********/
function draw() {
    background(250, 250, 255);
    drawOutline();
    visiblePalettes.show();
    buttonToolbar.show();
    savedPalettes.show();
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

// function drawSelectedPalettes() {
//     let gridYpos = paletteGrid.y + paletteGrid.height + 60;
//     selectedPalettesGrid = new Grid(paletteGrid.x, gridYpos, paletteGrid.width, height - gridYpos - 10, 5, 5);
//     noStroke();
//     for(let i = 0; i < selectedPalettes.length; i++) {
//         let palette = selectedPalettes[i];
//         for(let j = 0; j < palette.length; j++) {
//             let tile = selectedPalettesGrid.getTile(i, j);
//             fill(palette[j]);
//             rect(tile.x + 10, tile.y, tile.width - 20, tile.height); 
//         }
//     }
// }

// function drawCursorBox() {
//     for(let i = 0; i < selectedPalettesGrid.tiles.length; i++) {
//         let tile = selectedPalettesGrid.tiles[i];
//         if(tile.isMouseInside()) {
//             fill(255);
//             rect(mouseX, mouseY, 100, 100);
//         }
//     }
// }

/***********
 ** Other **
 **********/

function mouseClicked() {
    if(buttonToolbar.prevButton.isMouseInside()) {
        buttonToolbar.prevButton.execute();
    }
    else if(buttonToolbar.nextButton.isMouseInside()) {
        buttonToolbar.nextButton.execute();
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
        visiblePalettes.resize();
        savedPalettes.resize();
    } 
    else if(windowWidth <= defaultCanvasWidth) {
        resizeCanvas(windowWidth - 40, defaultCanvasHeight);
        visiblePalettes.resize();
        savedPalettes.resize();
    }
}
