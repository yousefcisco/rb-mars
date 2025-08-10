export function isWithinBounds(
  x: number,
  y: number,
  maxX: number,
  maxY: number,
): boolean {
  return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
}
