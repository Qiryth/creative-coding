import P5 from "p5";
import "../fullscreen.css"
import {Helper, SinusMapper} from "../helpers/helper.ts";

let helper: Helper;
let sinHorizontal: SinusMapper;
let sinVertical: SinusMapper;

function sketch(p: P5) {
    p.setup = () => {
        // canvas setup
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.angleMode("degrees")

        helper = new Helper(p);
        sinHorizontal = helper.createSinMapper(0, -(p.width / 2 - 10), (p.width / 2 - 10), 1);
        sinVertical = helper.createSinMapper(45, -(p.height / 2 - 10), (p.height / 2 - 10), 3);

        p.strokeWeight(5)
        p.background(200)

        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i < 360; i++) {
            p.point( sinHorizontal.nextValue, sinVertical.nextValue)
        }
    }

    p.draw = () => {
        // p.background(200, 1)
        // p.translate(p.width / 2, p.height / 2);
        // p.point( sinHorizontal.nextValue, sinVertical.nextValue)
    }
}

new P5(sketch)