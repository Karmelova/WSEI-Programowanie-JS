const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let balls = [];
const ballCount = 50;
const ballRadius = 10;
const collisionDistance = 100;

initializeBalls();
requestAnimationFrame(update);
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startButton').addEventListener('click', startSimulation);
    document.getElementById('resetButton').addEventListener('click', resetSimulation);
  });

function startSimulation() {
  initializeBalls();
  requestAnimationFrame(update);
}

function resetSimulation() {
  balls.forEach(ball => {
    ball.x = Math.random() * (canvas.width - 2 * ballRadius) + ballRadius;
    ball.y = Math.random() * (canvas.height - 2 * ballRadius) + ballRadius;
    ball.vx = ball.initialVx;
    ball.vy = ball.initialVy;
  });
}

function initializeBalls() {
  balls = [];
  for (let i = 0; i < ballCount; i++) {
    const initialVx = Math.random() - 0.5;
    const initialVy = Math.random() - 0.5;
    balls.push({
      x: Math.random() * (canvas.width - 2 * ballRadius) + ballRadius,
      y: Math.random() * (canvas.height - 2 * ballRadius) + ballRadius,
      vx: initialVx,
      vy: initialVy,
      initialVx: initialVx,
      initialVy: initialVy,
    });
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const ball of balls) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
      ball.vx *= -1;
    }

    if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
      ball.vy *= -1;
    }


    for (const otherBall of balls) {
      if (ball !== otherBall) {
        const distance = Math.sqrt((ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2);
        if (distance < collisionDistance) {
          ctx.beginPath();
          ctx.moveTo(ball.x, ball.y);
          ctx.lineTo(otherBall.x, otherBall.y);
          ctx.stroke();
        }
      }
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(update);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initializeBalls();
});
