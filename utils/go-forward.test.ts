import { goForward } from './go-forward';

describe('goForward', () => {
  describe('when facing North', () => {
    it('should increase y coordinate by 1', () => {
      expect(goForward(5, 3, 'N')).toEqual([5, 4]);
    });

    it('should not change x coordinate', () => {
      const [newX] = goForward(10, 7, 'N');
      expect(newX).toBe(10);
    });
  });

  describe('when facing East', () => {
    it('should increase x coordinate by 1', () => {
      expect(goForward(2, 8, 'E')).toEqual([3, 8]);
    });

    it('should not change y coordinate', () => {
      const [, newY] = goForward(4, 6, 'E');
      expect(newY).toBe(6);
    });
  });

  describe('when facing South', () => {
    it('should decrease y coordinate by 1', () => {
      expect(goForward(1, 5, 'S')).toEqual([1, 4]);
    });

    it('should not change x coordinate', () => {
      const [newX] = goForward(9, 3, 'S');
      expect(newX).toBe(9);
    });
  });

  describe('when facing West', () => {
    it('should decrease x coordinate by 1', () => {
      expect(goForward(7, 2, 'W')).toEqual([6, 2]);
    });

    it('should not change y coordinate', () => {
      const [, newY] = goForward(3, 9, 'W');
      expect(newY).toBe(9);
    });
  });

  describe('edge cases', () => {
    it('should handle moving from origin', () => {
      expect(goForward(0, 0, 'N')).toEqual([0, 1]);
      expect(goForward(0, 0, 'E')).toEqual([1, 0]);
    });

    it('should handle negative coordinates', () => {
      expect(goForward(-1, -1, 'S')).toEqual([-1, -2]);
      expect(goForward(-1, -1, 'W')).toEqual([-2, -1]);
    });

    it('should work with all orientations from same position', () => {
      const x = 5,
        y = 5;
      expect(goForward(x, y, 'N')).toEqual([5, 6]);
      expect(goForward(x, y, 'E')).toEqual([6, 5]);
      expect(goForward(x, y, 'S')).toEqual([5, 4]);
      expect(goForward(x, y, 'W')).toEqual([4, 5]);
    });
  });
});
