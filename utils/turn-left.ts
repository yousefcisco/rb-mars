import { Orientation } from '../types';

export function turnLeft(orientation: Orientation): Orientation {
  switch (orientation) {
    case 'N':
      return 'W';
    case 'W':
      return 'S';
    case 'S':
      return 'E';
    case 'E':
      return 'N';
  }
}
