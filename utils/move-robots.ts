import { Robot } from '../types';
import { goForward } from './go-forward';
import { isWithinBounds } from './is-within-bounds';
import { turnLeft } from './turn-left';
import { turnRight } from './turn-right';

export function moveRobots(
  robots: Robot[],
  gridMaxX: number,
  gridMaxY: number,
): Robot[] {
  const scents: Set<string> = new Set();

  robots.forEach((robot) => {
    robot.instruction.forEach((instr) => {
      if (robot.isLost) {
        return;
      }

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
            // If robot is within bounds, move forward
            robot.x = newX;
            robot.y = newY;
          } else {
            if (scents.has(`${robot.x},${robot.y}`)) {
              // If there's a scent, ignore instruction
              break;
            } else {
              // If robot is out of bounds, mark its position with a scent & isLost=true
              scents.add(`${robot.x},${robot.y}`);
              robot.isLost = true;
            }
          }
          break;
        default:
          console.error(`Unknown instruction: ${instr}, ignoring.`);
      }
    });
  });

  return robots;
}
