let mouseIsOver = false;
let grainPositions = [];
let rowLenght;

function setup() {
  pixelDensity(1)
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseOver(() => mouseIsOver = true);
  canvas.mouseOut(() => mouseIsOver = false);
  canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault())
  rowLenght = width;
  background(220);
}

function draw() {
  loadPixels();
  if (mouseIsPressed) {
    if (grainPositions[width * mouseY + mouseX] == null) {
      mouseButton == LEFT ? new Sand(width * mouseY + mouseX) : new Water(width * mouseY + mouseX);
    }
  }

  for (let i = 0; i < PixelGrain.instances.length; i++) {
    PixelGrain.instances[i].update();
  }
  updatePixels();
}

function mouseToPixelIndex() {
  return width * mouseY + mouseX;
}


class PixelGrain {
  static instances = [];
  
  pos;
  color;
  bias;
  type;

  constructor(pos) {
    this.pos = pos;
    this.bias = random([-1, 1]);
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

class Sand extends PixelGrain {
  constructor(pos) {
    super(pos)
    if (grainPositions[pos]) return;
    grainPositions[this.pos] = this;
    PixelGrain.instances.push(this);
    this.color = {r: 0, g: 0, b: 0}
    this.type = 0;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - rowLenght * 4) return;

    if (this.bias < 0) {
      this.movePixel(rowLenght) || 
      (this.pos % rowLenght != 0 && this.movePixel(rowLenght + this.bias)) || 
      (this.pos % rowLenght != rowLenght - 1 && this.movePixel(rowLenght - this.bias));
    } else {
      this.movePixel(rowLenght) || 
      (this.pos % rowLenght != rowLenght - 1 && this.movePixel(rowLenght + this.bias)) || 
      (this.pos % rowLenght != 0 && this.movePixel(rowLenght - this.bias));
    }
  }

  movePixel = (nextIndex) => {
    if (grainPositions[this.pos + nextIndex] == null) {
      grainPositions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      grainPositions[this.pos] = this;
    } else if(grainPositions[this.pos + nextIndex].type == 1) {
      grainPositions[this.pos] = null;
      this.clearPixel();
      grainPositions[this.pos + nextIndex].movePixel(-rowLenght + this.bias) ||
      grainPositions[this.pos + nextIndex].movePixel(-rowLenght - this.bias) ||
      grainPositions[this.pos + nextIndex].movePixel(-rowLenght);
      this.pos += nextIndex;
      this.drawPixel();
      grainPositions[this.pos] = this;
    } else return false;
    return true;
  }
}

class Water extends PixelGrain {
  constructor(pos) {
    super(pos)
    if (grainPositions[pos]) return;
    grainPositions[this.pos] = this;
    PixelGrain.instances.push(this);
    this.color = {r: 100, g: 100, b: 255};
    this.type = 1;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - rowLenght * 4) return;

    if (this.bias < 0) {
      this.movePixel(rowLenght) || 
      (this.pos % rowLenght != 0 && this.movePixel(rowLenght + this.bias)) || 
      (this.pos % rowLenght != rowLenght - 1 && this.movePixel(rowLenght - this.bias)) ||
      (this.pos % rowLenght != 0 && this.movePixel(this.bias)) ||
      (this.pos % rowLenght != rowLenght - 1 && this.movePixel(-this.bias))
    } else {
      this.movePixel(rowLenght) || 
      (this.pos % rowLenght != rowLenght - 1 && this.movePixel(rowLenght + this.bias)) || 
      (this.pos % rowLenght != 0 && this.movePixel(rowLenght - this.bias)) ||
      (this.pos % rowLenght != rowLenght - 1 && this.movePixel(this.bias)) ||
      (this.pos % rowLenght != 0 && this.movePixel(-this.bias))
    }
  }

  movePixel = (nextIndex) => {
    if (grainPositions[this.pos + nextIndex] == null) {
      grainPositions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      grainPositions[this.pos] = this;
    } else return false;
    return true;
  }
}