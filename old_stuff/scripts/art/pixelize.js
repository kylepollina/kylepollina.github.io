/* test.js */

var src;
var img;
var grid;

function preload() {
    src = loadImage('images/vapor.jpg');
}

function setup() {
    var canvas = createCanvas(700, 700);
    canvas.parent('test-holder');

    grid = new Grid(0, 0, width, height, 20, 20);
    img = createImage(width, height);
    img.copy(src, 0, 0, src.width/6, src.height, 0, 0, width, height);
    img.loadPixels();

    noLoop();
}

function draw() {

    getColorGrid();
    sortColorGrid();
    // rotateGrid();
    // sortColorGrid();
    drawColorGrid();
}

function getColorGrid() {
    for(let i = 0; i < grid.tiles.length; i++) {
        let tile = grid.tiles[i];
        noStroke();
        let color = getAvgColor(img, tile.x, tile.y, tile.x + tile.width, tile.y + tile.height);
        grid.items[i] = color;
    }
}

function rotateGrid() {

    let newGrid = new Grid(0, 0, width, height, 20, 20);

    for(let y = 0; y < grid.nRows; y++) {
        for(let x = 0; x < grid.nCols; x++) {
            let index = y * grid.nCols + x;
            let newX = y;
            let newY = grid.nRows - 1 - x;
            let newIndex = newY * grid.nCols + newX;

            newGrid.items[newIndex] = grid.items[index];
        }
    }

    grid = newGrid;
}


function sortColorGrid() {
    for(let row = 0; row < grid.nRows; row++) {
        let sortStart = row * grid.nCols;
        let sortEnd = row * grid.nCols + grid.nCols;

        for(let i = sortStart; i < sortEnd; i++) {
            let record = -1;
            let selectedPixel = i;

            for(let j = i; j < sortEnd; j++) {
                let color = grid.items[j];
                let b = brightness(color);
                
                if(b > record) {
                    selectedPixel = j;
                    record = b;
                }
            } 

            let temp = grid.items[selectedPixel];
            grid.items[selectedPixel] = grid.items[i];
            grid.items[i] = temp;
        }
    }
}



function drawColorGrid() {
    for(let i = 0; i < grid.tiles.length; i++) {
        let tile = grid.tiles[i];
        fill(grid.items[i]);
        rect(tile.x, tile.y, tile.width, tile.height);
    }
}


