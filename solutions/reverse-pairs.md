# Problem restatement in your own words

Given an array of nums. You need to return the length of pairs or numbers that satisfy some conditions.
The pair (i, j) need to satisfy these conditions:

```typescript
0 <= i < j < nums.length and
nums[i] > 2 * nums[j].
```

In the list [1,3,2,3,1], the pair (3, 1) is an accurate because 3 is more than twice 1.
But the pair (3, 2) is not because 3 is not more than twice 2.
Loop through the array with two nested loops to compare every possible pair (i,j).
Count all pairs that respect nums[i] > 2 \* nums[j] condition in the list and return that number.

# Detailed step-by-step solution outline and complexity analysis

The solution follows a merge sort to count reverse pairs. This approach works by recursively dividing the array and counting reverse pairs in the left and right subarrays and then across the mergeSort process.

1. mergeSort is a recursive function that takes three params array, leftSideOfArray and rightSideOfArray.
2. the base case is if the leftSideOfArray index is greater than or equal to the rightSideOfArray index, return 0. This means we have reached a single element or an invalid range.
3. we the middle index middleOfArray to divide the array into two halves.
4. we recursively count the reverse pairs in the left half and in the right half.
5. we are counting reverse pairs across the halves:

- we initialize rightStartIndex to the start of the right half, then for each element in the left half, count how many elements in the right half satisfy the reverse pair condition (nums[leftIndex] > 2 \* nums[rightStartIndex]).
- update rightStartIndex as you move through the right half to count these pairs.

6. we merge the two sorted halves. We are using two pointers to iterate through the two halves and we are comparing the elements from the left and right subarrays. If the element in the left half is smaller or equal, add it to the sorted array and move the pointer in the left half forward.
7. we are coping the sorted elements from the temporary sorted array back into the original array.
8. return the count of reverse pairs

Complexity analysis

- Time Complexity
  - By splitting the array and counting reverse pairs in a mergeSort function, it divides the problem size and the solutions complexity is O(n log n).
- Space Complexity
  - sortedArray array during merging need space so, the complexity is O(n).

# First iteration

```typescript
function reversePairs(nums: number[]) {
  const count = nums.reduce((acc, number, index) => {
    const pairs = nums.slice(index + 1);
    const filteredPairs = pairs.filter((nextNum) => {
      return number > 2 * nextNum;
    });
    return acc + filteredPairs.length;
  }, 0);
  return count;
}
```

- The implementation started with using two for loops, one for i and one for j and a if statement that returned count if condition was met. The optimization to it was refactoring it to its current form where i used Array.prototype.
  The problem with this iteration is that when i have and extented array of nums the tests are failing because of time limit exceeding.

# Final TypeScript solution code

- Here i went with their tips and used the merge-sort technique and splitted the array into two parts and sorted them.

```typescript
type Nums = number[];
type MergeSortParams = {
  array: Nums;
  leftSideOfArray: number;
  rightSideOfArray: number;
};

const mergeSort = (params: MergeSortParams) => {
  const { array, leftSideOfArray, rightSideOfArray } = params;
  if (leftSideOfArray >= rightSideOfArray) return 0;

  const middleOfArray = Math.floor((leftSideOfArray + rightSideOfArray) / 2);

  // Count reverse pairs from left and right subarrays
  const leftPairs = mergeSort({
    array,
    leftSideOfArray,
    rightSideOfArray: middleOfArray,
  });
  const rightPairs = mergeSort({
    array,
    leftSideOfArray: middleOfArray + 1,
    rightSideOfArray,
  });

  let count = leftPairs + rightPairs;

  // Count reverse pairs between the two halves
  let rightStartIndex = middleOfArray + 1;
  for (
    let leftIndex = leftSideOfArray;
    leftIndex <= middleOfArray;
    leftIndex++
  ) {
    // Move the right pointer until the condition is false
    while (
      rightStartIndex <= rightSideOfArray &&
      array[leftIndex] > 2 * array[rightStartIndex]
    ) {
      rightStartIndex++;
    }
    // Add the number of valid reverse pairs for the current `leftIndex`
    count += rightStartIndex - (middleOfArray + 1);
  }

  // Merge the two halves of the array
  const sortedArray = [];
  let leftIndex = leftSideOfArray;
  let rightIndex = middleOfArray + 1;

  // Compare and merge elements from the left and right halves
  while (leftIndex <= middleOfArray && rightIndex <= rightSideOfArray) {
    if (array[leftIndex] <= array[rightIndex]) {
      sortedArray.push(array[leftIndex++]);
    } else {
      sortedArray.push(array[rightIndex++]);
    }
  }

  // Add remaining elements from the left half
  while (leftIndex <= middleOfArray) {
    sortedArray.push(array[leftIndex++]);
  }

  // Add remaining elements from the right half
  while (rightIndex <= rightSideOfArray) {
    sortedArray.push(array[rightIndex++]);
  }

  // Copy the sorted subarray back to the original array
  for (
    let currentIndex = leftSideOfArray;
    currentIndex <= rightSideOfArray;
    currentIndex++
  ) {
    array[currentIndex] = sortedArray[currentIndex - leftSideOfArray];
  }

  return count;
};

const reversePairs = (nums: Nums) => {
  const numsLength = nums.length;
  return mergeSort({
    array: nums,
    leftSideOfArray: 0,
    rightSideOfArray: numsLength - 1,
  });
};
```

# A short paragraph on challenges and optimizations

- The implementation started with using two for loops, one for i and one for j and a if statement that returned count if condition was met.
- First optimization was refactoring it to its first iteration solution where i used Array.prototype.
- My challenge was understading why my first iteration was failing when running the tests and the approach with merge sort solution works. In my opinion at first the approach with splitting the two arrays and sort them feels like overengineering.
  An exercise that could be done in 10 lines should be enough. Took me some reading to understand why my tests were failing and why the time complexity was reaching O(n^2) after iterating once through the reduce and once through the filter.This solution required additional space to store the filtered pairs for each element and so increasing memory usage with larger arrays.
  When using the merge sort solution, by splitting the array and counting reverse pairs in a mergeSort function, the solution achieves a time complexity of O(n log n). This is significantly better than the O(n^2) complexity of the original solution.
  The merge sort solution also does not need to create new arrays (using slice() in the original solution) for filtering.
