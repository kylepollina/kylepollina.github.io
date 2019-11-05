/* fullscreen.js */

var grid;
var palette;

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('corners-holder');
    
    palette = getPalette(253);

    grid = new Grid(0, 0, width, height, 5, 5)
}

function draw() {
    background(255, 250, 250); 
    drawTiles();
}

function drawTiles() {
    for(let i = 0; i < grid.tiles.length; i++) {
        let tile = grid.tiles[i];

        for(let x = tile.x; x < tile.x + tile.width; x += tile.width / 3) {
            for(let y = tile.y; y < tile.y + tile.height; y += tile.height / 3) {

                let topLeft  = {"x": x, "y": y};
                let topRight = {"x": x + tile.width / 3, "y": y};
                let botLeft  = {"x": x, "y": y + tile.height / 3};
                let botRight = {"x": x + tile.width / 3, "y": y + tile.height / 3}

                let color = palette[i%5];
                noStroke();
                fill(color);

                if(x < mouseX) {
                    if(y < mouseY) {
                        triangle(topLeft.x, topLeft.y, topRight.x, topRight.y, botLeft.x, botLeft.y);
                    }
                    else {
                        triangle(topLeft.x, topLeft.y, topRight.x, topRight.y, botRight.x, botRight.y);
                    }
                }
                else {
                    if(y < mouseY) {
                        triangle(topLeft.x, topLeft.y, botLeft.x, botLeft.y, botRight.x, botRight.y);
                    }
                    else {
                        triangle(topRight.x, topRight.y, botLeft.x, botLeft.y, botRight.x, botRight.y);
                    }
                }
            }
        }
    }
}

function mouseClicked() {
    palette = randomPalette();
}

