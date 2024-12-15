# Problem restatement in your own words

We are given an array filled with list of numbers that represent the heights of walls.
Imagine rain falls on these walls and some water might get trapped between the walls because taller walls block the water from flowing out.
Plan is to figure out how much water can be trapped in total by going through the array from left and from right until you get to the same highest point.
While going through the array, the water trapped will be the difference between the current walls height and the max height. Add that water to a total water averytime it is found.

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
   - The time complexity is O(n) because the algorithm has a liniar time complexity where n is the number of elements in the height array. The function processes each element of the array at most once.
   - The space complexity of the algorithm is O(1), as it uses a constant amount of additional memory.

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

- Its hard to get around the idea o water being trapped between walls and was hard to visualize how water accumulates based on left and right boundaries.
- Using a step by step process visualization helped (running an example of the algorithm on paper ).
- One of the challenges in this problem is efficiently calculating the maximum heights on both sides of each bar without using additional arrays.
