/****************************
 ** nice_color_palettes.js **
 ***************************/

function setup() {
    var canvas;
    
    if(windowWidth >= 700) {
        canvas = createCanvas(700, 200);
    } 
    else {
        canvas = createCanvas(windowWidth - 40, 200);
    }
    canvas.parent("nice_color_palettes-holder");

}

function draw() {
    background(0);
}




function windowResized() {
    if(windowWidth >= 700 && width < 700) {
        resizeCanvas(700, 200);
    } 
    else if(windowWidth < 700) {
        resizeCanvas(windowWidth - 40, 200);
    }
}
