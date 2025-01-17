# Problem restatement in your own words

We want to build a function that checks if a string s matches a pattern p. The pattern uses two special symbols:

1. .: This can match any single character (like a wildcard).
2. _: This allows the preceding character to appear zero or more times. For example:
   _ "a\*" can match "", "a", "aa", "aaa", etc.
   - ".\*" can match any sequence of characters, including an empty string.
     The goal is to see if the pattern matches the entire string, not just a part of it.

# Detailed step-by-step solution outline and complexity analysis

We are using a table (dpTable) where dpTable[i][j] represents whether the first i characters of s match the first j characters of p.
Steps to Solve:

- dpTable[0][0] is true because an empty string matches an empty pattern.
- Handle cases where the pattern has \* to match zero occurrences of the preceding character.
- If the current characters in `s` and `p` match, or if p[j-1] is
  `.`, then: dpTable[i][j]=dpTable[i−1][j−1]
- If p[j-1] is `*`, there are two scenarios:
  1. Treat \* as matching zero occurrences of the preceding character: dpTable[i][j]=dpTable[i][j−2]
  2. Treat \* as matching one or more occurrences of the preceding character (if the preceding character matches s[i-1] or is .):
     dpTable[i][j]=dpTable[i−1][j]
- In the end we need to return dpTable[s.length][p.length].

Complexity analysis

- Time Complexity: O(m×n), where textLength is the length of the string and patternLength is the length of the pattern.
- Space Complexity: O(m×n) due to the DP table.

# First iteration

```typescript
function isMatch(s: string, p: string): boolean {
  const textLength = s.length;
  const patternLength = p.length;
  const dpTable: boolean[][] = Array.from({ length: textLength + 1 }, () =>
    Array(patternLength + 1).fill(false)
  );
  dpTable[0][0] = true;

  for (let j = 2; j <= patternLength; j++) {
    if (p[j - 1] === "*") {
      dpTable[0][j] = dpTable[0][j - 2];
    }
  }

  for (let i = 1; i <= textLength; i++) {
    for (let j = 1; j <= patternLength; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dpTable[i][j] = dpTable[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dpTable[i][j] =
          dpTable[i][j - 2] ||
          (dpTable[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === "."));
      }
    }
  }

  return dpTable[textLength][patternLength];
}
```

# Final TypeScript solution code

```typescript
type DPTable = boolean[][];

const isMatch = (s: string, p: string): boolean => {
  const textLength = s.length;
  const patternLength = p.length;
  const dpTable: DPTable = createDPTable(textLength, patternLength);

  initializePatternStart(dpTable, p);
  fillDPTable(dpTable, s, p);

  return dpTable[textLength][patternLength];
};

// Initialize the DP table with default values.
const createDPTable = (textLength: number, patternLength: number): DPTable => {
  const dpTable: DPTable = Array.from({ length: textLength + 1 }, () =>
    Array(patternLength + 1).fill(false)
  );
  dpTable[0][0] = true;
  return dpTable;
};

// Initialize the first row to handle patterns with '*' at the beginning
const initializePatternStart = (dpTable: DPTable, p: string) => {
  Array.from({ length: p.length }, (_, j) => j + 1).forEach((j) => {
    if (j >= 2 && p[j - 1] === "*") {
      dpTable[0][j] = dpTable[0][j - 2];
    }
  });
};

// check if the characters match directly with '.'
const isExactMatch = (charS: string, charP: string) => {
  return charP === "." || charS === charP;
};

// Handle '*' matching logic.
const handleAsterix = (
  dpTable: DPTable,
  s: string,
  p: string,
  i: number,
  j: number
) => {
  const zeroOccurances = dpTable[i][j - 2];
  const oneOrMoreOccurances =
    dpTable[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === ".");
  return zeroOccurances || oneOrMoreOccurances;
};

// Fill the DP table based on matching rules
const fillDPTable = (dpTable: DPTable, s: string, p: string) => {
  Array.from({ length: s.length }, (_, i) => i + 1).forEach((i) => {
    Array.from({ length: p.length }, (_, j) => j + 1).forEach((j) => {
      if (isExactMatch(s[i - 1], p[j - 1])) {
        dpTable[i][j] = dpTable[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dpTable[i][j] = handleAsterix(dpTable, s, p, i, j);
      }
    });
  });
};
```

# A short paragraph on challenges and optimizations

- My first iteration was like it shows above a one function solution which handled all the cases and the dp table.
- As a first optimization i splitted the code into helper functions to make it more readable.
- As a second optimization i moved from for loops to using forEach for functions like initializePatternStart and for fillDPTable.
- A fist challenge i think was splitting it into small problem, i understand the idea of dynamic programming, but it still took some time to break all the cases.
- Keeping track of multiple nested loops was confusing sometimes and lead to errors.
