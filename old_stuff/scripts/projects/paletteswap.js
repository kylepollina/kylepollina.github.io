/********************
 ** paletteswap.js **
 *******************/

var allPalettes;
var selectedPalettes;
var buttons = [];

var allPalettesGraphics;
var pageNum = 0;

function setup() {
    var canvas = createCanvas(1200, 700);
    canvas.parent('paletteswap-holder');
    frameRate(20);

    allPalettes = new Grid(0, 0, 800, height, 10, 10);
    selectedPalettes = new Grid(allPalettes.x+allPalettes.width+50, 25, 300, 500, 1, 5);
    allPalettesGraphics = createGraphics(allPalettes.width, allPalettes.height);

    setup_allPalettes();
    setup_selectedPalettes();
    setup_buttons();
}

function draw() {
    background(255);
    strokeWeight(2);
    draw_allPalettes();
    draw_allPalettesCursor();
    draw_selectedPalettes();
    draw_selectedPalettesCursor();
    draw_buttons();
}

/***********
 ** Setup **
 **********/

function setup_allPalettes() {
    for(let i = 0; i < allPalettes.tiles.length; i++) {
        let tile = allPalettes.tiles[i];
        tile.item = p1000.getWithIndex(i + (pageNum * allPalettes.tiles.length));
        let palette = tile.item.palette;

        let w = tile.width/6;
        let h = tile.height * 5/6;

        for(let j = 0; j < 5; j++) {
            allPalettesGraphics.noStroke();
            allPalettesGraphics.fill(palette[j]);
            allPalettesGraphics.rect(tile.x + w*j + 7, tile.y + 6, w, h);
        }
    }
}

function setup_selectedPalettes() {
    selectedPalettes.singleSelect = true;

    for(let i = 0; i < selectedPalettes.tiles.length; i++) {
        let tile = selectedPalettes.tiles[i];
        tile.item = {"palette": p1000.palettes[i], "index": i};
    }
}

function setup_buttons() {
    setup_randomizeButton();
    setup_pageButtons();
}

function setup_pageButtons() {
    let x = buttons[0].x;
    let y = buttons[0].y + buttons[0].height + 10;

    let left = new SimpleButton(x, y, 35, 30);
    left.text = "<=";
    left.execute = function() {
        if(pageNum > 0) {
            pageNum--;
            setup_allPalettes();
        }
    }
    buttons.push(left);

    let right = new SimpleButton(x + 80, y, 35, 30);
    right.text = "=>";
    right.execute = function() {
        if(pageNum < 9) {
            pageNum++;
            setup_allPalettes();
        }
    }
    buttons.push(right);
}

function setup_randomizeButton() {
    let x = allPalettes.x + allPalettes.width + 50;
    let y = selectedPalettes.y + selectedPalettes.height + 25;
    let randomize = new SimpleButton(x, y, 90, 30);
    randomize.text = "Randomize";
    randomize.execute = function() {
        for(let i = 0; i < selectedPalettes.tiles.length; i++) {
            let tile = selectedPalettes.tiles[i];
            tile.item = allPalettes.tiles[floor(random(99))].item;
        }
    }
    buttons.push(randomize);
}

/**********
 ** Draw **
 *********/

function draw_buttons() {
    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.show();
    }

    textSize(19);
    text(pageNum+1, 900, 610);
}

function draw_allPalettes() {
    image(allPalettesGraphics, 0, 0);
}

function draw_allPalettesCursor() {
    for(let i = 0; i < allPalettes.tiles.length; i++) {
        let tile = allPalettes.tiles[i];
        if(tile.isMouseOver()) {
            noFill();
            stroke(0);
            rect(tile.x, tile.y, tile.width, tile.height);
        }
    }
}

function draw_selectedPalettes() {
    let x = allPalettes.x + allPalettes.width + 50;
    for(let i = 0; i < selectedPalettes.tiles.length; i++) {
        let tile = selectedPalettes.tiles[i];
        let palette = tile.item.palette;
        let paletteIndex = tile.item.index;

        for(let j = 0; j < 5; j++) {
            noStroke();
            fill(palette[j]);
            rect(x + j*50, selectedPalettes.y + i*100, 50, 80);
        }

        textSize(32);
        text(paletteIndex, x + 270, selectedPalettes.y + 50 + i*100);
    }
}

function draw_selectedPalettesCursor() {
    for(let i = 0; i < selectedPalettes.tiles.length; i++) {
        let tile = selectedPalettes.tiles[i];
        if(tile.isMouseOver() || tile.isSelected) {
            noFill();
            stroke(0);
            rect(tile.x, tile.y, tile.width, tile.height);
        }
    }
}

/***********
 ** Other **
 **********/

function mouseClicked() {
    if(allPalettes.isMouseOver() && selectedPalettes.hasSelectedTiles()) {
        swapPalettes();
    }
    else if(selectedPalettes.isMouseOver()){
        selectedPalettes.select();
    }

    for(let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if(button.isMouseOver()){
            button.execute();
        }
    }
}

function swapPalettes() {
    let tile = allPalettes.tileUnderMouse();
    selectedPalettes.selectedTiles[0].item = tile.item;
}
