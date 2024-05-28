let mySound;

function preload() {
  soundFormats('mp3');
  mySound = loadSound('Hollow_Knight.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound.play();
  fft = new p5.FFT(0.8, 256)
}

function draw() {
  background(220);

  let analyze = fft.analyze();
  //let wave = fft.waveform();

  for (let i = 0; i < analyze.length && i < frameCount / 20; i ++) {
    let offset = 1234567 * i;
    let weight = map(analyze[i], 0, 255, 0, 100)

    let x = width * noise(0.0025 * frameCount + offset);
    let y = height * noise(0.0025 * frameCount + 12345 + offset);

    stroke(analyze[i] / 3 + 10, analyze[i] / 3 + 10, analyze[i] + 10)
    strokeWeight(weight);
    point(x, y);
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