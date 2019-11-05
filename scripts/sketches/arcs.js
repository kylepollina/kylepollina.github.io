/* arcs.js */

let num = 25;
let angle = 0;
let ctx = null;
const r = 100;

function setup() {
	var canv = createCanvas(500, 500);
    canv.parent("arcs-holder");
	ellipseMode(CENTER);
	colorMode(HSB);
	ctx = canvas.getContext('2d');
}

function draw() {
    colorMode(RGB);
    background(255, 250, 250);
    colorMode(HSB);
    let xval = (mouseX > 0) ? mouseX : 0;
	num = round(map(xval, 0, width, 4, 25));
	if (num % 2 === 1) {
		num += 1;
	}
	angle = radians(360 / num);

	push();
	translate(width / 2, height / 2);

	noStroke();
	
	ctx.save();
	ctx.beginPath();
	ctx.rect(-width / 2, -height / 2, width / 2, height);
	ctx.clip();
	for (let i = 0; i < num; i++) {
		fill(i/num * 360, 90, 90);
		rotate(angle);
		circle(r, 0, 2*r, 2*r, -angle, PI);
	}
	ctx.restore();
	
	ctx.beginPath();
	ctx.save();
	ctx.rect(0, -height / 2, width / 2, height);
	ctx.clip();
	
	rotate(PI);
	for (let i = 0; i < num; i++) {
		fill((i/num * 360 + 180) % 360, 90, 90);
		rotate(angle);
		circle(r, 0, 2*r, 2*r);
	}
	ctx.restore();

	pop();
}

