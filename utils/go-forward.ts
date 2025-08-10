import { Orientation } from '../types';

export function goForward(
  x: number,
  y: number,
  orientation: Orientation,
): [number, number] {
  switch (orientation) {
    case 'N':
      return [x, y + 1];
    case 'E':
      return [x + 1, y];
    case 'S':
      return [x, y - 1];
    case 'W':
      return [x - 1, y];
  }
}
