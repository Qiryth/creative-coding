import {Vector} from "p5";

export class VectorHelper {
    static perpendicular2DNormalTo(vector: Vector): Vector {
        return vector.cross(new Vector(0, 0, 1)).normalize();
    }
}