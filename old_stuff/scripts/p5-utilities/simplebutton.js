/* simplebutton.js */

class SimpleButton {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = "";
        this.textSize = 14;
        this.textColor = color(0);
        this.textX = 10;
        this.textY = 20;
        this.highlight = true;
        this.color = color(200, 200, 200);
        this.border = color(100, 100, 100);
        this.borderStrokeWeight = 4;
    }

    show() {
        stroke(this.border);

        if(this.highlight && this.x < mouseX && mouseX < this.x + this.width &&
            this.y < mouseY && mouseY < this.y + this.height) {
            stroke(0);
        }

        strokeWeight(this.borderStrokeWeight);
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);

        noStroke();
        fill(this.textColor);
        textSize(this.textSize);
        text(this.text, this.x + this.textX, this.y + this.textY);
    }

    setText(buttonText) {
        this.text = buttonText; 
    }

    isMouseInside() {
        return (this.x <= mouseX && mouseX < this.x + this.width 
                && this.y <= mouseY && mouseY < this.y + this.height);
    }

    execute() {}
}
