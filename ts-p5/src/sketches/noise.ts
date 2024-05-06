import P5 from "p5";
import "../fullscreen.css"
import {Helper, NoiseMapper} from "../helpers/helper.ts";

// @ts-ignore
let helper: Helper;

function sketch(p: P5) {
    let noiseX : NoiseMapper;
    let noiseY : NoiseMapper;

    p.setup = () => {
        // canvas setup
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.angleMode("degrees")

        // helper setup
        helper = new Helper(p);
        noiseX = helper.createNoiseMapper(p.width, 0.008);
        noiseY = helper.createNoiseMapper(p.height, 0.008)
        p.strokeWeight(3)
    }

    p.draw = () => {
        p.point(noiseX.nextValue, noiseY.nextValue)
    }
}

new P5(sketch)