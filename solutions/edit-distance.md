# Problem restatement in your own words

You are given two strings, firstWord and secondWord. Your task is to determine the minimum number of operations needed to transform firstWord into secondWord. The allowed operations are:

- Insert: Add a character to the string.
- Delete: Remove a character from the string.
- Replace: Change one character into another.
  Example:
- Converting `horse` to `ros` requires 3 operations:

  - replace 'h' with 'r'
  - delete 'r'
  - delete 'e'

- Converting "intention" to "execution" requires 5 operations.
  Final goal is to compute the minimum cost (number of operations) using dynamic programming.

# Detailed step-by-step solution outline and complexity analysis

1.  Define DP array dpTable where: dpTable[i][j] represents the minimum number of operations required to convert the first `i` characters of `firstWord` to the first `j` characters of `secondWord`.

2.  If `firstWord` is empty (i = 0), the only way to match `secondWord` is by inserting all its characters. So:dpTable[0][j] = j for all `j`.
    If `secondWord` is empty (j = 0), the only way to match `firstWord` is by deleting all its characters. So: dpTable[i][0] = i for all `i`.

3.  Recursive Transition - for each pair of characters `firstWord[i - 1]` and `secondWord[j - 1]`:
    - If the characters are equal, no operation is needed:
      dpTable[i][j] = dpTable[i - 1][j - 1]
    - If the characters differ, consider the three possible operations:
      - Insert a character to `firstWord` to match `secondWord[j - 1]`:
        dpTable[i][j - 1] + 1
      - Delete a character from `firstWord`: dpTable[i - 1][j] + 1
      - Replace a character in `firstWord` to match `secondWord[j - 1]`:
        dpTable[i - 1][j - 1] + 1

This results in:
dpTable[i][j] = min(dpTable[i - 1][j] + 1, dpTable[i][j - 1] + 1, dpTable[i - 1][j - 1] + 1)

4. Fill the DP Table

   - Initialize the base cases for dpTable[0][j] and dpTable[i][0].
   - Iterate through all `i` (1 to firstWord.length) and `j` (1 to secondWord.length) to fill the DP table using the recursive transition.

5. Return the Result

6. Runthrogh an example:

## EXAMPLE: Based on the example with `horse` to `ros` we will have:

1. we initialize the first row and column to represent the cost of converting an empty string to a prefix of the other string
   dpTable:
   '' r o s
   '' 0 1 2 3
   h 1 0 0 0
   o 2 0 0 0
   r 3 0 0 0
   s 4 0 0 0
   e 5 0 0 0

2. Comparing the first character of `horse` `(h)` with each character of `ros`:

- For j = 1 (r): h != r.
  dpTable[1][1] = min(dpTable[0][1] + 1, dpTable[1][0] + 1, dpTable[0][0] + 1) = 1.
  dpTable[1][1] = min(1 + 1, 1 + 1, 0 + 1) = 1;

- For j = 2 (o): h != o.
  dpTable[1][2] = min(dpTable[0][2] + 1, dpTable[1][1] + 1, dpTable[0][1] + 1) = 2.

- For j = 3 (s): h != s.
  dpTable[1][3] = min(dpTable[0][3] + 1, dpTable[1][2] + 1, dpTable[0][2] + 1) = 3.

  '' r o s
  '' 0 1 2 3
  h 1 1 2 3
  o 2 0 0 0
  r 3 0 0 0
  s 4 0 0 0
  e 5 0 0 0

3. Comparing the second character of `horse` `(o)` with each character of `ros`:

- For j = 1 (r): o != r.
  dpTable[2][1] = min(dpTable[1][1] + 1, dpTable[2][0] + 1, dpTable[1][0] + 1) = 2.

- For j = 2 (o): o === o.
  dpTable[2][2] = dpTable[1][1] = 1.

- For j = 3 (s): o != s.
  dpTable[2][3] = min(dpTable[1][3] + 1, dpTable[2][2] + 1, dpTable[1][2] + 1) = 2.

  '' r o s
  '' 0 1 2 3
  h 1 1 2 3
  o 2 2 1 2
  r 3 0 0 0
  s 4 0 0 0
  e 5 0 0 0

Final value in dpTable[5][3] will be 3.

4. Comparing the third character of `horse` `(r)` with each character of `ros`:

- For j = 1 (r): r === r.
  dpTable[3][1] = dpTable[2][0] = 2.

- For j = 2 (o): r != o.
  dpTable[3][2] = min(dpTable[2][2] + 1, dpTable[3][1] + 1, dpTable[2][1] + 1) = 2.

- For j = 3 (s): r != s.
  dpTable[3][3] = min(dpTable[2][3] + 1, dpTable[3][2] + 1, dpTable[2][2] + 1) = 2.

'' r o s
'' 0 1 2 3
h 1 1 2 3
o 2 2 1 2
r 3 2 2 2
s 4 0 0 0
e 5 0 0 0

5. Comparing the 4th character of `horse` `(s)` with each character of `ros`:

- For j = 1 (r): s != r.
  dpTable[4][1] = min(dpTable[3][1] + 1, dpTable[4][0] + 1, dpTable[3][0] + 1) = 3.

- For j = 2 (o): s != o.
  dpTable[4][2] = min(dpTable[3][2] + 1, dpTable[3][1] + 1, dpTable[2][1] + 1) = 3.

- For j = 3 (s): s === s.
  dpTable[4][3] = dpTable[3][2] = 2.

'' r o s
'' 0 1 2 3
h 1 1 2 3
o 2 2 1 2
r 3 2 2 2
s 4 3 3 2
e 5 0 0 0

6. Comparing the 5th character of `horse` `(e)` with each character of `ros`:
   dpTable[i][j] = min(dpTable[i - 1][j] + 1, dpTable[i][j - 1] + 1, dpTable[i - 1][j - 1] + 1)

- For j = 1 (r): e != r.
  dpTable[5][1] = min(dpTable[4][1] + 1, dpTable[5][0] + 1, dpTable[4][0] + 1) = 4.

- For j = 2 (o): e != o.
  dpTable[5][2] = min(dpTable[4][2] + 1, dpTable[5][1] + 1, dpTable[4][1] + 1) = 4.

- For j = 3 (s): e != s.
  dpTable[5][3] = min(dpTable[4][3] + 1, dpTable[5][2] + 1, dpTable[4][2] + 1) = 3.

'' r o s
'' 0 1 2 3
h 1 1 2 3
o 2 2 1 2
r 3 2 2 2
s 4 3 3 2
e 5 4 4 3

The value in dpTable[5][3] = 3 represents the minimum edit distance between horse and ros. This means it takes 3 operations to transform horse into ros, specifically:

Delete h.
Replace o with r.
Delete e.

7. The time complexity arises from filling the `dpTable` in the `fillDPTable` function.

- Outer Loop: Iterates over the rows (`i` from 1 to `firstWordLength`).
- Inner Loop: Iterates over the columns (`j` from 1 to `secondWordLength`).
- Each cell computation involves a constant number of operations, so the complexity will be O(`firstWordLength` x `secondWordLength`);

  As for the space complexity:

- The dpTable has dimensions `(firstWordLength + 1) \times (secondWordLength + 1)` so the space complexity will be the same O(`firstWordLength` x `secondWordLength`);

# First iteration

```typescript
const minDistance = (firstWord: string, secondWord: string): number => {
  const firstWordLength = firstWord.length;
  const secondWordLength = secondWord.length;

  const dpTable: number[][] = Array(firstWordLength + 1)
    .fill(0)
    .map(() => Array(secondWordLength + 1).fill(0));
  // Initialize the base cases for transforming empty substrings
  dpTable.forEach((_, i) => {
    dpTable[i][0] = i;
  });
  dpTable.forEach((_, j) => {
    dpTable[0][j] = j;
  });

  // Fill the DP table
  Array.from({ length: firstWordLength }, (_, i) => i + 1).forEach((i) => {
    Array.from({ length: secondWordLength }, (_, j) => j + 1).forEach((j) => {
      if (firstWord[i - 1] === secondWord[j - 1]) {
        dpTable[i][j] = dpTable[i - 1][j - 1]; // Characters match
      } else {
        dpTable[i][j] = Math.min(
          dpTable[i - 1][j] + 1, // Delete
          dpTable[i][j - 1] + 1, // Insert
          dpTable[i - 1][j - 1] + 1 // Replace
        );
      }
    });
  });
  return dpTable[firstWordLength][secondWordLength];
};
```

# Final TypeScript solution code

```typescript
type DPTable = number[][];

const minDistance = (firstWord: string, secondWord: string): number => {
  const firstWordLength = firstWord.length;
  const secondWordLength = secondWord.length;

  const dpTable = createDPTable(firstWordLength, secondWordLength);

  setupBoundaryConditions(dpTable);

  fillDPTable(
    dpTable,
    firstWord,
    secondWord,
    firstWordLength,
    secondWordLength
  );

  return dpTable[firstWordLength][secondWordLength];
};

// Initialize the DP table with default values.
const createDPTable = (rows: number, cols: number): number[][] => {
  return Array(rows + 1)
    .fill(0)
    .map(() => Array(cols + 1).fill(0));
};

// Set up boundary conditions
const setupBoundaryConditions = (dpTable: DPTable) => {
  dpTable.forEach((_, i) => {
    dpTable[i][0] = i; // Cost of deleting all characters from the first word
  });
  dpTable[0].forEach((_, j) => {
    dpTable[0][j] = j; // Cost of inserting all characters into the first word
  });
};

// Fill the DP table based on the edit distance rules
const fillDPTable = (
  dpTable: number[][],
  firstWord: string,
  secondWord: string,
  firstWordLength: number,
  secondWordLength: number
) => {
  Array.from({ length: firstWordLength }, (_, i) => i + 1).forEach((i) => {
    Array.from({ length: secondWordLength }, (_, j) => j + 1).forEach((j) => {
      if (firstWord[i - 1] === secondWord[j - 1]) {
        dpTable[i][j] = dpTable[i - 1][j - 1]; // Characters match
      } else {
        dpTable[i][j] = Math.min(
          dpTable[i - 1][j] + 1, // Delete
          dpTable[i][j - 1] + 1, // Insert
          dpTable[i - 1][j - 1] + 1 // Replace
        );
      }
    });
  });
};
```

# A short paragraph on challenges and optimizations

- As a first optimization i splitted the code into helper functions to make it more readable.
- Same as the previous exercises a challenge was breaking the problem into smaller subproblems and solving them individually, i need more preactive with dynamic programming to be able to have a full grasp on it.
- Another challenge was visualizing the DP table as a grid where each cell depends on previously computed values.
- A challenge was to clearly defining what each cell in the DP table represents and does.
- Defining and ensuring the solution handles all edge cases. Had some errors, after which i had to review the solution and change the code for them to pass, like handling the case where inputs are very large strings or strings that have repetitive characters.
