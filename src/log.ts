export enum logColor {
  green = "#005b5a",
  yellow = "#e7b55b",
  red = "#a71368",
  hui = "#95b1ba",
  blue = "#17507d"
}

export const log = (s: string, c: logColor) => {
  console.log(`%c${s}`, `color: ${c}`);
};
