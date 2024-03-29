window.onload = function () {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000 / 15);
};

let px = 10,
  py = 10,
  xv = 0,
  yv = 0,
  gs = 20,
  tc = 20,
  ax = Math.floor(Math.random() * tc),
  ay = Math.floor(Math.random() * tc),
  tail = 4;
const trail = [];

const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const spawnFood = () => {
  ax = Math.floor(Math.random() * tc);
  ay = Math.floor(Math.random() * tc);
  trail.forEach((v) => {
    if (v.x === ax && v.y === ay) spawnFood();
  });
};

function game() {
  px += xv;
  py += yv;
  if (px < 0) {
    px = tc - 1;
  }
  if (px > tc - 1) {
    px = 0;
  }
  if (py < 0) {
    py = tc - 1;
  }
  if (py > tc - 1) {
    py = 0;
  }
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.fillStyle = "lime";
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
    if (trail[i].x == px && trail[i].y == py) {
      tail = 4;
    }
  }
  trail.push({ x: px, y: py });
  while (trail.length > tail) {
    trail.shift();
  }

  if (ax == px && ay == py) {
    tail++;
    spawnFood();
  }
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);

  ctx.fillStyle = randomColor();
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      if (xv === 1) return;
      xv = -1;
      yv = 0;
      break;
    case 38:
      if (yv === 1) return;
      xv = 0;
      yv = -1;
      break;
    case 39:
      if (xv === -1) return;
      xv = 1;
      yv = 0;
      break;
    case 40:
      if (yv === -1) return;
      xv = 0;
      yv = 1;
      break;
  }
}
