// FUNCTIONS

// Draw Start Screen
function drawStart() {
  drawMainComponents();

  // Start Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("CLICK TO START", 350, 285);

  ctx.font = "25px Consolas";
  ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
  ctx.fillText("RELEASE TO GO DOWN", 415, 480);
}

function runGame() {
  moveHeli();

  moveWalls();

  drawGame();

  checkCollisions();

  distanceCalc();

  wall1.accel += 0.001;
  wall2.accel += 0.001;
  wall3.accel += 0.001;
}

function distanceCalc() {
  count++;
  if (count == 10) {
    distance += 1;
    count = 0;
  }
}

function moveHeli() {
  if (mouseIsPressed) {
    heli.speed += -1;
  }

  heli.speed += heli.accel;

  if (heli.speed > 5) {
    heli.speed = 5;
  } else if (heli.speed < -5) {
    heli.speed = -5;
  }

  heli.y += heli.speed;
}

// Draw Game Elements
function drawGame() {
  drawMainComponents();

  drawWalls();
}

// Draw Game Over Screen
function drawGameOver() {
  drawMainComponents();

  drawWalls();

  // Circle around Helicopter
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(heli.x + heli.w / 2, heli.y + heli.h / 2, 60, 0, 2 * Math.PI);
  ctx.stroke();

  // Game Over Text
  ctx.font = "40px Consolas";
  ctx.fillStyle = "lightblue";
  ctx.fillText("GAME OVER", 350, 285);
}

function drawWalls() {
  ctx.fillStyle = "green";
  ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
  ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
  ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
}

function drawMainComponents() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // Green Bars
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, cnv.width, 50);
  ctx.fillRect(0, cnv.height - 50, cnv.width, 50);

  // Green Bar Text
  ctx.font = "30px Consolas";
  ctx.fillStyle = "black";
  ctx.fillText("HELICOPTER GAME", 25, 35);
  ctx.fillText(`DISTANCE: ${distance}`, 25, cnv.height - 15);
  ctx.fillText(`BEST: ${best}`, cnv.width - 250, cnv.height - 15);

  // Helicopter
  ctx.drawImage(heliImg, heli.x, heli.y);
}

function moveWalls() {
  wall1.x -= wall1.accel;
  if (wall1.x + wall1.w < 0) {
    wall1.x = wall3.x + 500;
    wall1.y = Math.random() * 300 + 100;
  }

  wall2.x -= wall2.accel;
  if (wall2.x + wall2.w < 0) {
    wall2.x = wall1.x + 500;
    wall2.y = Math.random() * 300 + 100;
  }

  wall3.x -= wall3.accel;
  if (wall3.x + wall3.w < 0) {
    wall3.x = wall2.x + 500;
    wall3.y = Math.random() * 300 + 100;
  }
}

function rectCollide(rect1, rect2) {
  if (
    rect1.x + rect1.w > rect2.x &&
    rect1.x < rect2.x + rect2.w &&
    rect1.y + rect1.h > rect2.y &&
    rect1.y < rect2.y + rect2.h
  ) {
    return true;
  } else {
    return false;
  }
}

function checkCollisions() {
  if (heli.y < 50 || heli.y > 510) {
    gameOver();
  }
  if (
    rectCollide(heli, wall1) ||
    rectCollide(heli, wall2) ||
    rectCollide(heli, wall3)
  ) {
    gameOver();
  }
}

function gameOver() {
  explosion.play();
  state = "gameover";

  if (distance > best) {
    best = distance;
  }

  setTimeout(reset, 2000);
}

function reset() {
  state = "start";
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
  distance = 0;
}
