/* spiro.js */

var spiro;

function setup() {
    var canvas = createCanvas(600,600);    
    canvas.parent("spiro-holder");

    spiro = new Spiro();
    spiro.set_start_pos(width/2,height/2 + 250);
    noLoop();
}

function draw() {
    background(255);
    spiro.level = (mouseX / 20);
    spiro.draw();
}

function keyPressed() {
    if (keyCode == 37 || keyCode == 39) {
        if (spiro.shape == "pentagon") {
            spiro.shape_triangle();
            spiro.set_start_pos(width/2,height/2+250);
        }
        else if (spiro.shape == "triangle") {
            spiro.shape_square();
            spiro.set_start_pos((width-400)/2, height - 100);
        }
        else if (spiro.shape == "square") {
            spiro.shape_pentagon();
            spiro.set_start_pos(width/2 - 250,height/2 + 75);
        }
    }
    else if (keyCode == 38) {
        spiro.angle += 1;
        spiro.len -= 1
    }
    else if (keyCode == 40) {
        spiro.angle -= 1;
        spiro.len += 1
    }
    redraw();

}

function mouseMoved() {
    redraw();
}

class Spiro {
    constructor() {
        this.angle = 0;
        this.len = 0;
        this.startx = 0;
        this.starty = 0;
        this.level = 2;
        this.t = new Turtle();
        this.shape = "";
        
        this.shape_triangle();
    }

    draw() {
        this.t.moveTo(this.startx, this.starty);
        this.t.setHeading(-1 * this.angle);
        this.t.forward(this.len);

        for(var i = 0; i < this.len; i++) {
            this.t.setHeading(this.t.heading + this.angle);
            let mov = this.len - this.level * i;
            if(mov > 0)
                this.t.forward(mov);
        }
    }

    set_start_pos(x,y) {
        this.startx = x;
        this.starty = y;
    }

    shape_triangle() {
        this.shape = "triangle";
        this.angle = 119;
        this.len = 500;
    }

    shape_square() {
        this.shape = "square";
        this.angle = 89;
        this.len = 400;
    }

    shape_pentagon() {
        this.shape = "pentagon";
        this.angle = 71;
        this.len = 300;
    }

    shape_hexagon() {
        this.shape = "hexagon";
        this.angle = 59;
        this.len = 200;
    }

    shape_7gon() {
        this.shape = "7gon";
        this.angle = 50;
        this.len = 200;
    }
}



/* Prevents up and down arrow from moving page up and down */
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
