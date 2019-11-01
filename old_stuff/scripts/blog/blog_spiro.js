/* spiro.js */

var spiro;

function setup() {
    var canvas = createCanvas(500,400);    
    canvas.parent("spiro-blog-holder");

    t = new Turtle();
    t.move_to(width/4, height/2 + 75);

    spiro = new Spiro();
    spiro.set_start_pos(width/2,height/2 + 150);
}

function draw() {
    background(255);
    spiro.level = (mouseX / 20);
    spiro.draw();
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
        this.t.move_to(this.startx, this.starty);
        this.t.set_heading(-1 * this.angle);
        this.t.forward(this.len);

        for(var i = 0; i < this.len; i++) {
            this.t.set_heading(this.t.heading + this.angle);
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
        this.len = 300;
    }

    shape_square() {
        this.shape = "square";
        this.angle = 89;
        this.len = 200;
    }

    shape_pentagon() {
        this.shape = "pentagon";
        this.angle = 71;
        this.len = 200;
    }
}


