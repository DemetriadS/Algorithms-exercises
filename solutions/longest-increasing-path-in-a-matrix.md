# Problem restatement in your own words

We are given a matrix that is represented by an array. The array being: [[9,9,4],[6,6,8],[2,1,1]].
We need to return the longest incresing path in the matrix.
Every cell can be moved up, down, right, left.
It can't move diagonally and it can't move outside boundaries.

# Detailed step-by-step solution outline and complexity analysis

1. Define the matrix dimensions (rowsLength and colsLength).
   Create a storedArray to save already computed results.
   Define directions as the possible moves (up, down, left, right).
   We are using the memoization priciple to store the length of the longest increasing path starting from each cell.

2. - Write a helper function, `searchPath(row, col)`, to compute the longest increasing path starting from (row, col).
   - If the result for the current cell is already stored in storedArray, return it.
   - Initialize the maxPath as 1 for the current cell.
   - We can do in 4 dirrections represented by the direction vectors: `[[-1,0],[1,0],[0,-1],[0,1]]`
     For each of the four possible directions:
     - Calculate the new cell’s coordinates.
     - Check if the move stays within bounds and if the value of the new cell is greater than the current cell.
     - If valid, compute the longest path from the new cell and update maxPath.
   - Store the computed maxPath for the current cell in storedArray and return it.
3. Iterate Over All Cells:

   - For each cell in the matrix, compute the longest increasing path starting from that cell using searchPath.
   - Keep track of the global maximum longestPath.

4. Return the Result - The result is the longest path found across all starting cells.

5. Complexity analysis
   - Each cell is processed once, and each recursive call checks up to 4 neighbors.
   - Using memoization ensures we do not process the same cell multiple times.

# Final TypeScript solution code

```typescript
type Matrix = number[][];

function longestIncreasingPath(matrix: Matrix): number {
  const rowsLength = matrix.length;
  const colsLength = matrix[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const storedArray = [];
  for (let i = 0; i < rowsLength; i++) {
    const row = [];
    for (let i = 0; i < colsLength; i++) {
      row.push(0);
    }
    storedArray.push(row);
  }
  const searchPath = (row, col) => {
    // If the value is already computed, return i
    if (storedArray[row][col] !== 0) return storedArray[row][col];
    let maxPath = 1;

    // Explore all four possible directions
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;

      if (
        newRow >= 0 &&
        newRow < rowsLength &&
        newCol >= 0 &&
        newCol < colsLength &&
        matrix[newRow][newCol] > matrix[row][col]
      ) {
        maxPath = Math.max(maxPath, 1 + searchPath(newRow, newCol));
      }
    });
    // Store the computed value and return it
    storedArray[row][col] = maxPath;
    return maxPath;
  };
  let longestPath = 0;

  // Compute the longest path starting from each cell
  for (let i = 0; i < rowsLength; i++) {
    for (let j = 0; j < colsLength; j++) {
      longestPath = Math.max(longestPath, searchPath(i, j));
    }
  }
  return longestPath;
}
```

# A short paragraph on challenges and optimizations

- The challenge was using memoization. Without it the algorithm would repeat work for the same cells multiple times.
- As a optimization:
  - i could refactor the code, by moving searchPath to a helper.
  - find Array.prototype solutions instead of the for loops
