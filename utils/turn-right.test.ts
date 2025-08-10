import { Orientation } from '../types';
import { turnLeft } from './turn-left';
import { turnRight } from './turn-right';

describe('turnRight', () => {
  it('should turn North to East', () => {
    expect(turnRight('N')).toBe('E');
  });

  it('should turn East to South', () => {
    expect(turnRight('E')).toBe('S');
  });

  it('should turn South to West', () => {
    expect(turnRight('S')).toBe('W');
  });

  it('should turn West to North', () => {
    expect(turnRight('W')).toBe('N');
  });

  it('should handle all orientations correctly', () => {
    const orientations: Orientation[] = ['N', 'E', 'S', 'W'];
    const expected: Orientation[] = ['E', 'S', 'W', 'N'];

    orientations.forEach((orientation, index) => {
      expect(turnRight(orientation)).toBe(expected[index]);
    });
  });

  it('should be opposite of turnLeft', () => {
    const orientations: Orientation[] = ['N', 'E', 'S', 'W'];

    orientations.forEach((orientation) => {
      const rightThenLeft = turnLeft(turnRight(orientation));
      const leftThenRight = turnRight(turnLeft(orientation));
      expect(rightThenLeft).toBe(orientation);
      expect(leftThenRight).toBe(orientation);
    });
  });
});
