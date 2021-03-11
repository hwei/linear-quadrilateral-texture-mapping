var Draggable = (function () {
    function Draggable(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dragging = false;
        this.rollover = false;
        this.offsetX = 0;
        this.offsetY = 0;
    }
    Draggable.prototype.over = function (p) {
        if (p.mouseX > this.x && p.mouseX < this.x + this.w && p.mouseY > this.y && p.mouseY < this.y + this.h) {
            this.rollover = true;
        }
        else {
            this.rollover = false;
        }
    };
    Draggable.prototype.update = function (p) {
        if (this.dragging) {
            this.x = p.mouseX + this.offsetX;
            this.y = p.mouseY + this.offsetY;
        }
    };
    Draggable.prototype.show = function (p) {
        p.stroke(0);
        if (this.dragging) {
            p.fill(50);
        }
        else if (this.rollover) {
            p.fill(100);
        }
        else {
            p.fill(175, 200);
        }
        p.rect(this.x, this.y, this.w, this.h);
    };
    Draggable.prototype.pressed = function (p) {
        if (p.mouseX > this.x && p.mouseX < this.x + this.w && p.mouseY > this.y && p.mouseY < this.y + this.h) {
            this.dragging = true;
            this.offsetX = this.x - p.mouseX;
            this.offsetY = this.y - p.mouseY;
        }
    };
    Draggable.prototype.released = function () {
        this.dragging = false;
    };
    return Draggable;
}());
var sketch = function (p) {
    var draggable0 = new Draggable(100, 100, 20, 20);
    var draggable1 = new Draggable(150, 100, 20, 20);
    var draggable2 = new Draggable(150, 150, 20, 20);
    var draggable3 = new Draggable(100, 150, 20, 20);
    var draggableArray = [draggable0, draggable1, draggable2, draggable3];
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {
        p.background(0);
        for (var _i = 0, draggableArray_1 = draggableArray; _i < draggableArray_1.length; _i++) {
            var d = draggableArray_1[_i];
            d.over(p);
            d.update(p);
            d.show(p);
        }
        p.stroke(255, 0, 0);
        p.line(draggableArray[0].x, draggableArray[0].y, draggableArray[1].x, draggableArray[1].y);
        p.stroke(0, 255, 255);
        p.line(draggableArray[1].x, draggableArray[1].y, draggableArray[2].x, draggableArray[2].y);
        p.stroke(0, 255, 0);
        p.line(draggableArray[0].x, draggableArray[0].y, draggableArray[3].x, draggableArray[3].y);
        p.stroke(255, 0, 255);
        p.line(draggableArray[3].x, draggableArray[3].y, draggableArray[2].x, draggableArray[2].y);
        var points = draggableArray.map(function (s) { return p.createVector(s.x, s.y); });
        var mapping = createMeanValueMapping(points[0], points[1], points[2], points[3]);
        for (var i = 1; i < 8; ++i) {
            var a = mapping(0, i / 8);
            var b = mapping(1, i / 8);
            p.stroke(255, 0, i / 8 * 255);
            p.line(a.x, a.y, b.x, b.y);
        }
        for (var i = 1; i < 8; ++i) {
            var a = mapping(i / 8, 0);
            var b = mapping(i / 8, 1);
            p.stroke(0, 255, i / 8 * 255);
            p.line(a.x, a.y, b.x, b.y);
        }
    };
    p.mousePressed = function () {
        for (var _i = 0, draggableArray_2 = draggableArray; _i < draggableArray_2.length; _i++) {
            var d = draggableArray_2[_i];
            d.pressed(p);
        }
    };
    p.mouseReleased = function () {
        for (var _i = 0, draggableArray_3 = draggableArray; _i < draggableArray_3.length; _i++) {
            var d = draggableArray_3[_i];
            d.released();
        }
    };
};
new p5(sketch);
function createMeanValueMapping(p00, p10, p11, p01) {
    return function (u, v) {
        var a00 = (1 - u) * (1 - v);
        var a10 = (1 - u) * v;
        var a11 = u * v;
        var a01 = u * (1 - v);
        var r = new p5.Vector();
        r.add(p5.Vector.mult(p00, a00));
        r.add(p5.Vector.mult(p10, a10));
        r.add(p5.Vector.mult(p11, a11));
        r.add(p5.Vector.mult(p01, a01));
        return r;
    };
}
//# sourceMappingURL=../sketch/sketch/build.js.map