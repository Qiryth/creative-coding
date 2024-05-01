import P5 from "p5";

function sketch(p: P5) {
    let rotation = 0;
    let rotationSin = 0;
    let posX = 0;

    p.setup = () => {
        p.createCanvas(p.windowWidth - 20, p.windowHeight - 20);
        p.angleMode("degrees");
        p.strokeWeight(2)
    }

    p.draw = () => {
        p.stroke(p.color(p.random(256), p.random(256), p.random(256)))
        p.fill(p.color(p.random(256), p.random(256), p.random(256)))
        p.translate(p.width / 2, p.height / 2);
        p.rotate(rotation += p.map(p.sin(rotationSin+=4), -1, 1, -20, 20));
        if (p.random([true, false])) return;
        p.ellipse(posX++, 10, 10 ,20)
    }
}

new P5(sketch);