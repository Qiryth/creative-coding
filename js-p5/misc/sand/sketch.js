let mouseIsOver = false;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseOver(() => mouseIsOver = true);
  canvas.mouseOut(() => mouseIsOver = false);
  
  background(220);
}

function draw() {
  if (mouseIsPressed) {
    loadPixels();
    
    
  }
  
  
  
  
}

class SandCorn {
  static corns = [];
  
  x;
  y;
  
  constructor(x, y) {
    this.x = x;
    this.y = y;
    SandCorn.corns.push(this)
  }
  
  draw() {
    
  }
}
