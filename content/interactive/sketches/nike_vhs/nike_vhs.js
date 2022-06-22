/*****************
 ** nike_vhs.js **
 ****************/

var canvas;
var ctx;
var palette;
var swoosh;
var classic;
var stack = [];

function preload() {
    swoosh = loadImage('swoosh.png');
    swoosh.loadPixels();
    classic = loadImage('nike_classic.png');
    classic.loadPixels();
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.parent('test-holder');
    ctx = canvas.elt.getContext('2d');

    palette = p1000.get(124);
    stack.push(palette);

    noStroke();
    noLoop();
}

function draw() {
    background(palette[1]);

    drawGradient();
    drawSwoosh();
    drawClassic();
    drawSide();
    drawText();
}

function drawGradient() {
    push();
    fill(palette[4]);
    rect(0, 0, 200, 200);
    
    let gradient = new StripeGradient(0, 0, 2*width, 200, palette[0], palette[4], 8);
    let graphics = gradient.generate();

    rotate(radians(-35));
    rect(-width, 0, 2*width, 302);
    image(graphics, -300, 100);
    pop();
}

function drawSwoosh() {
    let source = createGraphics(width, height);
    source.background(palette[0]);
    let mask = createGraphics(width, height);
    mask.image(swoosh, 20, 20);
    
    let finalswoosh = graphicsMask(source, mask);
    image(finalswoosh, 0, 0);
}

function drawClassic() {
    let source = createGraphics(width, height);
    source.background(palette[4]);
    let mask = createGraphics(width, height);
    mask.image(classic, 0, 420);
    
    let finalclassic = graphicsMask(source, mask);
    image(finalclassic, 0, 0);
}

function drawSide() {
    fill(palette[4]);
    push();
    rotate(radians(-35));
    rect(150, 510, 500, 500);
    pop();
    rect(width-20, 0, 20, height);
}

function drawText() {
    rotate(radians(-35));

    opentype.load('futura/Futura Bold Italic font.ttf', function(err, font) {
        if(err) {console.log(err)}

        let Nike = font.getPath("Nike", -100, 450, 120);
        Nike.fill = palette[3];
        let just = font.getPath("Just Do It.", -100, 480, 30);
        just.fill = palette[4];

        Nike.draw(ctx);
        just.draw(ctx);
    });

}

function keyPressed() {
    if(keyCode == 32) {
        save();
    }
    else if(keyCode == 48) {
        stack.push(palette);
        palette = randomPalette1000().palette;
        redraw();
    }
    else if(keyCode == 57) {
        stack.push(palette);
        palette = shuffle(palette);
        redraw();
    }
    else if(keyCode == 49) {
        if(stack.length > 0)
            palette = stack.pop();
        redraw();
    }
}
