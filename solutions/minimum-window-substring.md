# Problem restatement in your own words

You have two strings, s and t. Your goal is to find the smallest substring of s that contains all the characters in t (including duplicates).
If no such substring exists, return an empty string.
For example:
If s = "ADOBECODEBANC" and t = "ABC", the smallest substring is "BANC".
If s = "a" and t = "a", the result is "a".
If s = "a" and t = "aa", the result is "" (not enough as in s).

# Detailed step-by-step solution outline and complexity analysis

1. Convert s and t into arrays for easier manipulation.

2. Use tCount to count how many times each character appears in t. This ensurares that all characters are accounted for, including duplicates.

3. Iterate Through Substrings of s: for every starting position i in s, create a substring by iterating to the end of the string (j). Use substringCount to count characters in the current substring.

4. For each substring, check if it contains all characters from t. Use the tCount for comparison.

5. If a substring is valid, add it to a list of solutions.

6. When all valid substrings are collected, find the shortest one.

7. If no valid substring exists, return an empty string. Otherwise, return the shortest substring.

8. Complexity analysis
   Time complexity:
   - We are converting s and t into arrays, this takes us to O(m + n).
   - We are counting accurances in t, this takes O(n)
   - We are iterating through all substrings of s. We are running m times for the forEach and one m time for the for inside. That takes us to O(m^2)
   - We are validating the substring inside isValid. That take checking the keys in tCount (this being O(n)). Since there are O(m^2) substrings, this will take O(m^2\*n).
   - And finally we are finding the smallest substring, which is like we said above O(m^2).
     Space complexity
   - We need storage for tCount, substringCount and solutions, this takes us to O(m^3)

# Final TypeScript solution code

```typescript
function minWindow(s: string, t: string): string {
  // tranform s and t to arrays
  const sArr = Array.from(s);
  const tArr = Array.from(t);

  // count occurances for each char in t
  // check cases when you have multiple accurances of the same char
  const tCount = tArr.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  const solutions: string[] = [];

  // iterate through all substrings of s
  sArr.forEach((_, i) => {
    const substringCount = {};
    for (let j = i; j <= sArr.length; j++) {
      const char = sArr[j];
      substringCount[char] = (substringCount[char] || 0) + 1;

      // Check if the substring contains all characters in the tArr
      const isValid = Object.keys(tCount).every(
        (key) => (substringCount[key] || 0) >= tCount[key]
      );

      if (isValid) {
        const substring = sArr.slice(i, j + 1); // Extract a substring
        const substringStr = substring.join(""); // convert to string for solutions
        solutions.push(substringStr);
      }
    }
  });

  // Find smallest substring
  if (solutions.length === 0) return ""; // When there is no such substring
  const smallesSubstring = solutions.reduce((min, current) =>
    current.length < min.length ? current : min
  );

  return smallesSubstring;
}
```

# A short paragraph on challenges and optimizations

- Started with a more rough implementation using for loops instead of reduce.
- Started with not taking in consideration the case where you could have more then one of the same char, this took me to failing tests.
- The current solution generates all possible substrings of s, which is slow for large inputs, this might take to memory loss.
