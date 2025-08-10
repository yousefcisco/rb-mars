import { Instruction, Orientation, Robot } from './types';

import fs from 'fs';
import { moveRobots } from './utils';

const input = fs.readFileSync(`./input.txt`, 'utf-8');

// Globals
let robots: Robot[] = [];

// Process input
const lines = input.trim().split('\n');

const [gridMaxX, gridMaxY] = lines[0].split(' ').map(Number);

// Process 3 lines at a time for each robot, starting at line 1
for (let i = 1; i < lines.length; i += 3) {
  const positionLine = lines[i].trim();
  const instructionsLine = lines[i + 1]?.trim() || '';

  const [x, y, orientation] = positionLine.split(' ');

  robots.push({
    x: parseInt(x),
    y: parseInt(y),
    orientation: orientation as Orientation,
    instruction: instructionsLine.split('') as Instruction[],
    isLost: false,
  });
}

console.log(`Grid size: ${gridMaxX} ${gridMaxY}`);
console.log(`Initial robot positions:`);
robots.forEach((robot) =>
  console.log(
    `${robot.x} ${robot.y} ${robot.orientation} ${robot.isLost ? 'LOST' : ''}`,
  ),
);

robots = moveRobots(robots, gridMaxX, gridMaxY);

console.log('');
console.log(`Final robot positions:`);
robots.forEach((robot) =>
  console.log(
    `${robot.x} ${robot.y} ${robot.orientation} ${robot.isLost ? 'LOST' : ''}`,
  ),
);
