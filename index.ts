import { Instruction, Orientation, Robot } from './types';
import { goForward, isWithinBounds, turnLeft, turnRight } from './utils';

// Sample input
const input = `
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

// Globals
const robots: Robot[] = [];

// Process input
const lines = input.trim().split('\n');

const [gridMaxX, gridMaxY] = lines[0].split(' ').map(Number);

// Process 3 lines at a time for each robot, starting at line 1
// @todo add input validation
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
robots.forEach((robot) =>
  console.log(
    `Robot at (${robot.x}, ${robot.y}) facing ${robot.orientation} is ${robot.isLost ? 'lost' : 'not lost'}`,
  ),
);

robots.forEach((robot) => {
  robot.instruction.forEach((instr) => {
    // Process each instruction
    switch (instr) {
      case 'L':
        // Turn left
        robot.orientation = turnLeft(robot.orientation);
        break;
      case 'R':
        // Turn right
        robot.orientation = turnRight(robot.orientation);
        break;
      case 'F':
        // Move forward
        const [newX, newY] = goForward(robot.x, robot.y, robot.orientation);
        if (isWithinBounds(newX, newY, gridMaxX, gridMaxY)) {
          robot.x = newX;
          robot.y = newY;
        } else {
          robot.isLost = true;
        }
        break;
    }
  });
});
