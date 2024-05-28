let mySound;
let noiseScale = 10;
let resolution = 128;
let xAmount;
let yAmount;

function preload() {
  soundFormats('mp3');
  mySound = loadSound('Hollow_Knight.mp3');
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  noFill();
  mySound.play();
  fft = new p5.FFT(0.9, resolution)
  noFill();
  stroke(10,10,10);
  strokeWeight(5)

  xAmount = width / resolution;
  yAmount = height / resolution;
}

function draw() {
  let analyze = fft.analyze();

  let colorScale = 0.01
  background(
    255 * noise((frameCount + 2000) * colorScale),
    255 * noise( colorScale * (frameCount + 1000)),
    255 * noise(frameCount * colorScale)
  );

  for (let y = 0; y < analyze.length; y++)
  for (let x = 0; x < analyze.length; x++) {
    square(x * xAmount, y * yAmount, (xAmount + yAmount) / 2 * noise(((analyze[x] + analyze[y]) / 2) * 0.02))
  }
}

function keyPressed() {
  if (key in keyFunction) keyFunction[key]();
}

const keyFunction = {
  " ": () => mySound.isPlaying() ? mySound.pause() : mySound.play(),
  "0": () => mySound.jump(0),
  "1": () => mySound.jump(150),
  "2": () => mySound.jump(290),
  "3": () => mySound.jump(477),
  "4": () => mySound.jump(617),
  "5": () => mySound.jump(801),
  "6": () => mySound.jump(962),
  "7": () => mySound.jump(1139),
  "8": () => mySound.jump(1317),
  "9": () => mySound.jump(1480),
}