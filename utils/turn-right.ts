import { Orientation } from '../types';

export function turnRight(orientation: Orientation): Orientation {
  switch (orientation) {
    case 'N':
      return 'E';
    case 'E':
      return 'S';
    case 'S':
      return 'W';
    case 'W':
      return 'N';
  }
}
