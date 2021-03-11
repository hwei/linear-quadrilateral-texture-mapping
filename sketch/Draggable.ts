// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
    private dragging = false; // Is the object being dragged?
    private rollover = false; // Is the mouse over the ellipse?
    private offsetX = 0;
    private offsetY = 0;

    constructor(
        public x: number,
        public y: number,
        public w: number,
        public h: number) {
    }

    over(p: p5) {
        // Is mouse over object
        if (p.mouseX > this.x && p.mouseX < this.x + this.w && p.mouseY > this.y && p.mouseY < this.y + this.h) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    }

    update(p: p5) {
        // Adjust location if being dragged
        if (this.dragging) {
            this.x = p.mouseX + this.offsetX;
            this.y = p.mouseY + this.offsetY;
        }
    }

    show(p: p5) {
        p.stroke(0);
        // Different fill based on state
        if (this.dragging) {
            p.fill(50);
        } else if (this.rollover) {
            p.fill(100);
        } else {
            p.fill(175, 200);
        }
        p.rect(this.x, this.y, this.w, this.h);
    }

    pressed(p: p5) {
        // Did I click on the rectangle?
        if (p.mouseX > this.x && p.mouseX < this.x + this.w && p.mouseY > this.y && p.mouseY < this.y + this.h) {
            this.dragging = true;
            // If so, keep track of relative location of click to corner of rectangle
            this.offsetX = this.x - p.mouseX;
            this.offsetY = this.y - p.mouseY;
        }
    }

    released() {
        // Quit dragging
        this.dragging = false;
    }
}
