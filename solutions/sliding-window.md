# Problem restatement in your own words

Problem involves finding the maximum value in a sliding window of size k.
Starting at the beginning of the array, the window moves one position to the right at each step.
At every position, find the maximum number in the window.
If k = 3 and nums = [1,3,-1,-3], windows will be [1,3,-1] and [3,-1,-3]

# Detailed step-by-step solution outline and complexity analysis

1. Create a list of all possible sliding windows using nums.slice(i, i + k) for each starting index i.
   Each sliding window is a subarray of size k, starting from position i and ending at i + k - 1.

2. Some windows at the end of the array may have fewer than k elements. These windows are incomplete and need to be removed.
   Use filter to remove them from the list.

3. For each valid window, calculate the maximum value using Math.max(...window) and store the results in a new array.

4. The array of maximum values from each window is the final result.

5. Complexity analysis
   - To create each sliding window, we take a slice of k elements from the array. This slicing takes time proportional to the size of the slice, which is k.
   - We repeat this for every starting position in the array, so if the array has n elements this step might take some time. The time complexity si O(n \* K), because we are iterating over the entire array of length n and also we are using slice and creating new arrays of size k.
   - The space complexity is also O( n \* k), because of the three operations we are using.

# Final TypeScript solution code

```typescript
type Nums = number[];

function maxSlidingWindow(nums: Nums, k: number): number[] {
  // Create a list of sliding window arrays
  const slidingWindow = nums.map((_, i) => nums.slice(i, i + k));
  // Filter the incomplete windows, that dont have k elements, example: [6,7]
  const filterIncompleteWindow = slidingWindow.filter(
    (window) => window.length === k
  );
  // Get the max value for each window
  const maxOfWindow = filterIncompleteWindow.map((window) =>
    Math.max(...window)
  );

  return maxOfWindow;
}
```

# A short paragraph on challenges and optimizations

- Storing all sliding windows temporarily increases space usage. And with Large k it might fail do to running out of memory.
- Another better solution might exist to handle better large k and avoid running out of memory.
