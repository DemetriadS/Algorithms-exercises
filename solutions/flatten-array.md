# Problem restatement in your own words

You are given a list that might contain other lists inside it, creating a structure that can go as deep as needed.
Some of the elements in this structure might also be null or undefined.
Goal is to take this complex list and create a single, flat list containing only the actual values, removing any null or undefined values.
Ex: if the given array is [1, [2, 3, null, 4], [null], 5], the output should be [1, 2, 3, 4, 5].
We need to:

- go through each item in the list.
- collect all the valid values and ignoring null and undefined values.
- return them as a single, flat array.

# Detailed step-by-step solution outline and complexity analysis

The problem involves processing a nested list-like structure and we need to flatten the structure into a single array and exclude any values that are null or undefined.

1. We initialize an empty array to hold valid values.
2. We use a helper function to handle both array elements and non-array values.
   - We are checking each item in the array. If it’s an array, call the helper function recursively. If it’s a valid value, add it to the result.
3. We are starting recursion with the array list.
4. Return the flattened list.

5. Complexity analysis
   Time complexity: The algorithm visits each element in the array exactly once, processing it in constant time. If there are n total elements in the nested structure, the time complexity is O(n).
   Space complexity: We have a recursive stack and a result storage aso the total complexity is O(m + m).

# Final TypeScript solution code

```typescript
type NestedList = number | string | null | undefined | NestedList[];

export function flatten(array: NestedList[]): (number | string)[] {
  const result: (number | string)[] = []; // Initialize an empty array to hold valid values.

  function recurse(value: NestedList): void {
    if (Array.isArray(value)) {
      // If the value is an array, process each element.
      for (let i = 0; i < value.length; i++) {
        recurse(value[i]);
      }
    } else if (value !== null && value !== undefined) {
      // If the value is valid (not null/undefined), add it to the result.
      result.push(value);
    }
  }

  recurse(array);
  return result;
}
```

# A short paragraph on challenges and optimizations

- One challenge with flattening a nested list was making sure all the cases are taken cared, ensuring that the function correctly processes all nested levels without exceeding the call stack limit.
- Another challenge was filtering out null or undefined values while maintaining the flattened structure.
