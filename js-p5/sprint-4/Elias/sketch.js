let rowLenght;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  background(220);
  rowLenght = width;
}

function draw() {
  loadPixels();
  Powder.spawnAtPosition(10, 10, {r: 200, g: 100, b: 50});
  Liquid.spawnAtPosition(30, 80, {r: 100, g: 200, b: 255});
  Powder.spawnAtPosition(100, 100, {r: 100, g: 100, b: 20});
  Liquid.spawnAtPosition(500, 200, {r: 255, g: 10, b: 40});
  Powder.spawnAtPosition(900, 150, {r: 255, g: 100, b:100})
  PixelGrain.update();
  updatePixels();
}

class PixelGrain {
  static instances = [];
  static positions = [];

  static spawnAtPosition(x, y, color) {
    let pos = rowLenght * y + x;
    [
      pos + 1, pos -1, pos + 3, pos -3,
      pos + rowLenght, pos - rowLenght, pos + rowLenght * 3, pos - rowLenght * 3,
      pos + rowLenght + 2, pos + rowLenght - 2, pos - rowLenght + 2, pos - rowLenght - 2,
      pos + rowLenght * 2 + 1, pos + rowLenght * 2 - 1, pos - rowLenght * 2 + 1, pos - rowLenght * 2 - 1
    ].forEach(position => {
      if (random([true, false, false, false]) && PixelGrain.positions[pos] == null) new this(position, color)
    })
  }

  static update() {
    for (let i = 0; i < PixelGrain.instances.length; i++) {
      this.instances[i].update();
    }
  }

  static clear() {
    PixelGrain.instances = [];
    PixelGrain.positions = [];
  }
  
  pos;
  color;
  bias;
  type;

  constructor(pos, color) {
    this.pos = pos;
    this.bias = random([-1, 1]);
    this.color = color;
  }

  drawPixel() {
    pixels[this.pos * 4] = this.color.r;
    pixels[this.pos * 4 + 1] = this.color.g;
    pixels[this.pos * 4 + 2] = this.color.b;
    pixels[this.pos * 4 + 3] = 255;
  }

  clearPixel() {
    pixels[this.pos * 4] = 220;
    pixels[this.pos * 4 + 1] = 220;
    pixels[this.pos * 4 + 2] = 220;
    pixels[this.pos * 4 + 3] = 255;
  }
}

class Powder extends PixelGrain {
  constructor(pos, color) {
    super(pos, color)
    PixelGrain.positions[this.pos] = this;
    PixelGrain.instances.push(this);
    this.type = 0;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - rowLenght * 4) return;

    if (this.bias < 0) {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias);
    } else {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias);
    }
  }

  movePixel = (nextIndex) => {
    if (PixelGrain.positions[this.pos + nextIndex] == null) {
      PixelGrain.positions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      PixelGrain.positions[this.pos] = this;
    } else if(PixelGrain.positions[this.pos + nextIndex].type == 1) {
      PixelGrain.positions[this.pos] = null;
      this.clearPixel();
      PixelGrain.positions[this.pos + nextIndex].movePixel(-rowLenght + this.bias) ||
      PixelGrain.positions[this.pos + nextIndex].movePixel(-rowLenght - this.bias) ||
      PixelGrain.positions[this.pos + nextIndex].movePixel(-rowLenght);
      this.pos += nextIndex;
      this.drawPixel();
      PixelGrain.positions[this.pos] = this;
    } else return false;
    return true;
  }
}

class Liquid extends PixelGrain {
  constructor(pos, color) {
    super(pos, color)
    PixelGrain.positions[this.pos] = this;
    PixelGrain.instances.push(this);
    this.type = 1;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - rowLenght * 4) return;

    if (this.bias < 0) {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias) ||
      this.movePixel(this.bias) ||
      this.movePixel(-this.bias);
    } else {
      this.movePixel(rowLenght) || 
      this.movePixel(rowLenght + this.bias) || 
      this.movePixel(rowLenght - this.bias) ||
      this.movePixel(this.bias) ||
      this.movePixel(-this.bias);
    }
  }

  movePixel = (nextIndex) => {
    if (PixelGrain.positions[this.pos + nextIndex] == null) {
      PixelGrain.positions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      PixelGrain.positions[this.pos] = this;
    } else return false;
    return true;
  }
}