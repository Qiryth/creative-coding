let mouseIsOver = false;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.mouseOver(() => mouseIsOver = true);
  canvas.mouseOut(() => mouseIsOver = false);
}

function draw() {
  background(220);


  if (mouseIsOver) {
    let points = generateLine(createVector(200, 200), createVector(mouseX, mouseY))
    beginShape();
    noFill();
    points.forEach(dot => vertex(dot.x, dot.y))
    endShape();
  }
}

function generateLine(start, end) {
  let norm = createVector(0, 0, 0);

  norm.mag()
  
  let normal = p5.Vector.cross(end.sub(start), createVector(0,0,1));
  


  return [start].concat(createArrayWithRandomVectors(start, end), [end]);
}

function createArrayWithRandomVectors(start, end) {
  return Array.from({length: 2}, () => createVector(random(start.x, end.x), random(start.y, end.y), 0));
}
