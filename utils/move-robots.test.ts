import { Instruction, Robot } from '../types';

import { moveRobots } from './move-robots';

describe('moveRobots', () => {
  const gridMaxX = 5;
  const gridMaxY = 3;

  describe('single robot scenarios', () => {
    it('should handle robot with no instructions', () => {
      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'N',
          instruction: [],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0]).toEqual({
        x: 1,
        y: 1,
        orientation: 'N',
        instruction: [],
        isLost: false,
      });
    });

    it('should turn robot left correctly', () => {
      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'N',
          instruction: ['L'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].orientation).toBe('W');
      expect(result[0].x).toBe(1);
      expect(result[0].y).toBe(1);
      expect(result[0].isLost).toBe(false);
    });

    it('should turn robot right correctly', () => {
      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'N',
          instruction: ['R'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].orientation).toBe('E');
      expect(result[0].x).toBe(1);
      expect(result[0].y).toBe(1);
      expect(result[0].isLost).toBe(false);
    });

    it('should move robot forward when within bounds', () => {
      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].x).toBe(1);
      expect(result[0].y).toBe(2);
      expect(result[0].orientation).toBe('N');
      expect(result[0].isLost).toBe(false);
    });

    it('should mark robot as lost when moving out of bounds', () => {
      const robots: Robot[] = [
        {
          x: 3,
          y: 3,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].x).toBe(3);
      expect(result[0].y).toBe(3);
      expect(result[0].orientation).toBe('N');
      expect(result[0].isLost).toBe(true);
    });

    it('should handle complex instruction sequence', () => {
      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'E',
          instruction: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].x).toBe(1);
      expect(result[0].y).toBe(1);
      expect(result[0].orientation).toBe('E');
      expect(result[0].isLost).toBe(false);
    });
  });

  describe('lost robot scenarios', () => {
    it('should ignore instructions for already lost robot', () => {
      const robots: Robot[] = [
        {
          x: 2,
          y: 2,
          orientation: 'N',
          instruction: ['L', 'R', 'F'],
          isLost: true,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0]).toEqual({
        x: 2,
        y: 2,
        orientation: 'N',
        instruction: ['L', 'R', 'F'],
        isLost: true,
      });
    });

    it('should stop processing instructions after robot gets lost', () => {
      const robots: Robot[] = [
        {
          x: 5,
          y: 3,
          orientation: 'N',
          instruction: ['F', 'L', 'F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].x).toBe(5);
      expect(result[0].y).toBe(3);
      expect(result[0].orientation).toBe('N');
      expect(result[0].isLost).toBe(true);
    });
  });

  describe('scent functionality', () => {
    it('should prevent robot from getting lost at position with existing scent', () => {
      const robots: Robot[] = [
        {
          x: 3,
          y: 3,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 3,
          y: 3,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);

      expect(result[0].isLost).toBe(true);
      expect(result[1].isLost).toBe(false);
      expect(result[1].x).toBe(3);
      expect(result[1].y).toBe(3);
    });

    it('should handle multiple scent positions', () => {
      const robots: Robot[] = [
        {
          x: 5,
          y: 3,
          orientation: 'E',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 3,
          y: 3,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 5,
          y: 3,
          orientation: 'E',
          instruction: ['F', 'L'],
          isLost: false,
        },
        {
          x: 3,
          y: 3,
          orientation: 'N',
          instruction: ['F', 'R'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);

      expect(result[0].isLost).toBe(true);
      expect(result[1].isLost).toBe(true);
      expect(result[2].isLost).toBe(false);
      expect(result[2].orientation).toBe('N');
      expect(result[3].isLost).toBe(false);
      expect(result[3].orientation).toBe('E');
    });
  });

  describe('multiple robots', () => {
    it('should process multiple robots independently', () => {
      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'E',
          instruction: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
          isLost: false,
        },
        {
          x: 3,
          y: 2,
          orientation: 'N',
          instruction: [
            'F',
            'R',
            'R',
            'F',
            'L',
            'L',
            'F',
            'F',
            'R',
            'R',
            'F',
            'L',
            'L',
          ],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);

      expect(result[0].x).toBe(1);
      expect(result[0].y).toBe(1);
      expect(result[0].orientation).toBe('E');
      expect(result[0].isLost).toBe(false);

      expect(result[1].x).toBe(3);
      expect(result[1].y).toBe(3);
      expect(result[1].orientation).toBe('N');
      expect(result[1].isLost).toBe(true);
    });

    it('should handle empty robots array', () => {
      const robots: Robot[] = [];
      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result).toEqual([]);
    });
  });

  describe('edge cases', () => {
    it('should handle robot at grid boundary', () => {
      const robots: Robot[] = [
        {
          x: 0,
          y: 0,
          orientation: 'S',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 0,
          y: 1,
          orientation: 'W',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 5,
          y: 0,
          orientation: 'E',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 5,
          y: 3,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].isLost).toBe(true);
      expect(result[1].isLost).toBe(true);
      expect(result[2].isLost).toBe(true);
      expect(result[3].isLost).toBe(true);
    });

    it('should handle invalid instruction gracefully', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const robots: Robot[] = [
        {
          x: 1,
          y: 1,
          orientation: 'N',
          instruction: ['X' as unknown as Instruction],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);
      expect(result[0].x).toBe(1);
      expect(result[0].y).toBe(1);
      expect(result[0].orientation).toBe('N');
      expect(result[0].isLost).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Unknown instruction: X, ignoring.',
      );

      consoleSpy.mockRestore();
    });

    it('should handle zero-sized grid', () => {
      const robots: Robot[] = [
        {
          x: 0,
          y: 0,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, 0, 0);
      expect(result[0].isLost).toBe(true);
    });

    it('should work with single-cell grid', () => {
      const robots: Robot[] = [
        {
          x: 0,
          y: 0,
          orientation: 'N',
          instruction: ['L', 'L'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, 0, 0);
      expect(result[0].x).toBe(0);
      expect(result[0].y).toBe(0);
      expect(result[0].orientation).toBe('S');
      expect(result[0].isLost).toBe(false);
    });
  });

  describe('all orientations movement', () => {
    it('should move correctly in all directions', () => {
      const robots: Robot[] = [
        {
          x: 2,
          y: 2,
          orientation: 'N',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 2,
          y: 2,
          orientation: 'S',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 2,
          y: 2,
          orientation: 'E',
          instruction: ['F'],
          isLost: false,
        },
        {
          x: 2,
          y: 2,
          orientation: 'W',
          instruction: ['F'],
          isLost: false,
        },
      ];

      const result = moveRobots(robots, gridMaxX, gridMaxY);

      expect(result[0]).toEqual({
        x: 2,
        y: 3,
        orientation: 'N',
        instruction: ['F'],
        isLost: false,
      });
      expect(result[1]).toEqual({
        x: 2,
        y: 1,
        orientation: 'S',
        instruction: ['F'],
        isLost: false,
      });
      expect(result[2]).toEqual({
        x: 3,
        y: 2,
        orientation: 'E',
        instruction: ['F'],
        isLost: false,
      });
      expect(result[3]).toEqual({
        x: 1,
        y: 2,
        orientation: 'W',
        instruction: ['F'],
        isLost: false,
      });
    });
  });
});
