export const last = arr => arr[arr.length - 1];

export const first = arr => arr[0];

export const prop = val => obj => obj[val];

export const concat = x => y => x.concat(y);

export const removeFirst = arr => arr.slice(1);

export const removeLast = arr => arr.slice(0, arr.length - 1);

export const absMod = divider => val => val < 0 ? divider + val : val % divider;

export const randomVal = max => Math.floor(Math.random() * Math.floor(max));