let powder = ["flour", "chocolate", "yeast", "nuts", "berries"];
let liquids = ["milk", "water", "oil", "vinegar", "broth", "lemon juice", "egg white", "egg yolk"];
let backgroundColor = {r: 220, g: 220, b: 220, a: 255};
let solidColor = {r: 0, g: 0, b: 0, a: 255};
let textX;
let textY;

function preload() {
  font = loadFont("joystix_monospace.otf");
}

function setup() {
  pixelDensity(1)
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor.r, backgroundColor.g, backgroundColor.b, backgroundColor.a);

  textX = 50;
  textY = width / 30;

  textSize(textY)
  noStroke()
  textFont(font);

  drawText(generateText());
}

function draw() {
  loadPixels();
  for (let i = 0; i < PixelParticle.instances.length; i++) {
    PixelParticle.instances[i].update();
  }
  updatePixels();
}

function generateText() {
  return [
    ["Hello, I need some ", color(0, 0, 0, 255)],
    ["Water", color(100, 200, 255, 255)],
    [". ", color(0,0,0,255)],
    ["Also ", color(0, 0, 0, 255)],
    ["Chocolate ", color(123, 63, 0, 255)],
    ["would be nice! ", color(0,0,0,255)],
    ["A cup of ", color(0, 0, 0, 255)],
    ["Milk ", color(253, 255, 245, 255)],
    ["is a must! ", color(0,0,0,255)],
    ["Hello, I need some ", color(0, 0, 0, 255)],
    ["Water", color(100, 200, 255, 255)],
    [". ", color(0,0,0,255)],
    ["Also ", color(0, 0, 0, 255)],
    ["Chocolate ", color(123, 63, 0, 255)],
    ["would be nice! ", color(0,0,0,255)],
    ["A cup of ", color(0, 0, 0, 255)],
    ["Milk ", color(253, 255, 245, 255)],
    ["is a must!", color(0,0,0,255)],
    ["End"]
  ]
}

// Draw Text
let words = [];
let textAndColors;
let currentWord = "";
let currentColor;
let textAndColorsIndex = 0;
let wordsIndex = 0;
let currentWordIndex = 0;
let currentX;
let currentY;

function drawText(generatedTextAndColors) {
  textAndColors = generatedTextAndColors;
  currentX = textX;
  currentY = textY;

  printLetters();
}

function printLetters() {
  if (!words[wordsIndex]) {
    wordsIndex = 0;
    words = textAndColors[textAndColorsIndex][0].split(" ");
    currentColor = textAndColors[textAndColorsIndex++][1];
  }
  if (!currentWord[currentWordIndex]) {
    currentWordIndex = 0;
    currentWord = words[wordsIndex] + (wordsIndex++ < words.length - 1 ? " " : "");
    if (currentX + textWidth(currentWord) > width) {
      currentY += textY;
      currentX = textX;
    }

    if (currentColor) fill(currentColor);
    else {
      convertPixels();
      return;
    }
  }

  text(currentWord[currentWordIndex], currentX, currentY);
  currentX += textWidth(currentWord[currentWordIndex++]);

  setTimeout(() => printLetters(), 50)
}

// Pixel Physics
function convertPixels() {
  loadPixels();
  for(let i = 0; i < pixels.length; i+=4) {
    if([100, 253].includes(pixels[i])) {
      new Liquid(i / 4, pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
    } else if ([123].includes(pixels[i])) {
      new Powder(i / 4, pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
    } else if (pixels[i] == 0) {
      new Solid(i / 4, pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
    }
  }
  updatePixels();
}

class PixelParticle {
  static instances = [];
  static positions = [];
  
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
    pixels[this.pos * 4 + 3] = this.color.a;
  }

  clearPixel() {
    pixels[this.pos * 4] = backgroundColor.r;
    pixels[this.pos * 4 + 1] = backgroundColor.g;
    pixels[this.pos * 4 + 2] = backgroundColor.b;
    pixels[this.pos * 4 + 3] = backgroundColor.a;
  }
}

class Powder extends PixelParticle {
  constructor(pos, r, g, b, a) {
    super(pos)
    if (PixelParticle.positions[pos]) return;
    PixelParticle.positions[this.pos] = this;
    PixelParticle.instances.push(this);
    this.color = {r: r, g: g, b: b, a: a}
    this.type = 0;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - width * 4) return;

    if (this.bias < 0) {
      this.movePixel(width) || 
      (this.pos % width != 0 && this.movePixel(width + this.bias)) || 
      (this.pos % width != width - 1 && this.movePixel(width - this.bias));
    } else {
      this.movePixel(width) || 
      (this.pos % width != width - 1 && this.movePixel(width + this.bias)) || 
      (this.pos % width != 0 && this.movePixel(width - this.bias));
    }
  }

  movePixel = (nextIndex) => {
    if (PixelParticle.positions[this.pos + nextIndex] == null) {
      PixelParticle.positions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      PixelParticle.positions[this.pos] = this;
    } else if(PixelParticle.positions[this.pos + nextIndex].type == 1) {
      PixelParticle.positions[this.pos] = null;
      this.clearPixel();
      PixelParticle.positions[this.pos + nextIndex].movePixel(-width + this.bias) ||
      PixelParticle.positions[this.pos + nextIndex].movePixel(-width - this.bias) ||
      PixelParticle.positions[this.pos + nextIndex].movePixel(-width);
      this.pos += nextIndex;
      this.drawPixel();
      PixelParticle.positions[this.pos] = this;
    } else return false;
    return true;
  }
}

class Liquid extends PixelParticle {
  constructor(pos, r, g, b, a) {
    super(pos)
    if (PixelParticle.positions[pos]) return;
    PixelParticle.positions[this.pos] = this;
    PixelParticle.instances.push(this);
    this.color = {r: r, g: g, b: b, a: a};
    this.type = 1;
    this.drawPixel();
  }

  update() {
    if (this.pos * 4 > pixels.length - width * 4) return;

    if (this.bias < 0) {
      this.movePixel(width) || 
      (this.pos % width != 0 && this.movePixel(width + this.bias)) || 
      (this.pos % width != width - 1 && this.movePixel(width - this.bias)) ||
      (this.pos % width != 0 && this.movePixel(this.bias)) ||
      (this.pos % width != width - 1 && this.movePixel(-this.bias))
    } else {
      this.movePixel(width) || 
      (this.pos % width != width - 1 && this.movePixel(width + this.bias)) || 
      (this.pos % width != 0 && this.movePixel(width - this.bias)) ||
      (this.pos % width != width - 1 && this.movePixel(this.bias)) ||
      (this.pos % width != 0 && this.movePixel(-this.bias))
    }
  }

  movePixel = (nextIndex) => {
    if (PixelParticle.positions[this.pos + nextIndex] == null) {
      PixelParticle.positions[this.pos] = null;
      this.clearPixel();
      this.pos += nextIndex;
      this.drawPixel();
      PixelParticle.positions[this.pos] = this;
    } else return false;
    return true;
  }
}

class Solid extends PixelParticle {
  static instances = [];
  static clear() {
    loadPixels();
    Solid.instances.forEach(solid => {
      PixelParticle.positions[solid.pos] = null;
      solid.clearPixel();
    })
    updatePixels();
  }

  constructor(pos) {
    super(pos)
    if (PixelParticle.positions[pos]) return;
    PixelParticle.positions[this.pos] = this;
    this.color = {r: 0, g: 0, b: 0, a: 255}
    this.type = 2;
    Solid.instances.push(this);
    this.drawPixel();
  }
}