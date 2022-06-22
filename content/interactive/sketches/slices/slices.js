/*******************
 ** slices_new.js **
 ******************/

var slices;
var t;
var palette;
var hexagon;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent('slices-holder');
    // frameRate(5);

    let numSlices = 10;
    let sliceWidth = 500;
    let sliceHeight = 500;
    let sliceDistance = 40;
    slices = new Slices(numSlices, sliceWidth, sliceHeight, sliceDistance);

    t = new Turtle();
    t.penUp();
    // palette = randomPalette1000();
    palette = ['RED', 'GREEN', 'YELLOW', 'BLUE', 'BLACK']

    let minSplits = 2;
    let maxSplits = 30;
    hexagon = new Hexagon(minSplits, maxSplits);

    ortho();
}

function draw() {
    if(focused == false) return;

    background(0);

    // rotateX(radians(mouseY));
    // rotateY(radians(mouseX));

    rotateX(radians(-10));
    rotateY(radians(10));

    slices.generateSlice();
    slices.drawSlices();
}

class Hexagon {
    constructor(minSplits, maxSplits) {
        this.minSplits = minSplits;
        this.maxSplits = maxSplits;
        this.splits = minSplits;
        this.increase_splits = true;
        this.numColorChanges = 0;

        this.strokeColor1 = palette[0];
        this.strokeColor2 = palette[1];
        this.strokeColor3 = palette[2];

        this.targetStrokeColor1 = palette[2];
        this.targetStrokeColor2 = palette[3];
        this.targetStrokeColor3 = palette[4];
    }

    updateSplits() {
        if(this.splits < this.maxSplits && this.splits_increasing == true) {
            this.splits++;
        }
        else if(this.splits == this.maxSplits) {
            this.splits_increasing = false;
            this.splits--;
        }
        else if(this.splits > this.minSplits && this.splits_increasing == false) {
            this.splits--;
        }
        else if(this.splits == this.minSplits) {
            this.splits_increasing = true;
            this.splits++;
            this.updateColors();
        }
        else {
            console.log("Error");
        }

    }

    updateColors() {
        this.strokeColor1 = this.targetStrokeColor1;
        this.strokeColor2 = this.targetStrokeColor2;
        this.strokeColor3 = this.targetStrokeColor3;

        this.targetStrokeColor1 = palette[(this.numColorChanges) % 5];
        this.targetStrokeColor2 = palette[(this.numColorChanges + 1) % 5];
        this.targetStrokeColor3 = palette[(this.numColorChanges + 2) % 5];

        this.numColorChanges++;
    }

    drawHexagon(graphics) {
        for(let i = 0; i < 6; i++) {
            this.drawTriangle(graphics);
            t.setHeading(t.heading + 60);
        }
    }

    drawTriangle(graphics) {
        let unit = slices.sliceWidth/2;

        var side1 = [];
        var side2 = [];
        var side3 = [];

        for(var i = 0; i < hexagon.splits; i++) {
            t.forward(unit/hexagon.splits);
            side1.push({x:t.x, y:t.y});
        } 
        t.setHeading(t.heading + 120);
        for(var i = 0; i < hexagon.splits; i++) {
            t.forward(unit/hexagon.splits);
            side2.push({x:t.x, y:t.y});
        }
        t.setHeading(t.heading + 120);
        for(var i = 0; i < hexagon.splits; i++) {
            t.forward(unit/hexagon.splits);
            side3.push({x:t.x, y:t.y});
        }


        for(var i = 0; i < this.splits - 1; i++) {
            let p1 = side1[i];
            let p2 = side2[i];
            let p3 = side3[i];

            graphics.strokeWeight(4);

            let r;
            let g; 
            let b;

            r = red(this.strokeColor1) + i * (red(this.targetStrokeColor1) - red(this.strokeColor1))/(this.maxSplits - this.minSplits)/2;
            g = green(this.strokeColor1) + i * (green(this.targetStrokeColor1) - green(this.strokeColor1))/(this.maxSplits - this.minSplits)/2;
            b = blue(this.strokeColor1) + i * (blue(this.targetStrokeColor1) - blue(this.strokeColor1))/(this.maxSplits - this.minSplits)/2;
            graphics.stroke(r,g,b);
            // graphics.stroke(this.strokeColor1);
            graphics.line(p1.x,p1.y,p2.x,p2.y);

            graphics.stroke(0);

            // r = red(this.strokeColor2) + i * (red(this.targetStrokeColor2) - red(this.strokeColor2))/(this.maxSplits - this.minSplits);
            // g = green(this.strokeColor2) + i * (green(this.targetStrokeColor2) - green(this.strokeColor2))/(this.maxSplits - this.minSplits);
            // b = blue(this.strokeColor2) + i * (blue(this.targetStrokeColor2) - blue(this.strokeColor2))/(this.maxSplits - this.minSplits);
            // graphics.stroke(r,g,b);
            // graphics.stroke(this.strokeColor2);
            graphics.line(p1.x,p1.y,p3.x,p3.y);

            // r = red(this.strokeColor3) + i * (red(this.targetStrokeColor3) - red(this.strokeColor3))/(this.maxSplits - this.minSplits);
            // g = green(this.strokeColor3) + i * (green(this.targetStrokeColor3) - green(this.strokeColor3))/(this.maxSplits - this.minSplits);
            // b = blue(this.strokeColor3) + i * (blue(this.targetStrokeColor3) - blue(this.strokeColor3))/(this.maxSplits - this.minSplits);
            // graphics.stroke(r,g,b);
            // graphics.stroke(this.strokeColor3);
            graphics.line(p2.x,p2.y,p3.x,p3.y);
        }
    }

}

class Slices {
    constructor(numSlices, sliceWidth, sliceHeight, sliceDistance) {
        this.numSlices = numSlices;
        this.slices = [];
        this.sliceWidth = sliceWidth;
        this.sliceHeight = sliceHeight;
        this.sliceDistance = sliceDistance;
    }

    generateSlice() {
        let slice = createGraphics(this.sliceWidth, this.sliceHeight);

        t.moveTo(this.sliceWidth/2, this.sliceHeight/2);
        t.setHeading(60);
        hexagon.drawHexagon(slice);
        hexagon.updateSplits();

        this.slices.push(slice);
        if(this.slices.length > this.numSlices) 
            this.slices.shift();
    }

    drawSlices() {
        push();

        for(let i = 0; i < this.slices.length; i++) {
            let slice = this.slices[i];

            fill(0,0,0,0);

            translate(0, 0, 1 * this.sliceDistance);
            texture(slice);
            plane(slice.width, slice.height);
        }

        pop();
    }
}
