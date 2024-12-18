# Problem restatement in your own words

Given an array of integers where the numbers are not sorted, our task is to find the longest consecutive sequence of numbers.
We need to find the longest sequence of consecutive numbers in the given array.
Sort the array of numbers. This helps in easily finding consecutive numbers in order.
Traverse the sorted array and count how many consecutive numbers there are. Every time you find a number that is not consecutive, reset the count.

# Detailed step-by-step solution outline and complexity analysis

The problem is about finding the length of the longest consecutive elements sequence in an unsorted array of integers.

1. Check if the array nums is empty. If it is, return 0 because there are no elements to form a consecutive sequence.
2. Sort the numbers in the array in ascending order.
3. Define longestStreak to keep track of the longest consecutive sequence found so far. Initialize it to 1 since at least one number is in the longest streak.
4. Define currentStreak to keep track of the current consecutive sequence length. Initialize it to 1.
5. Start a loop from the second element of the sorted array (index 1).
6. Compare each element with its predecessor.
   - If the current element (nums[i]) is exactly 1 greater than the previous element (nums[i - 1]), it means this number continues the consecutive sequence, so increment currentStreak.
   - If the current element is not consecutive (nums[i] !== nums[i - 1] + 1), then update longestStreak to be the maximum of itself and currentStreak.
   - Reset currentStreak to 1 for the next possible sequence.
7. Return Math.max(longestStreak, currentStreak) which captures the maximum streak length found.

Complexity analysis

- Time Complexity:
  - The sorting step takes O(n log n) time.
  - After sorting, we perform a single pass to find consecutive sequences, which runs in O(n) time.
  - Overall complexity is O(n)
- Space Complexity
  - We are not using any additional space proportional to the size of the input other than the sorted array, so, the complexity is O(1).

# Final TypeScript solution code

```typescript
type Nums = number[];

const longestConsecutive = (nums: Nums) => {
  if (nums.length === 0) return 0;

  nums.sort((a, b) => a - b); // sort list in ascending order

  let longestStreak = 1; // Initialize the longest streak as 1
  let currentStreak = 1; // Initialize the current streak length as 1

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      currentStreak++; // Consecutive sequence found, increment streak
    } else if (nums[i] !== nums[i - 1]) {
      longestStreak = Math.max(longestStreak, currentStreak); // Update the longest streak if needed
      currentStreak = 1; // Reset current streak for the next sequence
    }
  }
  return Math.max(longestStreak, currentStreak);
};
```

# A short paragraph on challenges and optimizations

- A small challenge was the use of nums[i - 1] to compare the current and previous elements since it seemed a bit unintuitive at first, as it relies on the array being sorted.
- Additionally, handling duplicate numbers can be tricky because they should not reset the streak.
