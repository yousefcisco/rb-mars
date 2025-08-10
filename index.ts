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
const scents: Set<string> = new Set();

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
console.log(`Initial robot positions:`);
robots.forEach((robot) =>
  console.log(
    `Robot at (${robot.x}, ${robot.y}) facing ${robot.orientation} is ${robot.isLost ? 'lost' : 'not lost'}`,
  ),
);

robots.forEach((robot, index) => {
  console.log('');
  console.log('');

  robot.instruction.forEach((instr) => {
    console.log(`Robot ${index + 1} executing instruction: ${instr}`);

    if (robot.isLost) {
      console.log(`Robot ${index + 1} is already lost, skipping instruction.`);
      return;
    }
    // Process each instruction
    switch (instr) {
      case 'L':
        // Turn left
        robot.orientation = turnLeft(robot.orientation);
        console.log(
          `Robot at (${robot.x}, ${robot.y}) turned to face ${robot.orientation}`,
        );
        break;
      case 'R':
        // Turn right
        robot.orientation = turnRight(robot.orientation);
        console.log(
          `Robot at (${robot.x}, ${robot.y}) turned to face ${robot.orientation}`,
        );
        break;
      case 'F':
        // Move forward
        const [newX, newY] = goForward(robot.x, robot.y, robot.orientation);

        if (isWithinBounds(newX, newY, gridMaxX, gridMaxY)) {
          console.log(`Moving robot to (${newX}, ${newY})`);
          // If robot is within bounds, move forward
          robot.x = newX;
          robot.y = newY;
        } else {
          // If there's a scent, ignore instructions
          if (scents.has(`${robot.x},${robot.y}`)) {
            console.log(
              `Scent detected at (${robot.x}, ${robot.y}), ignoring instruction`,
            );
            break;
          } else {
            // If robot is out of bounds, mark its position with a scent & isLost=true
            console.log(`Robot at (${robot.x}, ${robot.y}) is lost!`);
            scents.add(`${robot.x},${robot.y}`);
            robot.isLost = true;
          }
        }
        break;
    }
  });
});

console.log('');
console.log(`Final robot positions:`);
robots.forEach((robot) =>
  console.log(
    `Robot at (${robot.x}, ${robot.y}) facing ${robot.orientation} is ${robot.isLost ? 'lost' : 'not lost'}`,
  ),
);
