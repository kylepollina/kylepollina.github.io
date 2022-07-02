/* perlin.js */

var grid;
var paused;

function setup() {
    var canvas = createCanvas(640, 640);
    canvas.parent('perlin-holder');

    paused = false;

    let outerGrid = new Grid(0, 0, width, height, 5, 5);
    grid = outerGrid.innerGrid(10, 10);

    noFill();
    stroke(0);
    strokeWeight(1);

    noLoop();
}

function draw() {
    background(255);
    for(let i = 0; i < grid.nCols; i++) {
        for(let j = 0; j < grid.nRows; j++) {
            // let angle = map(noise(i + frameCount / 50, j), 0, 1, 0, TWO_PI);
            let tile = grid.getTile(i, j);

            let x = tile.x;
            let y = tile.y;

            beginShape();
            while(grid.x < x && x < grid.x + grid.width) {
                while(grid.y < y && y < grid.y + grid.height) {
                    curveVertex(x, y);
                    x += 900 * noise(x);
                    y += 900 * noise(y);

                    console.log(x, y);
                }
            } 
            endShape();

            // push();
            // translate(tile.x, tile.y);
            // rotate(angle);
            // line(0, 0, 3, 0);
            // pop();


        }
    }
}



function keyPressed() {
    if(keyCode == 32) {
        if(paused == false) {
            paused = true;
            noLoop();
        }
        else if(paused == true) {
            paused = false;
            loop();
        }
    }
}
