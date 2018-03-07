/****************
 * Triangles.js *
 ***************/

var n = 1;
var splitY;

function setup() {
    var canvas = createCanvas(500,500);
    canvas.parent("triangle-holder")

    splitY = 0;
    noStroke();
}


function draw() {
    
    if(mouseY > splitY && n < 30) {
        n += 1;
        splitY += (height - splitY) / n;
    }

    else if(mouseY < height - (height / (n - 1)) && n > 1) {
        n -= 1;
        splitY = height - (height / n);
    }

    for(var i = 1; i <= n; i++) {
        for(var j = 1; j <= i; j++) {
            draw_triangles(width - j * (width / i), height - i * (height / n), width / i, height / n);
        }
    }
}

function draw_triangles(x,y,w,h) {
    /* green triangle */
    fill(0,100,100);
    triangle(x,y, x,y+h, x+(w/2),y+h);

    /* white triangle */
    fill(255);
    triangle(x,y, x+w,y, x+(w/2),y+h);
    
    /* black triangle */
    fill(0);
    triangle(x+(w/2),y+h, x+w,y+h, x+w,y);
}
