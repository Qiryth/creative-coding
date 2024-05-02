import P5, {Color, Renderer, Vector} from "p5";
import "../style.css"
import {Helper, SinusMapper} from "../helpers/helper.ts";

let helper: Helper;

function sketch(p: P5) {
    let middlePoint: Vector;
    let innerRadius: Vector;
    let middleRadius: Vector;
    // let outerRadius: Vector;
    let canvas: Renderer;

    let innerRotation = 0;
    let middleRotation = 0;
    let outerRotation = 0;

    let innerMapper: SinusMapper;
    let middleMapper: SinusMapper;

    let innerColor: Color = p.color(p.random(256), p.random(128), 0)
    // let outerColor: Color = p.color(0, p.random(128, 256), p.random(256));

    p.setup = () => {
        canvas = p.createCanvas(1000, 800);
        p.background(0);

        helper = new Helper(p);
        innerMapper = helper.createSinMapper(0, 50, 150, 10);
        middleMapper = helper.createSinMapper(0, 50, 150, 10)

        middlePoint = p.createVector(canvas.width / 2, canvas.height / 2);
        p.angleMode("degrees");
        // outerRadius = p.createVector(150,0);
        middleRadius = p.createVector(150, 0);
        innerRadius = p.createVector(150, 0);
    }

    p.draw = () => {
        middleRadius.x = middleMapper.next;
        innerRadius.x = innerMapper.next;
        let jointPoint = Vector.add(middlePoint, innerRadius.copy().rotate(innerRotation));
        let currentPoint = Vector.add(jointPoint, middleRadius.copy().rotate(middleRotation));
        // let outerPoint = Vector.add(currentPoint, outerRadius.copy().rotate(outerRotation));
        p.stroke(innerColor);
        p.strokeWeight(5);
        p.point(currentPoint.add(Vector.random2D().mult(2)));
        // p.stroke(outerColor);
        // p.strokeWeight(8);
        // p.point(outerPoint.add(Vector.random2D().mult(1)));

        innerRotation += 4.25;
        middleRotation += -.5;
        outerRotation += 6;

        innerColor = p.color(p.random(256), p.random(128, 256), 0)
        // outerColor = p.color(0, p.random(128), p.random(256));
    }
}

new P5(sketch)