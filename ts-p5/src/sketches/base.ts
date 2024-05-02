import P5 from "p5";
import "../fullscreen.css"
import {Helper} from "../helpers/helper.ts";

// @ts-ignore
let helper: Helper;

function sketch(p: P5) {

    p.setup = () => {
        // canvas setup
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.angleMode("degrees")

        // helper setup
        helper = new Helper(p);
    }

    p.draw = () => {
        p.background(255)
    }
}

new P5(sketch)