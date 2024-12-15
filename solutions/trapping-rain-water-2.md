# Problem restatement in your own words

This is an exercise that combines 1D trapping rain water exercise and longest increasing path which uses a matrix.
Given an 𝑚×𝑛 grid (heightMap) where each cell represents the height of an cell, you need to find the volume of water that can be trapped after raining. The water trapped is determined by the valleys formed between taller buildings.
The trapped water between any two cells depends on the height difference between them and the surrounding cells.
The goal is to calculate the total volume of water trapped across the grid.

For example:

Given heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]], the trapped water volume is 4.

# Detailed step-by-step solution outline and complexity analysis

1. Initialization:

- Get the dimensions of the grid: m (rows) and n (columns).
- Define the four possible movements (up, down, left, right) using directions.
- Initialize a priority queue to keep track of the cells, starting with all boundary cells.
- Initialize totalWater to 0 to keep track of the total water trapped.
- Create a visited grid to track which cells have been processed.

2.  Iterate over the boundary rows and columns:
    - For each cell in the top and bottom rows, add it to the p`riorityQueue` and mark it as visited.
    - For each cell in the left and right columns, do the same.
3.  While there are cells in the `priorityQueue`:
    - Pop the cell with the smallest height.
    - For each of its four neighbors:
      - Check if the neighbor is within the grid boundaries and not yet visited.
      - Calculate the water trapped at this neighbor as `Math.max(0, height - heightMap[neighborRow][neighborCol])`, where height is the height of the current cell from the priority queue.
      - If water is trapped, add it to totalWater.
      - Update the height in the priority queue if the new height is greater than the existing height at the neighbor.
      - Mark the neighbor as visited and add it to the `priorityQueue`.
4.  Once all cells have been processed, return `totalWater`, which represents the total trapped water volume.

5.  Complexity analysis
    - The while loop processes each cell once. Each iteration, the cell with the smallest height si processed and neighbores are added to the queue.
    - Adding a sorting operation to is considered to have a logaritmic time complexity and sorting the priority queue with k elements takes us to a complexity of O(log k). We are sorting col and raw, represented by m and n -> O(m * n). So this taking us to a sorting complexity of O(log(m*n))
    - We are also processing each neighbor this takes us to O(4(m\*n))
    - The space complexity is O( n \* m).

# Final TypeScript solution code

```typescript
type QueueElement = [number, number, number][]; // [height, row, col]
type Grid = boolean[][];
type HeightMap = number[][];

function trapRainWater(heightMap: HeightMap): number {
  const m = heightMap.length;
  const n = heightMap[0].length;
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];
  const priorityQueue: QueueElement = [];
  let totalWater = 0;
  const visited: Grid = [];

  if (m < 3 || n < 3) return 0; // cant trap water in grids smaller then 3x3

  // innitiate all elements as false
  for (let i = 0; i < m; i++) {
    visited.push(new Array(n).fill(false));
  }

  // Add all boundary cells to the priorityQueue and mark as visited
  addBoundaryCellsToQueue(heightMap, visited, priorityQueue);

  // Process cells in the priorityQueue
  while (priorityQueue.length > 0) {
    const [height, row, col] = priorityQueue.shift()!;
    for (let k = 0; k < directions.length; k++) {
      const neighborRow = row + directions[k][0];
      const neighborCol = col + directions[k][1];
      // Check if neighbor is within bounds and not visited
      if (
        neighborRow >= 0 &&
        neighborRow < m &&
        neighborCol >= 0 &&
        neighborCol < n &&
        !visited[neighborRow][neighborCol]
      ) {
        visited[neighborRow][neighborCol] = true;
        // Calculate water trapped at this neighbor
        const waterTrapped = Math.max(
          0,
          height - heightMap[neighborRow][neighborCol]
        );
        totalWater += waterTrapped;

        // Add the neighbor to the Queue with updated height
        priorityQueue.push([
          Math.max(heightMap[neighborRow][neighborCol], height),
          neighborRow,
          neighborCol,
        ]);
      }
    }
  }
  return totalWater;
}

// Add a single cell to the Queue -> avoid duplications
function addCellToQueue(
  heightMap: HeightMap,
  visited: Grid,
  priorityQueue: QueueElement,
  row: number,
  col: number
) {
  priorityQueue.push([heightMap[row][col], row, col]);
  // Sort the priorityQueue to ensure the next cell to be processed is the one with the smallest height
  priorityQueue.sort((a, b) => a[0] - b[0]);
  visited[row][col] = true;
}

// Add boundary calls to the priorityQueue -> mark end of 2D modal
function addBoundaryCellsToQueue(
  heightMap: HeightMap,
  visited: Grid,
  priorityQueue: QueueElement
) {
  const m = heightMap.length;
  const n = heightMap[0].length;

  // Add leftMost and rightMost columns
  for (let i = 0; i < m; i++) {
    addCellToQueue(heightMap, visited, priorityQueue, i, 0); // leftMost column
    addCellToQueue(heightMap, visited, priorityQueue, i, n - 1); // rightMost column
  }

  // Add topMost and bottomMost columns
  for (let j = 0; j < n; j++) {
    addCellToQueue(heightMap, visited, priorityQueue, 0, j); // topMost row
    addCellToQueue(heightMap, visited, priorityQueue, m - 1, j); // bottomMost row
  }
}
```

# A short paragraph on challenges and optimizations

- Visualizing that this exercise is a combination of trapping rain water and the longest increasing path.
- My biggest challenge was visualizing the array or arrays as a 2d figure. How to track water dropped to the lowest cell.
- A challenge was handling all the boundary cells. To calculate the leftMost, rightMost, topMost and BottomMost. Also thinking of a way to keep track of each cell.
- Learned about priority queue.
- Another challenge was thinking of a way to manage the priority queue, to always process the smallest heigth first.
- Started with a function that did everything and then optimized it to three separate functions that do their own thing.
