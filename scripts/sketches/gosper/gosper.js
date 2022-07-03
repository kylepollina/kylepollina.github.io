/*************
 * Gosper.js *
 ************/

var t;
var gosper;
var unit;
var bg = 1;
var maxIterations = 6;

function setup() {
    var canvas = createCanvas(500,500);
    canvas.parent("gosper-holder");

    strokeWeight(3);

    t = new Turtle();

    var draw = ["A","B"];
    var skip = [];
    var axiom = "A";
    var ruleset = ["A=A-B--B+A++AA+B-","B=+A-BB--B-A++A+B"];
    angle = 60;
    unit = 350;

    gosper = new Lsystem(draw, skip, axiom, ruleset, angle);
    gosper.iterate();
    unit = unit / 2.6457;
    gosper.iterate();
    unit = unit / 2.6457;

    noLoop();
}

function draw() {
    if(bg == 0) {
        background(5, 5, 0);
        stroke(250, 250, 255);
    }
    else if(bg == 1) {
        background(250, 250, 255);
        stroke(0, 0, 5);
    }

    t.moveTo(75,height/2 + 100);
    t.setHeading(19.1056 * (gosper.iterations - 1));

    for(var i = 0; i < gosper.current.length; i++) {
        let c = gosper.current.charAt(i);
        
        if(c == "A" || c == "B") {
            t.forward(unit);
        }

        if(c == "+") {
            t.right(gosper.angle);
        }
        else if(c == "-") {
            t.left(gosper.angle);
        }
    }
}

function keyPressed() {
    if(keyCode == UP_ARROW && gosper.iterations < maxIterations) {
        gosper.iterate();
        unit = unit / 2.6457;
        redraw();
    }
    else if(keyCode == DOWN_ARROW && gosper.iterations > 1) {
        gosper.de_iterate();
        unit = unit * 2.6457;
        redraw();
    }
    else if(keyCode == 32) {
        bg = (bg == 0 ? 1 : 0);
        redraw();
    }
}


/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
