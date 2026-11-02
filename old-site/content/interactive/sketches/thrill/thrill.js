/* thrill.js */

function setup() {
    var canvas = createCanvas(640, 640);
    canvas.parent('thrill-holder');
}

function draw() {
    background(255);    
    stroke("#CE2029");
    fill("#CE2029");

    textSize(28);
    strokeWeight(1);
    text("VULFPECK", 10, 32);
    text("THRILL OF THE ARTS", 10, 70);

    strokeWeight(1.5);

    for(let i = 0; i < 33; i++) {
        let margin = 20;
        let spacing = 13;

        let x1 = margin;
        let y1 = height - spacing - i * spacing;
        let x2 = mouseX;
        let y2 = y1 - 2.5 * i;
        let x3 = width - margin;
        let y3 = y1;

        line(x1, y1, x2, y2);
        line(x2, y2, x3, y3);
    }
}
