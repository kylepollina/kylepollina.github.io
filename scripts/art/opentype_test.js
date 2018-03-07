/* opentype_test.js */

var canvas;

function preload() {}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent('test-holder');

    noLoop();
}

function draw() {
    background(200, 200, 200);

    opentype.load('futura/Futura Heavy Italic font.ttf', function(err, font) {
        if(err) {console.log(err)}

        let path = font.getPath("Nike", 150, height/2, 150);
        console.log(path);

        path.fill = null;
        path.stroke = "black";

        var ctx = canvas.elt.getContext('2d');
        path.draw(ctx);
    });
}

