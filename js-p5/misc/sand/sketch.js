let mouseIsOver = false;
let cornPositions = [];
let below;

function setup() {
  pixelDensity(1)
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseOver(() => mouseIsOver = true);
  canvas.mouseOut(() => mouseIsOver = false);
  below = width;
  background(220);
}

function draw() {
  loadPixels();
  if (mouseIsPressed) {
    if (cornPositions[width * mouseY + mouseX] == null) {
      console.log("hello");
      new PixelCorn(width * mouseY + mouseX)
    }
  }

  for (let i = 0; i < PixelCorn.instances.length; i++) {
    PixelCorn.instances[i].update();
  }
  updatePixels();
}

function mouseToPixelIndex() {
  console.log(mouseX,length, mouseY, height);
  return width * mouseY + mouseX;
}

class PixelCorn {
  static instances = [];
  static idleInstances = [];
  static leftOrRight;
  
  pos;
  
  constructor(pos) {
    if (cornPositions[pos]) return;
    this.pos = pos;
    cornPositions[pos] = this;
    PixelCorn.instances.push(this)
    this.drawPixel()
  }

  drawPixel() {
    pixels[this.pos * 4] = 0;
    pixels[this.pos * 4 + 1] = 0;
    pixels[this.pos * 4 + 2] = 0;
    pixels[this.pos * 4 + 3] = 255;
  }

  clearPixel() {
    pixels[this.pos * 4] = 220;
    pixels[this.pos * 4 + 1] = 220;
    pixels[this.pos * 4 + 2] = 220;
    pixels[this.pos * 4 + 3] = 255;
  }
  
  update() {
    if (this.pos * 4 > pixels.length - below * 4) return;

    this.drop(below) || 
    this.drop(below + (PixelCorn.leftOrRight = random([-1, 1]))) || 
    this.drop(below + PixelCorn.leftOrRight * -1);
  }

  drop(nextIndex) {
    if (cornPositions[this.pos + nextIndex] == null) {
      cornPositions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      cornPositions[this.pos] = this;
    } else return false;
    return true;
  }
}
