/* turtle.js */

const DOWN = 0;
const UP   = 1;

class Turtle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.heading = 0;       
        this.penState = DOWN;
        this.steps = 0;
        this.stack = [];
    }

    forward(step) {
        // polar to cartesian based on step and heading:
        let x1 = this.x + step * cos(radians(this.heading));
        let y1 = this.y + step * sin(radians(this.heading));

        if(this.penState == DOWN) {
            line(this.x, this.y, x1, y1);
        }

        // update the turtle's position:
        this.x = x1;
        this.y = y1;

        this.steps++;
    }

    right(angle) {
        this.heading += angle;
    }

    left(angle) {
        this.heading -= angle;
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    setHeading(angle) {
        this.heading = angle;
    }

    penDown() {
        this.penState = DOWN;
    }

    penUp() {
        this.penState = UP;
    }

    push() {
        this.stack.push({
            "x": this.x,
            "y": this.y,
            "heading": this.heading,
            "penState": this.penState
        });
    }

    pop() {
        let state = this.stack.pop();
        this.x = state.x;
        this.y = state.y;
        this.heading = state.heading;
        this.penState = state.penState;
    }

    stackLength() {
        return this.stack.length;
    }
}

