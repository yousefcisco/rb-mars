import { Orientation } from '../types';
import { turnLeft } from './turn-left';

describe('turnLeft', () => {
  it('should turn North to West', () => {
    expect(turnLeft('N')).toBe('W');
  });

  it('should turn West to South', () => {
    expect(turnLeft('W')).toBe('S');
  });

  it('should turn South to East', () => {
    expect(turnLeft('S')).toBe('E');
  });

  it('should turn East to North', () => {
    expect(turnLeft('E')).toBe('N');
  });

  it('should handle all orientations correctly', () => {
    const orientations: Orientation[] = ['N', 'E', 'S', 'W'];
    const expected: Orientation[] = ['W', 'N', 'E', 'S'];

    orientations.forEach((orientation, index) => {
      expect(turnLeft(orientation)).toBe(expected[index]);
    });
  });
});
