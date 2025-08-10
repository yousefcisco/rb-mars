# Martian Robots

A TypeScript simulation of robots moving on the surface of Mars. Robots follow instructions from Earth and can be lost off the edge of the grid, but they leave scents to warn future robots.

## Problem Description

The surface of Mars is modeled by a rectangular grid around which robots move according to instructions provided from Earth. This program determines each sequence of robot positions and reports the final position of each robot.

### Key Features

- **Grid-based movement**: Robots move on a rectangular coordinate system
- **Orientation tracking**: Each robot has a direction (N, S, E, W)
- **Edge protection**: Lost robots leave "scents" that prevent future robots from falling off at the same location
- **Sequential processing**: Each robot completes execution before the next begins
- **Extensible design**: Ready for additional command types in the future

## Installation & Usage

```bash
# Install dependencies
pnpm install

# Run the simulation
pnpm start

# Run tests
pnpm test
```

## Input Format

The input file can be found in `input.txt`.

The first line contains the upper-right coordinates of the rectangular world (lower-left coordinates are assumed to be 0, 0).

The remaining input consists of a sequence of robot positions and instructions (two lines per robot followed by a blank line):
1. **Position line**: Two integers and an orientation (e.g., "1 1 E")
   - X coordinate
   - Y coordinate
   - Orientation: N (North), S (South), E (East), W (West)
2. **Instructions line**: String of movement commands (e.g., "RFRFRFRF")

### Constraints
- Maximum coordinate value: 50
- Maximum instruction string length: 100 characters
- Each robot is processed sequentially

## Robot Instructions

- **L**: Turn left 90 degrees (remains on current grid point)
- **R**: Turn right 90 degrees (remains on current grid point)
- **F**: Move forward one grid point in current orientation

## Output Format

For each robot, the output shows the final grid position and orientation. If a robot falls off the edge, "LOST" is printed after the position and orientation.

### Sample Output
```
1 1 E
3 3 N LOST
2 3 S
```

## Robot Scent System

When a robot moves off the grid:
1. The robot becomes permanently lost
2. A "scent" is left at the **last valid grid position** before falling off
3. Future robots will **ignore** movement instructions that would cause them to fall off from a scented location
4. This prevents multiple robots from being lost at the same grid point

## Tech Choices

I tried to keep this as simple as possible focussing on readability and keeping it close to how I would normally write code. This specific problem could've benefited from using classes but we
don't often find that in Typescript implementations so I opted to use a helper function pattern
which is much more common.
