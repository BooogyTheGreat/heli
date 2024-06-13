// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let explosion = document.createElement("audio");
explosion.src = "sound/explosion.wav";

let propeller = document.createElement("audio");
propeller.src = "sound/propeller.wav";

let count = 0;
let distance = 0;
let best = 0;
let mouseIsPressed = false;
// Draw Function

let state = "start";
heli = {
  x: 200,
  y: 250,
  w: 80,
  h: 40,
  speed: -10,
  accel: 0.5,
};
wall1 = {
  x: cnv.width,
  y: Math.random() * 300 + 100,
  w: 50,
  h: 100,
  accel: 3,
};
wall2 = {
  x: cnv.width + 500,
  y: Math.random() * 300 + 100,
  w: 50,
  h: 100,
  accel: 3,
};
wall3 = {
  x: cnv.width + 1000,
  y: Math.random() * 300 + 100,
  w: 50,
  h: 100,
  accel: 3,
};

window.addEventListener("load", draw);

function draw() {
  if (state === "start") {
    drawStart();
  } else if (state === "gameon") {
    runGame();
  } else if (state === "gameover") {
    drawGameOver();
  }

  // Request Animation Frame
  requestAnimationFrame(draw);
}

document.addEventListener("mousedown", mousedownHandler);
document.addEventListener("mouseup", mouseupHandler);

function mousedownHandler() {
  mouseIsPressed = true;

  if (state === "start") {
    state = "gameon";
  }
}

function mouseupHandler() {
  mouseIsPressed = false;
}
