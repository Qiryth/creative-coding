import p5 from "p5";

let mouseIsOver;

const sketch = function (p: p5) {
  p.setup = () => {
    let canvas = p.createCanvas(400, 400);
    canvas.mouseOver(() => mouseIsOver = true);
    canvas.mouseOut(() => mouseIsOver = false);
  }

  p.draw = () => {
    p.background(220);
  }
};

new p5(sketch);
