let mySound;
let noiseScale = 10;

function preload() {
  soundFormats('mp3');
  mySound = loadSound('Hollow_Knight.mp3');
}

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  noFill();
  mySound.play();
  fft = new p5.FFT(0.9, 16384)
  noFill();
  stroke(10,10,10);
}

function draw() {
  let analyze = fft.analyze();
  //let wave = fft.waveform();

  let colorScale = 0.01
  background(
    255 * noise((frameCount + 2000) * colorScale),
    255 * noise( colorScale * (frameCount + 1000)),
    255 * noise(frameCount * colorScale)
  );

  let noiseScale = 0.004;

  let count = 0;

  for (let y = 0; y < height + 10; y += 10) {
    for (let x = 0; x < width + 10; x += 10) {
      let nx = noiseScale * x;
      let ny = noiseScale * y;
      let nt = noiseScale * frameCount;

      strokeWeight(5)
      square(x, y, 10 * noise(analyze[count] * 0.2))
      count++;
    }
    count++;
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