import { isWithinBounds } from './is-within-bounds';

describe('isWithinBounds', () => {
  const maxX = 5;
  const maxY = 3;

  describe('valid positions', () => {
    it('should return true for origin (0,0)', () => {
      expect(isWithinBounds(0, 0, maxX, maxY)).toBe(true);
    });

    it('should return true for maximum bounds', () => {
      expect(isWithinBounds(maxX, maxY, maxX, maxY)).toBe(true);
    });

    it('should return true for positions within bounds', () => {
      expect(isWithinBounds(3, 2, maxX, maxY)).toBe(true);
      expect(isWithinBounds(1, 1, maxX, maxY)).toBe(true);
      expect(isWithinBounds(4, 0, maxX, maxY)).toBe(true);
      expect(isWithinBounds(0, 3, maxX, maxY)).toBe(true);
    });

    it('should return true for edge positions', () => {
      expect(isWithinBounds(0, maxY, maxX, maxY)).toBe(true);
      expect(isWithinBounds(maxX, 0, maxX, maxY)).toBe(true);
    });
  });

  describe('invalid positions', () => {
    it('should return false for negative x coordinate', () => {
      expect(isWithinBounds(-1, 2, maxX, maxY)).toBe(false);
    });

    it('should return false for negative y coordinate', () => {
      expect(isWithinBounds(2, -1, maxX, maxY)).toBe(false);
    });

    it('should return false for both negative coordinates', () => {
      expect(isWithinBounds(-1, -1, maxX, maxY)).toBe(false);
    });

    it('should return false for x coordinate exceeding maxX', () => {
      expect(isWithinBounds(maxX + 1, 2, maxX, maxY)).toBe(false);
    });

    it('should return false for y coordinate exceeding maxY', () => {
      expect(isWithinBounds(2, maxY + 1, maxX, maxY)).toBe(false);
    });

    it('should return false for both coordinates exceeding bounds', () => {
      expect(isWithinBounds(maxX + 1, maxY + 1, maxX, maxY)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle zero bounds correctly', () => {
      expect(isWithinBounds(0, 0, 0, 0)).toBe(true);
      expect(isWithinBounds(1, 0, 0, 0)).toBe(false);
      expect(isWithinBounds(0, 1, 0, 0)).toBe(false);
    });

    it('should handle large coordinates', () => {
      const largeMax = 1000;
      expect(isWithinBounds(999, 999, largeMax, largeMax)).toBe(true);
      expect(isWithinBounds(1001, 999, largeMax, largeMax)).toBe(false);
    });

    it('should work with different maxX and maxY values', () => {
      expect(isWithinBounds(10, 5, 15, 8)).toBe(true);
      expect(isWithinBounds(16, 5, 15, 8)).toBe(false);
      expect(isWithinBounds(10, 9, 15, 8)).toBe(false);
    });
  });
});