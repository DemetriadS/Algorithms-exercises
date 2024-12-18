# Problem restatement in your own words

Find for each element in the array, how many elements to its right are smaller than it.
For each element at index i, you only count the elements smaller than nums[i] that are located to the right of nums[i].
The result for the last element in the array is always 0 because there are no elements to its right.

# Detailed step-by-step solution outline and complexity analysis

The solution utilizes a modified merge sort algorithm to efficiently count the number of smaller numbers after each element.
The merge sort will process the array recursively, and during the merge step, it will count how many elements from the right subarray are smaller than each element from the left subarray.

1. mergeSort is a recursive function that takes four params: array, count, startOfArray, endOfArray.
2. the base case is startOfArray >= endOfArray, return immediately. This means we have reached a single element or an invalid range.
3. calculate the middleOfArray index to split the array into two halves.
4. we recursively count the reverse pairs in the left half and in the right half.
5. we are counting reverse pairs across the halves:

- initialize a rightStartIndex to the start of the right half.
- for each element in the left half, count how many elements in the right half satisfy the condition nums[leftIndex] > 2 _ nums[rightStartIndex]. Condition ensures that nums[leftIndex] is larger than 2 _ nums[rightStartIndex], thus rightStartIndex corresponds to the number of valid reverse pairs.
- update the count for each element in the count array by adding rightStartIndex - (middleOfArray + 1).

6. we merge the two sorted halves.

- create an empty sortedArray to hold the merged and sorted elements.
- use two pointers, leftIndex for the left half and rightIndex for the right half.
- Compare elements from the left and right halves:
  - If array[leftIndex].value <= array[rightIndex].value, add array[leftIndex] to sortedArray and move leftIndex forward.
  - Otherwise, add array[rightIndex] to sortedArray and increment rightCount, then move rightIndex forward.
  - The rightCount keeps track of how many elements from the right subarray are smaller than the current element from the left subarray.

7. process remaining elements in the left half by adding the rest of the left half to sortedArray.
8. process remaining elements in the right half by adding the rest of the right half to sortedArray.
9. we are coping the sorted elements from the temporary sorted array back into the original array.
10. return the count array which contains the counts of smaller numbers after each element.

Complexity analysis

- Time Complexity
  - By splitting the array and counting reverse pairs in a mergeSort function, the solutions complexity is O(n log n).
- Space Complexity
  - sortedArray array during merging need space so, the complexity is O(n).

# First iteration

```typescript
function countSmaller(nums: number[]): number[] {
  const numsLength = nums.length;
  const counts = Array(numsLength).fill(0); // Initialize array with 0

  for (let currentIndex = 0; currentIndex < numsLength; currentIndex++) {
    let count = 0;

    // Check all elements to the right of nums[currentIndex]
    for (
      let comparisonIndex = currentIndex + 1;
      comparisonIndex < numsLength;
      comparisonIndex++
    ) {
      if (nums[comparisonIndex] < nums[currentIndex]) {
        count++;
      }
    }
    counts[currentIndex] = count;
  }
  return counts;
}
```

- This was my first approach to the exercise, but, as the reverse-pairs exercise i stumbled uppon the same problem which is, when i have an extented array of nums the tests are failing because of time limit exceeding.

# Final TypeScript solution code

- Here i have seen that in the description they are suggesting to use the merge-sort technique, to split the array into two parts and sort them so i went for this.

```typescript
type Nums = number[];
type MergeSortParams = {
  array: { value: number; originalIndex: number }[];
  count: Nums;
  startOfArray: number;
  endOfArray: number;
};

const mergeSort = (params: MergeSortParams) => {
  const { array, count, startOfArray, endOfArray } = params;

  if (startOfArray >= endOfArray) return;

  const middleOfArray = Math.floor((startOfArray + endOfArray) / 2);

  // Recursively sort left and right subarrays
  mergeSort({ array, count, startOfArray, endOfArray: middleOfArray });
  mergeSort({ array, count, startOfArray: middleOfArray + 1, endOfArray });

  // Merge the two halves of the array
  const sortedArray = [];
  let leftIndex = startOfArray;
  let rightIndex = middleOfArray + 1;
  let rightCount = 0;

  // Compare and merge elements from the left and right halves
  while (leftIndex <= middleOfArray && rightIndex <= endOfArray) {
    if (array[rightIndex].value < array[leftIndex].value) {
      sortedArray.push(array[rightIndex]);
      rightCount++; // Increment count of smaller elements
      rightIndex++;
    } else {
      sortedArray.push(array[leftIndex]);
      count[array[leftIndex].originalIndex] += rightCount; // Update count for left elements
      leftIndex++;
    }
  }

  // Process remaining elements in the left half
  while (leftIndex <= middleOfArray) {
    sortedArray.push(array[leftIndex]);
    count[array[leftIndex].originalIndex] += rightCount; // Add rightCount for remaining left elements
    leftIndex++;
  }

  // Process remaining elements in the right half
  while (rightIndex <= endOfArray) {
    sortedArray.push(array[rightIndex]);
    rightIndex++;
  }

  // Copy the sorted elements back into the original array
  for (let i = 0; i < sortedArray.length; i++) {
    array[startOfArray + i] = sortedArray[i];
  }
};

const countSmaller = (nums: Nums): Nums => {
  const numsLength = nums.length;
  const count = Array(numsLength).fill(0);
  const indexedArray = nums.map((value, index) => ({
    value,
    originalIndex: index,
  }));

  mergeSort({
    array: indexedArray,
    count,
    startOfArray: 0,
    endOfArray: numsLength - 1,
  });

  return count;
};
```

# A short paragraph on challenges and optimizations

- One of my challenges continue to be understading why my first iteration is not sufficient.I understand that it take more memory, but in my opinion the approach with splitting the two arrays and sort them feels like scratching your left ear with your right hand :))
- Another challenge arrised when processing arrays like [2, 0, 1], where the logic for updating the count of elements in the left subarray (ex: count[leftIndex] += rightCount) did not properly account for elements already merged. Had to find a fix for it and the fix was to preserve the original indices of the elements this maintaining a connection between the sorted array and the count array, ensuring accurate updates during merging array.
