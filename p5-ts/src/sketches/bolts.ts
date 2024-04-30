import P5, { Vector } from "p5";
import {VectorHelper} from "../helpers/vectorHelper.ts";

let mouseIsOver: boolean;
let centerPoint: Vector;
let points: Vector[];

const sketch = function (p: P5) {
    p.setup = () => {
        let canvas = p.createCanvas(400, 400);
        centerPoint = new Vector(canvas.width / 2, canvas.height / 2);
        canvas.mouseOver(() => mouseIsOver = true);
        canvas.mouseOut(() => mouseIsOver = false);
    }

    p.draw = () => {
        p.background(220);

        if (!mouseIsOver) return;

        let mousePosition: Vector = new Vector(p.mouseX, p.mouseY);
        let centerToMouse: Vector = Vector.sub(mousePosition, centerPoint);
        let perpendicularLine: Vector = VectorHelper.perpendicular2DNormalTo(centerToMouse);
        perpendicularLine.mult(centerToMouse.mag() / 2);

        let squareCorner: Vector = Vector.add(centerPoint, centerToMouse.mult(.5)).add(perpendicularLine);

        let squareHeight: Vector = Vector.sub(squareCorner, centerPoint);
        let squareWidth: Vector = Vector.sub(mousePosition, squareCorner);

        points = [centerPoint];
        for (let i = 0; i < 3; i++) {
            points.push(Vector.add(centerPoint, squareHeight.copy().mult(p.random(0, 1)))
                .add(squareWidth.copy().mult(p.random(0, 1))));
        }
        points.push(mousePosition);

        p.beginShape()
        p.noFill()
        points.forEach(point => p.vertex(point.x, point.y))
        p.endShape()
    }
};

new P5(sketch);