let blocks = [
  "We add some |%|.",
  "Some |& |should not be forgotten!",
  "A little bit of |&|.",
  "Pour in 200ml of |&|.",
  "Srinkle 10el |% |on top.",
  "Add a pinch of |%|.",
  "Mix well!",
  "Fold in the |%|!",
  "Chop the |% |into little pieces.",
  "Mix in the |& |and stir it well.",
  "Pre chew some |% |and spit it in.",
  "Grate a lot of |% |!",
  "Drop 2ml |& |from very high up.",
  "Splash in droplets of |&|."
];

let backgroundColor = {r: 80, g: 80, b: 80, a: 255};
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

  powder = [
    ["Chocolate", color(123, 63, 0, 255)],
    ["Flour", color(248, 241, 255, 255)],
    ["Berries", color(160, 22, 65, 255)],
    ["Wasabi", color(89, 165, 35, 255)],
    ["Salad", color(158, 216, 112, 255)],
    ["Oats", color(216, 194, 157, 255)],
    ["Beets", color(116, 27, 71, 255)]
  ];

  liquids = [
    ["Water", color(100, 200, 255, 255)],
    ["Oil", color(109, 113, 46, 255)],
    ["Vinegar", color(250, 249, 238, 255)],
    ["Milk", color(253, 255, 245, 255)],
    ["Lemon Juice", color(245, 251, 150, 255)],
    ["Broth", color(158, 107, 23, 255)],
    ["Sriracha", color(136, 21, 4, 255)]
  ];

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
  let text = [];
  let blockAmount = random([2, 3, 4]);

  for (let i = 0; i < blockAmount; i++) {
    let currentBlock = random(blocks);
    let splits = currentBlock.split("|");

    for (let j = 0; j < splits.length; j++) {
      if (splits[j] == "%") text.push(random(powder));
      else if (splits[j] == "% ") {
        text.push(random(powder));
        text[text.length - 1][0] += " ";
      }
      else if (splits[j] == "&") text.push(random(liquids));
      else if (splits[j] == "& ") {
        text.push(random(liquids));
        text[text.length - 1][0] += " ";
      }
      else text.push([splits[j], color(0, 0, 0, 255)]);

      if (j >= splits.length - 1) text[text.length - 1][0] += " ";
    }
  }

  text.push(["END"]);
  return text;
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
  words = [];
  currentWord = "";
  textAndColors = generatedTextAndColors;
  currentX = textX;
  currentY = textY;

  textAndColorsIndex = wordsIndex = currentWordIndex = 0;

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
      setTimeout(() => Solid.clear(), 3000)
      setTimeout(() => drawText(generateText()), 5000)
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
    if([100, 109, 136, 158, 245, 250, 253].includes(pixels[i])) {
      new Liquid(i / 4, pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]);
    } else if ([89, 116, 123, 158, 160, 166, 216, 248].includes(pixels[i])) {
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