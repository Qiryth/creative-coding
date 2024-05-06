import P5 from "p5";
import "../fullscreen.css"
import {Helper, NoiseMapper} from "../helpers/helper.ts";

// @ts-ignore
let helper: Helper;

function sketch(p: P5) {
    let waveNoise: NoiseMapper;
    let colorR: NoiseMapper;
    let colorG: NoiseMapper;
    let colorB: NoiseMapper;

    p.setup = () => {
        // canvas setup
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.angleMode("degrees")

        // helper setup
        helper = new Helper(p);
        waveNoise = helper.createNoiseMapper(p.height, 0.008, {width: p.width, mode: "increment"});
        colorR = helper.createNoiseMapper(255, 0.002);
        colorG = helper.createNoiseMapper(255, 0.002);
        colorB = helper.createNoiseMapper(255, 0.002);
        p.strokeWeight(3)
    }

    p.draw = () => {
        p.translate(-p.frameCount, 0)
        p.background(255)
        p.stroke(colorR.nextValue, colorG.nextValue, colorB.nextValue);
        waveNoise.nextWidth.forEach((value, index) => {
            p.line(index * 3 + 1, 0, index * 3 + 1, value);
        })
    }
}

new P5(sketch)