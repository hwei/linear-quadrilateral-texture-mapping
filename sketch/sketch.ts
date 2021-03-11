
const sketch = (p: p5) => {
    const draggable0 = new Draggable(100, 100, 20, 20);
    const draggable1 = new Draggable(150, 100, 20, 20);
    const draggable2 = new Draggable(150, 150, 20, 20);
    const draggable3 = new Draggable(100, 150, 20, 20);
    const draggableArray = [draggable0, draggable1, draggable2, draggable3];

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        
    };

    p.draw = () => {
        p.background(0);
        for (const d of draggableArray) {
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
    
        const points = draggableArray.map(s => p.createVector(s.x, s.y));
        const mapping = createMeanValueMapping(points[0], points[1], points[2], points[3]);
        for(let i = 1; i < 8; ++i) {
            const a = mapping(0, i / 8);
            const b = mapping(1, i / 8);
            p.stroke(255, 0, i / 8 * 255);
            p.line(a.x, a.y, b.x, b.y);
        }
        for(let i = 1; i < 8; ++i) {
            const a = mapping(i / 8, 0);
            const b = mapping(i / 8, 1);
            p.stroke(0, 255, i / 8 * 255);
            p.line(a.x, a.y, b.x, b.y);
        }
    
    };

    p.mousePressed = () => {
        for(const d of draggableArray) {
            d.pressed(p);
        }
    }
    p.mouseReleased = () => {
        for(const d of draggableArray) {
            d.released();
        }
    }
};

new p5(sketch);

function createMeanValueMapping(
    p00: p5.Vector,
    p10: p5.Vector,
    p11: p5.Vector,
    p01: p5.Vector,
) {

    return function(u: number, v: number) {
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
    }
}
