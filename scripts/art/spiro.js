/************
 * Spiro.js *
 ***********/

var spiro;

function setup() {
    var canvas = createCanvas(800,600);    
    canvas.parent("spiro-holder");

    spiro = new Spiro();
    spiro.set_start_pos(width/2,height/2 + 250);
    noLoop();
}

function draw() {
    background(250,250,255);
    spiro.level = (mouseX / 20);
    spiro.draw();
}

function keyPressed() {
    if(keyCode == 49) { 
        spiro.shape_triangle();
        spiro.set_start_pos(width/2,height/2+250);
    }
    else if(keyCode == 50) {
        spiro.shape_square();
        spiro.set_start_pos((width-400)/2, height - 100);
    }
    else if(keyCode == 51) {
        spiro.shape_pentagon();
        spiro.set_start_pos(width/2 - 250,height/2 + 75);
    }


    // else if(keyCode == 52) {
    //     spiro.shape_hexagon();
    //     spiro.set_start_pos(width/2 - 250,height/2 + 75);
    // }
    // else if(keyCode == 53) {
    //     spiro.shape_7gon();
    //     spiro.set_start_pos(width/2 - 250,height/2 + 75);
    // }


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


