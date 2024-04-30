import P5, {Renderer, Vector} from "p5";
import {Helper} from "../helpers/helper.ts";

let mousePosition: Vector;

const sketch1 = function (p: P5) {
    let mouseIsOver: boolean;
    let canvas: Renderer;
    let bolts: Bolt[] = [];

    p.setup = () => {
        canvas = p.createCanvas(600, 800);
        canvas.mouseOver(() => {
            mouseIsOver = true;
        });
        canvas.mouseOut(() => {
            mouseIsOver = false;
            bolts = [];
        });
    }

    p.draw = () => {
        p.background(220);
        bolts.forEach(bolt => bolt.updateTargetPoint())

        console.log(mouseIsOver)
        if (!mouseIsOver) return;
        mousePosition = new Vector(p.mouseX, p.mouseY);
        bolts.forEach(bolt => bolt.drawBolt())
    }

    p.mouseClicked = () => {
        if (mouseIsOver) bolts.push(new Bolt(canvas, p, () => mousePosition));
    }
};

const sketch2 = function (p: P5) {
    let mouseIsOver: boolean;
    let canvas: Renderer;
    let bolts: Bolt[] = [];

    p.setup = () => {
        canvas = p.createCanvas(600, 800);
        canvas.mouseOver(() => {
            mouseIsOver = true;
        });
        canvas.mouseOut(() => {
            mouseIsOver = false;
            bolts = [];
        });
    }

    p.draw = () => {
        p.background(220);
        bolts.forEach(bolt => bolt.updateTargetPoint())

        console.log(mouseIsOver)
        if (!mouseIsOver) return;
        mousePosition = new Vector(p.mouseX, p.mouseY);
        bolts.forEach(bolt => bolt.drawBolt())
    }

    p.mouseClicked = () => {
        if (mouseIsOver) {
            if (bolts.length % 2 == 0) {
                bolts.push(new Bolt(canvas, p, () => mousePosition));
            } else {
                const indexOfLastBolt = bolts.length - 1;
                bolts.push(new Bolt(canvas, p, () => bolts[indexOfLastBolt].targetPoint));
                bolts[indexOfLastBolt].getBasePoint = () => bolts[indexOfLastBolt + 1].targetPoint;
            }
        }
    }
};

const sketch3 = function (p: P5) {
    let mouseIsOver: boolean;
    let canvas: Renderer;
    let bolts: Bolt[] = [];

    p.setup = () => {
        canvas = p.createCanvas(600, 800);
        canvas.mouseOver(() => {
            mouseIsOver = true;
        });
        canvas.mouseOut(() => {
            mouseIsOver = false;
            bolts = [];
        });
    }

    p.draw = () => {
        p.background(220);
        bolts.forEach(bolt => bolt.updateTargetPoint())

        console.log(mouseIsOver)
        if (!mouseIsOver) return;
        mousePosition = new Vector(p.mouseX, p.mouseY);
        bolts.forEach(bolt => bolt.drawBolt())
    }

    p.mouseClicked = () => {
        if (mouseIsOver) {
            if (bolts.length == 0) {
                bolts.push(new Bolt(canvas, p, () => mousePosition));
            } else {
                const indexOfLastBolt = bolts.length - 1;
                bolts.push(new Bolt(canvas, p, () => bolts[0].targetPoint));
                bolts[indexOfLastBolt].getBasePoint = () => bolts[indexOfLastBolt + 1].targetPoint;
            }
        }
    }
};

new P5(sketch1);
new P5(sketch2);
new P5(sketch3);

class Bolt {
    p: P5;
    canvas: Renderer
    targetPoint: Vector;
    targetAxis: "x" | "y";
    goingUp: boolean;
    boltPoints: Vector[] = [];
    getBasePoint: () => Vector;

    constructor(canvas: Renderer, p: P5, getBasePoint: () => Vector) {
        this.p = p;
        this.canvas = canvas;
        this.targetPoint = mousePosition.copy();
        this.targetAxis = p.random(["x", "y"]);
        this.goingUp = p.random([true, false]);
        this.getBasePoint = getBasePoint;
    }

    drawBolt() {
        this.updateBoltPoints();
        this.p.beginShape();
        this.p.noFill();
        this.boltPoints.forEach(point => this.p.vertex(point.x, point.y));
        this.p.endShape();
    }

    updateBoltPoints() {
        let centerToMouse: Vector = Vector.sub(this.getBasePoint(), this.targetPoint);
        let perpendicularLine: Vector = Helper.perpendicular2DNormalTo(centerToMouse);
        perpendicularLine.mult(centerToMouse.mag() / 2);

        let squareCorner: Vector = Vector.add(this.targetPoint, centerToMouse.mult(.5)).add(perpendicularLine);

        let squareHeight: Vector = Vector.sub(squareCorner, this.targetPoint);
        let squareWidth: Vector = Vector.sub(this.getBasePoint(), squareCorner);

        this.boltPoints = [this.targetPoint];
        for (let i = 0; i < 3; i++) {
            let point: Vector = Vector.add(this.targetPoint, squareHeight.copy().mult(this.p.random(0, 1)))
                .add(squareWidth.copy().mult(this.p.random(0, 1)));

            this.boltPoints.push(Helper.reduceToCanvas(point, this.canvas));
        }
        this.boltPoints.push(this.getBasePoint());
    }

    updateTargetPoint() {
        this.targetPoint[this.targetAxis] += this.goingUp ? 2 : -2;

        if (this.goingUp && this.targetPoint[this.targetAxis] >
            (this.targetAxis == "x" ? this.canvas.width : this.canvas.height)) {
            this.targetPoint[this.targetAxis] = this.targetAxis == "x" ? this.canvas.width : this.canvas.height;
        }
        else if (!this.goingUp && this.targetPoint[this.targetAxis] < 0.9) this.targetPoint[this.targetAxis] = 0;
        else return;

        if (this.targetAxis == "y") this.goingUp = !this.goingUp;
        this.targetAxis = this.targetAxis == "x" ? "y" : "x";
    }
}