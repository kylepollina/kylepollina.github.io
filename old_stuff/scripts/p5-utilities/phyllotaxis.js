/* phyllotaxis */

class Phyllotaxis {
    constructor(numPoints) {
        this.numPoints = numPoints;
        this.mouseXControls = false;
        this.mouseYControls = false;
        this.constant = 5;
        this.xmod = 100000;
        this.xmodDefault = 0.001;
        this.ymod = 100;
        this.ymodDefault = 1;
        this.ymin = 100;
        this.randomness = 0;
    }

    /* Generates each point using the Point class */
    generatePoints() {
        let points = [];
        let xmod = (this.mouseXControls ? mouseX / this.xmod : this.xmodDefault);
        let ymod = (this.mouseYControls ? mouseY / this.ymod : this.ymodDefault);
        if(mouseY < this.ymin && this.mouseYControls) ymod = this.ymin / this.ymod;

        let phi = 137.5 + xmod;

        for(let n = 0; n < this.numPoints; n++) {
            let angle = n * phi;
            let modifier = 1;
            let radius = this.constant * sqrt(n * ymod);

            let x = radius * cos(angle) + width/2;
            let y = radius * sin(angle) + height/2;

            if(this.randomness != 0) {
                x += floor(this.randomness * random(0,10));
                y += floor(this.randomness * random(0,10));
            }

            let p = new Point(floor(x), floor(y));
            points.push(p);
        }

        return points;
    }

    /* Generates points with each point being the array [x,y] */
    generatePointsArray() {
        let points = [];
        let xmod = (this.mouseXControls ? mouseX / this.xmod : this.xmodDefault);
        let ymod = (this.mouseYControls ? mouseY / this.ymod : this.ymodDefault);
        if(mouseY < this.ymin && this.mouseYControls) ymod = this.ymin / this.ymod;

        let phi = 137.5 + xmod;

        for(let n = 0; n < this.numPoints; n++) {
            let angle = n * phi;
            let modifier = 1;
            let radius = this.constant * sqrt(n * ymod);

            let x = radius * cos(angle) + width/2;
            let y = radius * sin(angle) + height/2;

            if(this.randomness != 0) {
                x += floor(this.randomness * random(0,10));
                y += floor(this.randomness * random(0,10));
            }

            let p = [x, y];
            points.push(p);
        }

        return points;
    }

    setMouseControls() {
        this.mouseXControls = true;
        this.mouseYControls = true;
    }

    setNoMouseControls() {
        this.mouseXControls = false;
        this.mouseYControls = false;
    }
}

