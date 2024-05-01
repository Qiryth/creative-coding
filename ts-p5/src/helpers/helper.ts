import {Vector, Renderer} from "p5";

export class Helper {
    static perpendicular2DNormalTo(vector: Vector): Vector {
        return vector.cross(new Vector(0, 0, 1)).normalize();
    }

    static reduceToCanvas(vector: Vector, canvas: Renderer) {
        vector.x = Math.min(Math.max(vector.x, 0), canvas.width);
        vector.y = Math.min(Math.max(vector.y, 0), canvas.height);
        return vector;
    }
}