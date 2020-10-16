import { last, first, prop, concat, removeFirst, removeLast, absMod, randomVal } from './helpers.js';

export const NORTH = { x: 0, y: -1};
export const SOUTH = { x: 0, y: 1};
export const WEST = { x: -1, y: 0};
export const EAST = { x: 1, y: 0};

export const grid = {
  rows: 15,
  cols: 20,
};

export const initialState = () => ({
  snake: [],
  direction: [WEST],
  apple: { x: 4, y: 10 }
});

const x = obj => prop('x')(obj);
const y = obj => prop('y')(obj);

const isCoordsEqual = obj1 => obj2 => x(obj1) === x(obj2) && y(obj1) === y(obj2);
const isValidDirection = state => direction => Boolean(x(last(state.direction)) + x(direction));
const isSnakeSpawned = state => state.snake.length !== 0;
const willSnakeCrash = (state) => Boolean(state.snake.find(val => isCoordsEqual(val)(nextHead(state))))
const willEatApple = (state) => isSnakeSpawned(state) && isCoordsEqual(first(state.snake))(state.apple);

const randomPos = () => ({ x: randomVal(grid.cols), y: randomVal(grid.rows) });

const nextHead = (state) => ({
  x: absMod(grid.cols)(x(first(state.snake)) + x(first(state.direction))),
  y: absMod(grid.rows)(y(first(state.snake)) + y(first(state.direction)))
});

const nextSnake = state => willSnakeCrash(state) 
  ? [] 
  : isSnakeSpawned(state) ? 
    concat([nextHead(state)])(willEatApple(state) ? state.snake : removeLast(state.snake)) : 
    [randomPos()];

const nextApple = (state) => willEatApple(state) ? randomPos() : state.apple;

const nextDirection = (state) => 
  state.direction.length === 1 ? state.direction : removeFirst(state.direction);

export const next = state => ({
  direction: nextDirection(state),
  apple: nextApple(state),
  snake: nextSnake(state)
});

export const changeDirection = state => direction => 
  isValidDirection(state)(direction) ? { ...state, direction: concat(state.direction)([direction]) } : state;
