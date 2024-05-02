import P5, {Vector, Renderer} from "p5";

export class Helper {
    static _instance: Helper;
    static _p: P5;

    // static
    static perpendicular2DNormalTo(vector: Vector): Vector {
        return vector.cross(new Vector(0, 0, 1)).normalize();
    }

    static reduceToCanvas(vector: Vector, canvas: Renderer) {
        vector.x = Math.min(Math.max(vector.x, 0), canvas.width);
        vector.y = Math.min(Math.max(vector.y, 0), canvas.height);
        return vector;
    }

    // instance
    constructor(p: P5) {
        if (Helper._instance) {
            return Helper._instance;
        }

        Helper._p = p;
    }

    createSinMapper(start: number, min: number, max: number, stepSize: number = 1): SinusMapper {
        return {
            _currentValue: start - stepSize,
            get next() {
                return Helper._p.map(
                    Helper._p.sin(this._currentValue+=stepSize), -1, 1, min, max);
            }
        }
    }
}

export type SinusMapper = {
    _currentValue: number,
    next: number
}