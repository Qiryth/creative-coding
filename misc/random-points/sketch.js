let basePoints;
let currentPoints;
let targetPoints;
let interpolation = 0;

function setup() {
  createCanvas(400, 400);

  document.addEventListener("click", () => {
    togglePause();
  })

  basePoints = createArrayWithRandomVectors();
  targetPoints = createArrayWithRandomVectors();
  currentPoints = createArrayWithRandomVectors();
}

function draw() {
  background(220);
  beginShape();
  currentPoints.forEach(point => vertex(point.x, point.y));
  endShape(CLOSE);
  lerpPoints();
}

function lerpPoints() {
  interpolation += 0.03;
  currentPoints.forEach((currentPoint, index) => currentPoints[index] = p5.Vector.lerp(basePoints[index], targetPoints[index], interpolation));
  if (interpolation >= .99) {
    interpolation = 0;
    basePoints = targetPoints;
    targetPoints = createArrayWithRandomVectors()
  }
  console.log(interpolation);
}

function createArrayWithRandomVectors() {
  return Array.from({length: 10}, () => createVector(random(1, 400), random(1, 400), 0));
}

function togglePause() {
  if (isLooping()) noLoop();
  else loop();
}

