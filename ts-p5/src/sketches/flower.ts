import P5, {Color, Renderer, Vector} from "p5";
import "../style.css"

function sketch(p: P5) {
    let middlePoint: Vector;
    let innerRadius: Vector;
    let middleRadius: Vector;
    let outerRadius: Vector;
    let canvas: Renderer;

    let innerColor: Color = p.color(p.random(256), p.random(128), 0)
    let outerColor: Color = p.color(0, p.random(128, 256), p.random(256));

    p.setup = () => {
        canvas = p.createCanvas(1000, 800);
        p.background(0);
        middlePoint = p.createVector(canvas.width / 2, canvas.height / 2);
        p.angleMode("degrees");
        outerRadius = p.createVector(200,0);
        middleRadius = p.createVector(150, 0);
        innerRadius = p.createVector(150, 0);
    }

    p.draw = () => {
        let jointPoint = Vector.add(middlePoint, innerRadius);
        let currentPoint = Vector.add(jointPoint, middleRadius);
        let outerPoint = Vector.add(currentPoint, outerRadius);
        p.stroke(innerColor);
        p.strokeWeight(5);
        p.point(currentPoint.add(Vector.random2D().mult(2)));
        p.stroke(outerColor);
        p.strokeWeight(8);
        p.point(outerPoint.add(Vector.random2D().mult(1)));
        innerRadius.rotate(6);
        middleRadius.rotate(-4);
        outerRadius.rotate(2)

        if (p.frameCount % 180 == 0) {
            innerRadius.rotate(108);
            middleRadius.rotate(108);
            outerRadius.rotate(108);

            innerColor = p.color(p.random(256), p.random(128, 256), 0)
            outerColor = p.color(0, p.random(128), p.random(256));
        }
    }
}

new P5(sketch)