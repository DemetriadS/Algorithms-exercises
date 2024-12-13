# Problem restatement in your own words

We are given an array filled with list of numbers that represent the heights of walls.
Imagine rain falls on these walls and some water might get trapped between the walls because taller walls block the water from flowing out.
Plan is to figure out how much water can be trapped in total by going through the array from left and from right until you get the same highest point.

# Detailed step-by-step solution outline and complexity analysis

1. Initialize two pointers `leftSideOfArray` and `rightSideOfArray` to traverse the array from both ends simultaneously.
   leftSideOfArray = 0 (start of the array).
   rightSideOfArray = height.length - 1 (end of the array).
2. Keep track of the maximum height encountered so far from the left sire `(leftMax)` and the right side `(rightMax)` and also the total water.
   Start by initializing them: leftMax = 0, rightMax = 0, and totalWater = 0.
3. Use a while loop until leftSideOfArray is less than rightSideOfArray:
   _ If the bar at the left pointer is shorter than the bar at the right pointer: - Update `leftMax` as the maximum between `leftMax` and the current bar's height. - Add `leftMax - height[leftSideOfArray]` to `totalWater` (water above the current bar). - Move the left pointer one step to the right.
   _ Otherwise: - Update `rightMax` as the maximum between `rightMax` and the current bar's height. - Add `rightMax - height[rightSideOfArray]` to `totalWater` (water above the current bar). - Move the right pointer one step to the left.
   Once the pointers meet, return totalWater.

4. Complexity analysis
   - The solution uses a single while loop that moves pointers from both ends of the list towards the center.
   - The solution uses only a few variables (leftSideOfArray, rightSideOfArray, leftMax, rightMax, and totalWater) to keep track of the pointers and calculations.

# Final TypeScript solution code

```typescript
type Height = number[];

function trap(height: Height): number {
  let leftSideOfArray = 0;
  let rightSideOfArray = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let totalWater = 0;

  while (leftSideOfArray < rightSideOfArray) {
    if (height[leftSideOfArray] < height[rightSideOfArray]) {
      leftMax = Math.max(leftMax, height[leftSideOfArray]);
      totalWater += leftMax - height[leftSideOfArray];
      leftSideOfArray++;
    } else {
      rightMax = Math.max(rightMax, height[rightSideOfArray]);
      totalWater += rightMax - height[rightSideOfArray];
      rightSideOfArray--;
    }
  }
  return totalWater;
}
```

# A short paragraph on challenges and optimizations

- One of the challenges in this problem is efficiently calculating the maximum heights on both sides of each bar without using additional arrays.
  Understanding the relationship between the two pointers and their respective maximums is the key.
