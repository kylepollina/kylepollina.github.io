/* niceColorPalettes.js */

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
    defaultCanvasWidth = 800;
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

        this.randomizeButton = new SimpleButton(150, this.y, 100, 30);
        this.randomizeButton.setText("Randomize");
        this.randomizeButton.execute = function() {
            savedPalettes.randomize();
        }
    }

    show() {
        this.prevButton.show();
        this.nextButton.show();
        this.randomizeButton.show();
        
        textSize(24);
        fill(0);
        text(visiblePalettes.currentPage, 70, this.y + 20);
    }

    mouseClicked() {
        if(this.prevButton.isMouseInside()) {
           this.prevButton.execute();
        }
        else if(this.nextButton.isMouseInside()) {
            this.nextButton.execute();
        }
        else if(this.randomizeButton.isMouseInside()) {
            this.randomizeButton.execute();
        }
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
            this.grid.tiles[i].setItem({index: i, palette: getPalette1000(i)});
        }
    }

    resize() {
        this.grid.resize(this.grid.x, this.grid.y, width - 2 * this.grid.x, this.grid.height);
    }

    show() {
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];
            let palette = tile.item.palette;
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

            if(tile.isMouseInside() || tile.isSelected) {
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
                let index = this.currentPage * this.palettesPerPage + i;
                this.grid.tiles[i].setItem({index: index, palette: getPalette1000(index)});
            }

            this.grid.clearSelectedTiles();
        }
    }

    nextPage() {
        if(this.currentPage < this.numPages - 1) {
            this.currentPage++;

            for(let i = 0; i < this.grid.tiles.length; i++) {
                let index = this.currentPage * this.palettesPerPage + i;
                this.grid.tiles[i].setItem({index: index, palette: getPalette1000(index)});
            }

            this.grid.clearSelectedTiles();
        }
    }

    mouseClicked() {
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];
            if(tile.isMouseInside()) {
                this.grid.clearSelectedTiles();
                tile.toggleSelect();

                if(savedPalettes.grid.hasSelectedTiles()) {
                    savedPalettes.swap(tile);
                }
            }
        }
    }
}

class SavedPalettes {
    constructor() {
        this.palettes = [];

        let gridXpos = visiblePalettes.grid.x;
        let gridYpos = visiblePalettes.grid.y + visiblePalettes.grid.height + 100;
        let gridWidth = width - 2 * gridXpos;
        let gridHeight = height - gridYpos - 10;
        this.grid = new Grid(gridXpos, gridYpos, gridWidth, gridHeight, 5, 1);
        this.grid.setSingleSelect(true);

        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];
            let paletteGrid = new Grid(tile.x, tile.y, tile.width/2, tile.height, 1, 5);
            this.grid.tiles[i].setItem(paletteGrid);
        }

        for(let i = 0; i < 5; i++) {
            this.palettes.push({index: i, palette: getPalette1000(i)});
        }
    }

    resize() {
        this.grid.resize(this.grid.x, this.grid.y, width - 2 * this.grid.x, this.grid.height);
        
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let parentTile = this.grid.tiles[i];
            this.grid.tiles[i].item.resize(parentTile.x, parentTile.y, parentTile.width / 2, parentTile.height);
        }

    }

    show() {
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];
            let paletteGrid = tile.item;
            let palette = this.palettes[i].palette;
            let paletteIndex = this.palettes[i].index;

            for(let j = 0; j < paletteGrid.tiles.length; j++) {
                let colorTile =  paletteGrid.tiles[j];
                let color = palette[j];

                fill(color);
                stroke(color);
                strokeWeight(2);
                rect(colorTile.x, colorTile.y, colorTile.width, colorTile.height);

                noStroke();
                textSize(14);
                fill(0);
                text(color, colorTile.x + colorTile.width + 5, colorTile.y + 16, tile.width/2, 100);
                let rgb = "rgb(" + red(color) + ", " + green(color) + ", " + blue(color) + ")";
                text(rgb, colorTile.x + colorTile.width + 5, colorTile.y + 32, tile.width/2, 100);
            }

            noStroke();
            textSize(20);
            fill(0);
            text("Palette: " + paletteIndex, paletteGrid.x, paletteGrid.y - 15);

            if(paletteGrid.isMouseInside() || tile.isSelected) {
                noFill();
                stroke(0);
                strokeWeight(2);
                rect(paletteGrid.x, paletteGrid.y, paletteGrid.width * 2 - 4, paletteGrid.height);
            }
        }
    }

    swap(tile) {
        if(this.grid.hasSelectedTiles() == false) return -1;

        for(let i = 0; i < this.grid.tiles.length; i++) {
            if(this.grid.tiles[i].isSelected) {
                this.palettes[i] = tile.item;
            }
        }
    }

    randomize() {
        let chosenIndices = [];
        
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let newIndex = ~~random(0, 1000);

            if(chosenIndices.includes(newIndex) == false) {
                chosenIndices.push(newIndex);
                this.palettes[i] = {index: newIndex, palette: getPalette1000(newIndex)};
            }
        }
    }

    mouseClicked() {
        for(let i = 0; i < this.grid.tiles.length; i++) {
            let tile = this.grid.tiles[i];

            if(visiblePalettes.grid.hasSelectedTiles()) {
                this.swap(visiblePalettes.grid.getSelectedTiles());
            }

            if(tile.isMouseInside() && tile.isSelected == false) {
                this.grid.clearSelectedTiles();
                tile.toggleSelect();
            }

            else if(tile.isMouseInside() && tile.isSelected == true) {
                this.grid.clearSelectedTiles();
            }
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
    drawMouseCursor();
}


function drawMouseCursor() {
    for(let i = 0; i < visiblePalettes.grid.tiles.length; i++) {
        let tile = visiblePalettes.grid.tiles[i];
        if(tile.isMouseInside()) {
            strokeWeight(1);
            stroke(0);
            fill(255,255,255,230);
            rect(mouseX + 20, mouseY + 5, 38, 30);

            noStroke();
            fill(0);
            textSize(14);
            text(tile.item.index, mouseX + 25, mouseY + 25)
        }
    }
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

function mouseClicked() {
    visiblePalettes.mouseClicked();
    buttonToolbar.mouseClicked();
    savedPalettes.mouseClicked();
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
