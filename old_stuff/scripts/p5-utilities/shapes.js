/* shapes */

function randomPoints(numPoints) {
    var points = [];
    for(let i = 0; i < numPoints; i++) {
        points.push(new Point(~~random(width), ~~random(height)));
    }
    return points;
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x; 
        this.y = y;
        this.r = r;
    }
}

class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y; 
        this.width = width;
        this.height = height;
    }
}

class Square {
    constructor(x, y, sidelength) {
        this.x = x;
        this.y = y;
        this.sidelength = sidelength;
    }
}

class Polygon {
    constructor() {
        this.points = [];
    }

    addVertex(x, y) {
        let p = new Point(x, y);
        points.push(p);
    }
}
