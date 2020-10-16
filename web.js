import { next, initialState, grid, changeDirection, NORTH, SOUTH, WEST, EAST } from './snake.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let state = initialState();

const multColWidth = (x) => (canvas.width / grid.cols) * x;
const multRowWidth = (y) => (canvas.height / grid.rows) * y;

const draw = () => {
  // draw field
  ctx.fillStyle = "#47453d";
  ctx.fillRect(0, 0, canvas.width , canvas.height);

  // draw apple 
  const circle = new Path2D();
  circle.arc(multColWidth(state.apple.x + 0.5), multRowWidth(state.apple.y + 0.5), multColWidth(0.4), 0, 2 * Math.PI);
  ctx.fillStyle = "#ad2444";
  ctx.fill(circle);

  // draw snake
  const borderWidth = multColWidth(1) * 0.1; 
  ctx.fillStyle = "#39ba29";
  state.snake.map(val => 
    ctx.fillRect(multColWidth(val.x) + borderWidth, multRowWidth(val.y) + borderWidth, multColWidth(1) - 2 * borderWidth, multRowWidth(1) - 2 * borderWidth));
}

const step = t1 => t2 => {
  if (t2 - t1 > 100) {
    state = next(state);
    draw();
    window.requestAnimationFrame(step(t2));
  } else {
    window.requestAnimationFrame(step(t1));
  }
}

window.addEventListener("keydown", e => {
  const changeDirectionTo = changeDirection(state);

  switch (e.key) {
    case 'w':
      state = changeDirectionTo(NORTH);
      break;

    case 's':
      state = changeDirectionTo(SOUTH);
      break;

    case 'a':
      state = changeDirectionTo(WEST);
      break;

    case 'd':
      state = changeDirectionTo(EAST);
      break;
  
    default:
      break;
  }
})

draw();
window.requestAnimationFrame(step(0));