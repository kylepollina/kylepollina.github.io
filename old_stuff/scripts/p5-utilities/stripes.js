/* stripes.js */

// TODO: Redo this 

class StripeGradient {
    constructor(x, y, width, height, col1, col2, divisions) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.col1 = col1;
        this.col2 = col2;
        this.divisions = divisions;
    }

    show() {
        let gradient = this.generate();
        image(gradient, this.x, this.y);
    }

    generate() {
        let gradient = createGraphics(this.width, this.height);
        let boxsize = this.height / this.divisions;
        let step = boxsize / this.divisions;

        gradient.background(this.col1);
        gradient.noStroke();
        gradient.fill(this.col2);

        for(let i = 0; i < this.divisions; i++) {
            let y = i*boxsize;
            gradient.rect(0, y, this.width, (boxsize - i*step > 3 ? boxsize - i*step : 0));
        }

        return gradient;
    }
}

class StripeBox {
    constructor(x, y, width, height, col1, col2, angle) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
        this.stripeWidth = 10;
        this.spread = 20;
        this.border = 0;
        this.col1 = col1;
        this.col2 = col2;
    } 

    show() {
        let stripes = this.createStripes();
        let mask = this.createMask();
        let stripebox = graphicMask(stripes, mask);
        image(stripebox, this.x, this.y);
    }

    createStripes() {
        let stripes = createGraphics(this.width, this.height);
        stripes.background(color(this.col2));
        stripes.fill(color(this.col1));
        stripes.strokeWeight(0);

        stripes.translate(stripes.width/2, -1 * stripes.height/4);
        stripes.rotate(radians(this.angle));

        for(let x = this.stripeWidth/2 - this.width/2; x < max(this.width, this.height) + this.width/2; x += this.spread) {
            stripes.rect(x - this.stripeWidth/2, -1 * this.height/2, this.stripeWidth, 2 * this.height); 
        }

        return stripes;
    }

    createMask() {
        let mask = createGraphics(this.width, this.height);
        if(this.border == 0) mask.strokeWeight(max(mask.width, mask.height));
        else mask.strokeWeight(this.border);
        mask.stroke(0);
        mask.line(0, 0, mask.width, 0);
        mask.line(mask.width, 0, mask.width, mask.height);
        mask.line(mask.width, mask.height, 0, mask.height);
        mask.line(0, mask.height, 0, 0);
        
        return mask;
    }
}


