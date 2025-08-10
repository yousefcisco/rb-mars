export type Orientation = 'N' | 'S' | 'E' | 'W';
export type Instruction = 'L' | 'R' | 'F';

export type Robot = {
  x: number;
  y: number;
  orientation: Orientation;
  instruction: Instruction[];
  isLost: boolean;
};
