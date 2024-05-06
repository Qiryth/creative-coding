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

            get nextValue() {
                return Helper._p.map(
                    Helper._p.sin(this._currentValue+=stepSize), -1, 1, min, max);
            }
        }
    }

    createFlippedSinMapper(start: number, min: number, max: number, stepSize: number = 1): SinusMapper {
        return {
            _currentValue: start - stepSize,
            get nextValue() {
                return Helper._p.map(
                    (Helper._p.sin(this._currentValue+=stepSize) + 2) % 2 - 1, -1, 1, min, max);
            }
        }
    }

    createNoiseMapper(level: number, scale: number, options?: NoiseMapperOptions) : NoiseMapper {
        const width = options?.width || Helper._p.width;
        const height = options?.height || Helper._p.height;
        const mode: "frame" | "increment" = options?.mode || "frame";

        return {
            _offset: options?.offset || Math.floor(Helper._p.random(1000)),
            increment() {
                if (mode == "frame") return;
                this._offset++;
            },
            decrement() {
                if (mode == "frame") return;
                this._offset--;
            },
            get _currentValue() {
                return mode == "frame" ? Helper._p.frameCount + this._offset : this._offset;
            },
            get nextValue() {
                this.increment();
                return level * Helper._p.noise(this._currentValue * scale);
            },
            get nextWidth() {
                this.increment();
                let x = 0;
                return Array.from(
                    {length: width}, () => level * Helper._p.noise(
                        x++ * scale, this._currentValue * scale
                    )
                )
            },
            get nextHeight() {
                this.increment();
                let y = 0;
                return Array.from(
                    {length: height}, () => level * Helper._p.noise(
                        y++ * scale, this._currentValue * scale
                    )
                )
            },
            get nextMatrix() {
                let x = 0;
                return Array.from(
                    {length: width}, () => {
                        let y = 0;
                        let array = Array.from(
                            {length: height}, () => level * Helper._p.noise(
                                this._currentValue * scale, x * scale, y++ * scale
                            )
                        )
                        x++;
                        return array;
                    }
                )
            }
        }
    }
}

export type SinusMapper = {
    _currentValue: number,
    nextValue: number
}

export type NoiseMapper = {
    _offset: number,
    _currentValue: number,
    nextValue: number,
    nextWidth: number[],
    nextHeight: number[],
    nextMatrix: number[][],
    increment: () => void;
    decrement: () => void;
}

type NoiseMapperOptions = {
    offset?: number,
    width?: number,
    height?: number,
    mode?: "frame" | "increment"
}
